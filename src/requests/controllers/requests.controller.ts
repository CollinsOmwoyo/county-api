import {
    Body,
    Controller,
    Get,
    Param, Patch,
    Post,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth, ApiOperation, ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guards';
import { Roles } from '../../auth/roles.decorator';
import { userRole } from '../../users/enums/user-role.enum';
import { AssignOfficerDto } from '../dto/assign-officer.dto';
import { CreateRequestDto } from '../dto/create-request.dto';
import { UpdateStatusDto } from '../dto/update-request-status.dto';
import { ServiceRequest } from '../entities/service-request.entity';
import { RequestsService } from '../services/requests.service';

@ApiBearerAuth()
@ApiTags('Requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('requests')
export class RequestsController {
  constructor(private readonly svc: RequestsService) {}

  @Post()
  @Roles(userRole.CITIZEN)
  @ApiOperation({ summary: 'Create service request' })
  @ApiResponse({ status: 201, type: ServiceRequest })
  create(@Body() dto: CreateRequestDto, @Request() req) {
    return this.svc.create(dto, req.user.userId);
  }

  @Get('my')
  @Roles(userRole.CITIZEN)
  @ApiOperation({ summary: 'My service requests' })
  @ApiResponse({ status: 200, type: [ServiceRequest] })
  findByCitizen(@Request() req) {
    return this.svc.findByCitizen(req.user.userId);
  }

  @Get()
  @Roles(userRole.OFFICER, userRole.ADMIN)
  @ApiOperation({ summary: 'All service requests (filtered)' })
  @ApiResponse({ status: 200, type: [ServiceRequest] })
  findAll(@Query('status') status?: string) {
    return this.svc.findAll(status as any);
  }

  @Patch(':id/assign')
  @Roles(userRole.ADMIN)
  @ApiOperation({ summary: 'Assign an officer to request' })
  @ApiResponse({ status: 200, type: ServiceRequest })
  assign(@Param('id') id: string, @Body() dto: AssignOfficerDto) {
    return this.svc.assignOfficer(id, dto);
  }

  @Patch(':id/status')
  @Roles(userRole.OFFICER)
  @ApiOperation({ summary: 'Update request status' })
  @ApiResponse({ status: 200, type: ServiceRequest })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.svc.updateStatus(id, dto);
  }
}
