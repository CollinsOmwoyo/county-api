import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCatalogModule } from '../service-catalog/service-catalog.module';
import { UsersModule } from '../users/users.module';
import { RequestsController } from './controllers/requests.controller';
import { ServiceRequest } from './entities/service-request.entity';
import { RequestsService } from './services/requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest]),
    UsersModule,
    ServiceCatalogModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService,TypeOrmModule],
})
export class RequestsModule {}
