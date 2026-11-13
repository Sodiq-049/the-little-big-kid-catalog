import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { BRANCHES } from './product.schema';
import type { Branch } from './product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  // Public: the catalog calls this with ?branch=Lekki or ?branch=Ikoyi
  @Get()
  findAll(@Query('branch') branch?: Branch) {
    if (branch && !BRANCHES.includes(branch)) {
      throw new BadRequestException('Unknown branch');
    }
    return this.products.findAll(branch === 'All' ? undefined : branch);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.products.remove(id);
  }
}
