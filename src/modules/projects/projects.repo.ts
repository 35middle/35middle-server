import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Project, ProjectDocument } from './projects.schema';
import { IProject } from './types';

@Injectable()
export class ProjectsRepo {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async updateProject(
    projectId: mongoose.Types.ObjectId,
    accountId: mongoose.Types.ObjectId,
    name: string,
    brandColor: string,
    logoPath: string,
  ): Promise<IProject> {
    return this.projectModel.findByIdAndUpdate(projectId, {
      accountId,
      name,
      brandColor,
      logoPath,
      archivedAt: null,
    });
  }

  async createProject(
    accountId: mongoose.Types.ObjectId,
    name: string,
    brandColor: string,
    logoPath: string,
  ): Promise<IProject> {
    const project = new this.projectModel({
      accountId,
      name,
      brandColor,
      logoPath,
      archivedAt: null,
    });

    return project.save();
  }

  async findByAccountId(
    accountId: mongoose.Types.ObjectId,
  ): Promise<IProject[]> {
    return this.projectModel
      .find({
        accountId,
      })
      .lean();
  }
}
