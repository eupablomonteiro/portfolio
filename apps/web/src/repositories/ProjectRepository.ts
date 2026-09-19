import { db } from "@/lib/db";
import type { ProjectInput, UpdateProjectInput } from "@/dto/project.dto";
import type { Project } from "@/generated/prisma/client";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findPublished(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  listTechs(): Promise<string[]>;
  create(data: ProjectInput): Promise<Project>;
  update(id: string, data: UpdateProjectInput): Promise<Project>;
  remove(id: string): Promise<Project>;
}

export class ProjectRepository implements IProjectRepository {
  async findAll(): Promise<Project[]> {
    return db.project.findMany({ orderBy: { order: "asc" } });
  }
  async findPublished(): Promise<Project[]> {
    return db.project.findMany({ where: { published: true }, orderBy: { order: "asc" } });
  }
  async create(data: ProjectInput): Promise<Project> {
    return db.project.create({ data: { ...data, live: data.live || null } });
  }

  async findById(id: string): Promise<Project | null> {
    return db.project.findUnique({ where: { id } });
  }
  async listTechs(): Promise<string[]> {
    const rows = await db.project.findMany({ select: { techs: true } });
    return [...new Set(rows.flatMap((r) => r.techs))].sort((a, b) => a.localeCompare(b));
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project> {
    const { id: _ignored, ...patch } = data;
    return db.project.update({ where: { id }, data: { ...patch, live: patch.live === "" ? null : patch.live } });
  }

  async remove(id: string): Promise<Project> {
    return db.project.delete({ where: { id } });
  }
}
