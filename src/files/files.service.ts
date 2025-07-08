import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,

    private readonly configService: ConfigService,
  )
  {
    cloudinary.config({
      cloud_name: configService.get<string>('dnsnkx7ex'),
      api_key: configService.get<string>('534815873559974'),
      api_secret: configService.get<string>('V59vER0y5pEW5EKBpi_v7Fqgj1k'),
    });
  }
async upload(requestId: string, file: Express.Multer.File): Promise<Document> {
  const uploadResult = await new Promise<any>((res, rej) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `requests/${requestId}` },
      (err, result) => (err ? rej(err) : res(result)),
    );
    stream.end(file.buffer);
  });
  const doc = this.repo.create({
    filename: file.originalname,
    url: uploadResult.secure_url,
    request: { id: requestId } as any,
  });
  return this.repo.save(doc);
}
async remove(docId: string): Promise<void> {
  const doc = await this.repo.findOneBy({ id: docId });
  if (!doc) throw new NotFoundException('Document not found');
  const publicId = doc.url.split('/').pop().split('.')[0]; // adjust if needed
  await cloudinary.uploader.destroy(publicId);
  await this.repo.remove(doc);
}

findByRequest(requestId: string): Promise<Document[]> {
  return this.repo.find({ where: { request: { id: requestId } } });
}

}
