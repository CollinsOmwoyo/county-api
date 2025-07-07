import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RequestStatus } from '../enums/request-status.enum';

export class UpdateStatusDto {
  @ApiProperty({ enum: RequestStatus, example: RequestStatus.APPROVED })
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
