import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ServiceCatalogController {

@Roles('ADMIN')
@Get('admin')
getAdminOnlyData() {
    return { message: 'This data is visible only to ADMIN users.' };
}

@Roles('CITIZEN', 'ADMIN')
@Get('citizen')
getCitizenData() {
    return { message: 'This data is visible to CITIZENS and ADMINS.' };
}
}
