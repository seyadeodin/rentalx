import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/acccounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError("user is not admin");
  }

  return next();
}
