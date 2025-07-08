import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ServiceCatalogModule } from '../service-catalog/service-catalog.module';
import { UsersModule } from '../users/users.module';
import { RequestsController } from './controllers/requests.controller';
import { ServiceRequest } from './entities/service-request.entity';
import { RequestsService } from './services/requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest]),
    UsersModule,
    FilesModule,
    forwardRef(() => ServiceCatalogModule),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
