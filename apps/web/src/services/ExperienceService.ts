import {
  experienceSchema,
  updateExperienceSchema,
  type ExperienceInput,
  type UpdateExperienceInput,
} from "@/dto/experience.dto";
import { ExperienceRepository } from "@/repositories/ExperienceRepository";

export class ExperienceService {
  constructor(private repo = new ExperienceRepository()) {}

  list() {
    return this.repo.findAll();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  listTechs() {
    return this.repo.listTechs();
  }

  create(raw: unknown) {
    const data: ExperienceInput = experienceSchema.parse(raw);
    return this.repo.create(data);
  }

  update(raw: unknown) {
    const data: UpdateExperienceInput = updateExperienceSchema.parse(raw);
    return this.repo.update(data.id, data);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
