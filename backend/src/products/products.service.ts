import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readFile } from 'fs/promises';
import { isValidObjectId, Model } from 'mongoose';
import { join } from 'path';
import { ImagesService } from '../images/images.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Branch, Product } from './product.schema';

// Digits only (e.g. "45000") get thousands separators; anything else is kept as typed
const formatPrice = (value?: string) => {
  const v = value?.trim() ?? '';
  return /^\d+$/.test(v) ? Number(v).toLocaleString('en-US') : v;
};

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private readonly products: Model<Product>,
    private readonly images: ImagesService,
  ) {}

  // First run on an empty database: import the products that used to be hard-coded in the catalog
  async onApplicationBootstrap() {
    if ((await this.products.estimatedDocumentCount()) > 0) return;
    const file = join(process.cwd(), 'seed', 'products.seed.json');
    const seed = JSON.parse(await readFile(file, 'utf8')) as Product[];
    await this.products.insertMany(seed);
    this.logger.log(`Seeded ${seed.length} catalog products`);
  }

  findAll(branch?: Branch) {
    const filter = branch
      ? { branch: { $in: [branch, 'All'] as Branch[] } }
      : {};
    return this.products.find(filter).sort({ order: 1 }).lean();
  }

  async create(dto: CreateProductDto) {
    if (!dto.ageGroups?.length && !dto.gender) {
      throw new BadRequestException('Select at least one age');
    }
    const product = await this.products.create({
      ...dto,
      ageGroups: [...new Set(dto.ageGroups)],
      // An empty select means "not in Shop by Gender"
      gender: dto.gender || undefined,
      price: formatPrice(dto.price),
      wrappingPrice: formatPrice(dto.wrappingPrice),
    });
    return product.toObject();
  }

  async update(id: string, dto: UpdateProductDto) {
    const existing = await this.findOrThrow(id);

    const $set: Record<string, unknown> = {};
    const $unset: Record<string, ''> = {};
    for (const [key, value] of Object.entries(dto)) {
      if (value === undefined) continue;
      if (key === 'gender' && value === '') {
        $unset.gender = '';
      } else if (key === 'ageGroups') {
        $set.ageGroups = [...new Set(value as string[])];
      } else {
        $set[key] =
          key === 'price' || key === 'wrappingPrice'
            ? formatPrice(value as string)
            : value;
      }
    }

    const ageGroups = ($set.ageGroups as string[]) ?? existing.ageGroups;
    const gender =
      'gender' in $unset ? undefined : ($set.gender ?? existing.gender);
    if (!ageGroups.length && !gender) {
      throw new BadRequestException('Select at least one age');
    }

    const updated = await this.products
      .findByIdAndUpdate(
        id,
        { $set, $unset },
        { new: true, runValidators: true },
      )
      .lean();

    if (dto.img && dto.img !== existing.img) {
      await this.images.deleteByUrl(existing.img);
    }
    return updated;
  }

  async remove(id: string) {
    const existing = await this.findOrThrow(id);
    await existing.deleteOne();
    await this.images.deleteByUrl(existing.img);
    return { deleted: true };
  }

  private async findOrThrow(id: string) {
    const product = isValidObjectId(id)
      ? await this.products.findById(id)
      : null;
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
