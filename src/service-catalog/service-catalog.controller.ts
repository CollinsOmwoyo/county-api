import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ServiceCatalogController {

@Roles('ADMIN')
@Get('admin')
@ApiOperation({ summary: 'Get admin-only data' })
getAdminOnlyData() {
    return { message: 'This data is visible only to ADMIN users.' };
}

@Roles('CITIZEN', 'ADMIN')
@Get('citizen')
@ApiOperation({ summary: 'Get citizen data' })
getCitizenData() {
    return { message: 'This data is visible to CITIZENS and ADMINS.' };
}
}
