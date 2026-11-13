import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Image } from './image.schema';

// Products reference uploaded images by this relative path; the frontend
// prefixes it with the API URL.
export const IMAGE_PATH_PREFIX = '/images/';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image.name) private readonly images: Model<Image>) {}

  async create(data: Buffer, contentType: string) {
    const image = await this.images.create({ data, contentType });
    return { url: `${IMAGE_PATH_PREFIX}${image.id}` };
  }

  findById(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.images.findById(id);
  }

  /** Deletes an uploaded image given a product's img value; external URLs are ignored. */
  async deleteByUrl(url?: string) {
    if (!url?.startsWith(IMAGE_PATH_PREFIX)) return;
    const id = url.slice(IMAGE_PATH_PREFIX.length);
    if (isValidObjectId(id)) await this.images.deleteOne({ _id: id });
  }
}
