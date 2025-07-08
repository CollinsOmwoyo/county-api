import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService {
  constructor(private cfg: ConfigService) {
    cloudinary.config({
      cloud_name: cfg.get('dnsnkx7ex'),
      api_key: cfg.get('534815873559974'),
      api_secret: cfg.get('V59vER0y5pEW5EKBpi_v7Fqgj1k'),
    });
  }
  // …
}
