import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,

    private readonly configService: ConfigService,
  ) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      this.logger.error('Missing Cloudinary environment variables.');
      throw new InternalServerErrorException(
        'Cloudinary configuration is incomplete.',
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async upload(requestId: string, file: Express.Multer.File): Promise<Document> {
    if (!file || !file.buffer) {
      throw new InternalServerErrorException('File buffer is missing.');
    }

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `requests/${requestId}` },
        (error, result) => {
          if (error || !result) {
            this.logger.error(`Cloudinary upload failed: ${error?.message}`);
            return reject(new InternalServerErrorException('Cloud upload failed'));
          }
          resolve(result);
        },
      );
      stream.end(file.buffer);
    });

    const document = this.repo.create({
      filename: file.originalname,
      url: uploadResult.secure_url,
      request: { id: requestId } as any,
    });

    return this.repo.save(document);
  }

  async remove(docId: string): Promise<void> {
    const doc = await this.repo.findOne({
      where: { id: docId },
      relations: ['request'],
    });

    if (!doc) {
      this.logger.warn(`Attempted to delete non-existent document: ${docId}`);
      throw new NotFoundException('Document not found');
    }

    const urlParts = doc.url.split('/');
    const lastPart = urlParts[urlParts.length - 1] || '';
    const [publicId] = lastPart.split('.');

    if (!publicId) {
      this.logger.error(`Could not parse public ID from URL: ${doc.url}`);
      throw new InternalServerErrorException('Malformed document URL');
    }

    try {
      await cloudinary.uploader.destroy(`requests/${doc.request.id}/${publicId}`);
    } catch (error) {
      this.logger.error(`Cloudinary deletion failed: ${error.message}`);
    }

    await this.repo.remove(doc);
  }

  async findByRequest(requestId: string): Promise<Document[]> {
    if (!requestId) {
      throw new NotFoundException('Request ID must be provided');
    }

    return this.repo.find({
      where: { request: { id: requestId } },
    });
  }
}
