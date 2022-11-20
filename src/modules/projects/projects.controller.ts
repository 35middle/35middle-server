import {
  Controller,
  Get,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  Param,
  Put,
  Logger,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './project.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Response } from 'express';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { createReadStream } from 'fs';

@Controller({
  version: '1',
  path: 'projects',
})
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAllByAccountId(@Query('accountId') accountId): Promise<ProjectEntity[]> {
    return this.projectsService.findAllByAccountId(accountId);
  }

  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('projectLogo', {
      storage: diskStorage({
        destination: './uploadedFiles/projectLogos',
        filename(
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async creatProject(
    @Body('accountId') accountId: string,
    @Body('brandColor') brandColor: string,
    @Body('projectName') name: string,
    @UploadedFile() projectLogo: Express.Multer.File,
  ): Promise<ProjectEntity> {
    return this.projectsService.createProject(
      accountId,
      name,
      brandColor,
      projectLogo?.filename || 'default-project-logo.png',
    );
  }

  @Put()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('projectLogo', {
      storage: diskStorage({
        destination: './uploadedFiles/projectLogos',
        filename(
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async updateProject(
    @Body('accountId') accountId: string,
    @Body('projectId') projectId: string,
    @Body('brandColor') brandColor: string,
    @Body('projectName') name: string,
    @UploadedFile() projectLogo: Express.Multer.File,
  ): Promise<ProjectEntity> {
    return this.projectsService.updateProjects(
      projectId,
      accountId,
      name,
      brandColor,
      projectLogo?.filename || 'default-project-logo.png',
    );
  }

  @Get('project-logo/:logoPath')
  findProjectLogo(@Param('logoPath') logoPath: string, @Res() res: Response) {
    return createReadStream(
      path.join(
        process.cwd(),
        'uploadedFiles',
        'projectLogos',
        logoPath || 'default-project-logo.png',
      ),
    )
      .on('error', (err) => {
        this.logger.log(`{logoPath} is not found`, err);
      })
      .pipe(res);
  }
}
