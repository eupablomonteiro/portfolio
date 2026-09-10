import { projectSchema, type ProjectInput } from "@/dto/project.dto";
import { ProjectRepository } from "@/repositories/ProjectRepository";

export class ProjectService {
  constructor(private repo = new ProjectRepository()) {}

  list() {
    return this.repo.findAll();
  }

  create(raw: unknown) {
    const data: ProjectInput = projectSchema.parse(raw);
    return this.repo.create(data);
  }
}
