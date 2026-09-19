import { projectSchema, updateProjectSchema, type ProjectInput, type UpdateProjectInput } from "@/dto/project.dto";
import { ProjectRepository } from "@/repositories/ProjectRepository";

export class ProjectService {
  constructor(private repo = new ProjectRepository()) {}

  list() {
    return this.repo.findAll();
  }

  listPublished() {
    return this.repo.findPublished();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  listTechs() {
    return this.repo.listTechs();
  }

  create(raw: unknown) {
    const data: ProjectInput = projectSchema.parse(raw);
    return this.repo.create(data);
  }

  update(raw: unknown) {
    const data: UpdateProjectInput = updateProjectSchema.parse(raw);
    return this.repo.update(data.id, data);
  }

  archive(id: string) {
    return this.repo.update(id, { id, published: false });
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
