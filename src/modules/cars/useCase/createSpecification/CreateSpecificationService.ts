import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationReposiitory: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationReposiitory.findByName(name);

    const string = "oi tchau suave";

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationReposiitory.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
