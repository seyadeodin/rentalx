import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/acccounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // [0] = Bearer
  // [1] = Token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "3c585768f17d9ed7c8b90986e7e7e1e1"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
