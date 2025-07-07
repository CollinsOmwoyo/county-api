import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignOfficerDto {
  @ApiProperty({ description: 'Officer User UUID', example: 'officer-uuid-v4' })
  @IsUUID()
  officerId: string;
}
