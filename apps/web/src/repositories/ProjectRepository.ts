import { db } from "@/lib/db";
import type { ProjectInput } from "@/dto/project.dto";

export interface IProjectRepository {
  findAll(): Promise<unknown[]>;
  create(data: ProjectInput): Promise<unknown>;
}

export class ProjectRepository implements IProjectRepository {
  async findAll() {
    return db.project.findMany({ orderBy: { order: "asc" } });
  }
  async create(data: ProjectInput) {
    return db.project.create({ data: { ...data, live: data.live || null } });
  }
}
