import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Service UUID to request', example: 'service-uuid-v4' })
  @IsUUID()
  serviceId: string;
}
