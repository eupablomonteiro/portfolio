import { experienceSchema, type ExperienceInput } from "@/dto/experience.dto";
import { ExperienceRepository } from "@/repositories/ExperienceRepository";

export class ExperienceService {
  constructor(private repo = new ExperienceRepository()) {}

  list() {
    return this.repo.findAll();
  }

  create(raw: unknown) {
    const data: ExperienceInput = experienceSchema.parse(raw);
    return this.repo.create(data);
  }
}
