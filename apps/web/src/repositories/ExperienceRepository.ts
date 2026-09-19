import { db } from "@/lib/db";
import type { ExperienceInput, UpdateExperienceInput } from "@/dto/experience.dto";
import type { Experience } from "@/generated/prisma/client";

export interface IExperienceRepository {
  findAll(): Promise<Experience[]>;
  findById(id: string): Promise<Experience | null>;
  listTechs(): Promise<string[]>;
  create(data: ExperienceInput): Promise<Experience>;
  update(id: string, data: UpdateExperienceInput): Promise<Experience>;
  remove(id: string): Promise<Experience>;
}

export class ExperienceRepository implements IExperienceRepository {
  async findAll(): Promise<Experience[]> {
    return db.experience.findMany({ orderBy: { order: "asc" } });
  }

  async findById(id: string): Promise<Experience | null> {
    return db.experience.findUnique({ where: { id } });
  }

  async listTechs(): Promise<string[]> {
    const rows = await db.experience.findMany({ select: { techs: true } });
    return [...new Set(rows.flatMap((r) => r.techs))].sort((a, b) => a.localeCompare(b));
  }

  async create(data: ExperienceInput): Promise<Experience> {
    return db.experience.create({ data });
  }

  async update(id: string, data: UpdateExperienceInput): Promise<Experience> {
    const { id: _ignored, ...patch } = data;
    return db.experience.update({ where: { id }, data: patch });
  }

  async remove(id: string): Promise<Experience> {
    return db.experience.delete({ where: { id } });
  }
}
