import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailablCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query as {
      [key: string]: string;
    };

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand,
      name,
      category_id,
    });

    return response.json(cars);
  }
}

export { ListAvailablCarsController };
