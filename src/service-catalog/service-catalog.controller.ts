import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/roles.decorator';
import { userRole } from '../users/enums/user-role.enum';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceCatalog } from './entities/service-catalog.entity';
import { ServiceCatalogService } from './service-catalog.service';

@ApiBearerAuth()
@ApiTags('Service Catalog')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('services')
export class ServiceCatalogController {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  @Post()
  @Roles(userRole.ADMIN)
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'Service created successfully', type: ServiceCatalog })
  create(@Body() dto: CreateServiceDto): Promise<ServiceCatalog> {
    return this.serviceCatalogService.create(dto);
  }

  @Get('admin')
  @Roles(userRole.ADMIN)
  @ApiOperation({ summary: 'Get all services (Admin)' })
  @ApiResponse({ status: 200, description: 'All services (admin view)', type: [ServiceCatalog] })
  findAll(): Promise<ServiceCatalog[]> {
    return this.serviceCatalogService.findAll();
  }

  @Get('citizen')
  @Roles(userRole.CITIZEN)
  @ApiOperation({ summary: 'Get all services (Citizen)' })
  @ApiResponse({ status: 200, description: 'All services (citizen view)', type: [ServiceCatalog] })
  findAllCitizen(): Promise<ServiceCatalog[]> {
    return this.serviceCatalogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiResponse({ status: 200, description: 'Service found', type: ServiceCatalog })
  findOne(@Param('id') id: string): Promise<ServiceCatalog> {
    return this.serviceCatalogService.findOne(id);
  }

  @Patch(':id')
  @Roles(userRole.ADMIN)
  @ApiOperation({ summary: 'Update a service by ID' })
  @ApiResponse({ status: 200, description: 'Service updated', type: ServiceCatalog })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
  ): Promise<ServiceCatalog> {
    return this.serviceCatalogService.update(id, dto);
  }

  @Delete(':id')
  @Roles(userRole.ADMIN)
  @ApiOperation({ summary: 'Delete a service by ID' })
  @ApiResponse({ status: 204, description: 'Service deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.serviceCatalogService.remove(id);
  }
}
