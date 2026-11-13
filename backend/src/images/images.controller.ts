import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { AdminGuard } from '../auth/admin.guard';
import { ImagesService } from './images.service';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

@Controller('images')
export class ImagesController {
  constructor(private readonly images: ImagesService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', { limits: { fileSize: MAX_IMAGE_BYTES } }),
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('No image uploaded');
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File must be an image');
    }
    return this.images.create(file.buffer, file.mimetype);
  }

  @Get(':id')
  async serve(@Param('id') id: string, @Res() res: Response) {
    const image = await this.images.findById(id);
    if (!image) throw new NotFoundException();

    // Image ids never get reused, so the browser can cache them forever
    res.set({
      'Content-Type': image.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    });
    res.send(image.data);
  }
}
