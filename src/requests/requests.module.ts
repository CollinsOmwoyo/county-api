import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequest } from './entities/service-request.entity';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { UsersModule } from '../users/users.module';
import { ServiceCatalogModule } from '../service-catalog/service-catalog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest]),
    UsersModule,
    ServiceCatalogModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
