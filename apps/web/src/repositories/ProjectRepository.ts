import { db } from "@/lib/db";
import type { ProjectInput } from "@/dto/project.dto";
import type { Project } from "@/generated/prisma/client";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  create(data: ProjectInput): Promise<Project>;
}

export class ProjectRepository implements IProjectRepository {
  async findAll(): Promise<Project[]> {
    return db.project.findMany({ orderBy: { order: "asc" } });
  }
  async create(data: ProjectInput): Promise<Project> {
    return db.project.create({ data: { ...data, live: data.live || null } });
  }
}
