import { Injectable } from '@nestjs/common';
import { ProjectsRepo } from './projects.repo';
import { ProjectEntity } from './project.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepo: ProjectsRepo) {}

  async createProject(
    accountId: string,
    name: string,
    brandColor: string,
    logoPath: string,
  ) {
    const project = await this.projectsRepo.createProject(
      new mongoose.Types.ObjectId(accountId),
      name,
      brandColor,
      logoPath,
    );
    return ProjectEntity.fromObject(project);
  }

  async updateProjects(
    projectId: string,
    accountId: string,
    name: string,
    brandColor: string,
    logoPath: string,
  ) {
    const project = await this.projectsRepo.updateProject(
      new mongoose.Types.ObjectId(projectId),
      new mongoose.Types.ObjectId(accountId),
      name,
      brandColor,
      logoPath,
    );
    return ProjectEntity.fromObject(project);
  }

  async findAllByAccountId(accountId: string): Promise<ProjectEntity[]> {
    const projects = await this.projectsRepo.findByAccountId(
      new mongoose.Types.ObjectId(accountId),
    );
    return Promise.all(
      projects.map((project) => ProjectEntity.fromObject(project)),
    );
  }
}
