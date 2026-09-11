import { db } from "@/lib/db";
import type { ExperienceInput } from "@/dto/experience.dto";
import type { Experience } from "@/generated/prisma/client";

export interface IExperienceRepository {
  findAll(): Promise<Experience[]>;
  create(data: ExperienceInput): Promise<Experience>;
}

export class ExperienceRepository implements IExperienceRepository {
  async findAll(): Promise<Experience[]> {
    return db.experience.findMany({ orderBy: { order: "asc" } });
  }
  async create(data: ExperienceInput): Promise<Experience> {
    return db.experience.create({ data });
  }
}
