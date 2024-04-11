import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Response,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import sanitizeFilename from 'sanitize-filename';
import { AppService } from './app.service';
import { CreateEntryDTO } from './dto/create-entry.dto';
import { safeParseInt, shortUUID } from './utils/core.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEntries(@Query('page') page: number, @Query('limit') limit: number) {
    return this.appService.getEntries(
      safeParseInt(page, 1),
      safeParseInt(limit, 10),
    );
  }

  @Post()
  createEntry(@Body() body: CreateEntryDTO) {
    return this.appService.createEntry(body);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
        files: 6,
      },
      fileFilter(_, file, callback) {
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      storage: diskStorage({
        destination: './storage',
        filename: (_, file, cb) => {
          const filename = `${shortUUID()}_${sanitizeFilename(
            file.originalname,
          )}`;
          cb(null, filename);
        },
      }),
    }),
  )
  public async uploadFile(
    @UploadedFiles() file: Express.Multer.File[],
    @Response() res,
  ) {
    if (!file) {
      throw new BadRequestException('Only PDF files are allowed');
    }

    return res.status(201).json({
      message: 'File uploaded successfully',
      data: file.map((f) => ({
        path: f.path,
        size: f.size,
        name: f.filename,
      })),
    });
  }
}
