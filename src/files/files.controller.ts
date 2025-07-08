import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { Document } from './entities/document.entity';
import { FilesService } from './files.service';

@ApiBearerAuth()
@ApiTags('Documents')
@Controller()
export class FilesController {
  constructor(private fs: FilesService) {}

  @Post('requests/:id/documents')
  @ApiOperation({ summary: 'Upload a document for a request' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: Document })
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Param('id') requestId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Document> {
    return this.fs.upload(requestId, file);
  }
  @Get('requests/:id/documents')
  @ApiOperation({ summary: 'List documents for a request' })
  @ApiResponse({ status: 200, type: [Document] })
  list(@Param('id') requestId: string): Promise<Document[]> {
    return this.fs.findByRequest(requestId);
  }

   @Delete('documents/:docId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a document' })
  remove(@Param('docId') docId: string): Promise<void> {
    return this.fs.remove(docId);
  }
 
}
