import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The name of the service',
    example: 'Water Connection',
  })
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the service',
    example: 'Request a new residential water connection from the county.',
  })
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @ApiProperty({
    description: 'Category or department offering the service',
    example: 'Water and Sanitation',
  })
  @IsNotEmpty()
  category: string;
}
