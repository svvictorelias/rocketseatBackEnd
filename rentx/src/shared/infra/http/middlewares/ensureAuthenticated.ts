import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "5ce591089f1064ddd07e911b9f414498"
    ) as IPayload;
    const usersRepository = new UserRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user_id
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}