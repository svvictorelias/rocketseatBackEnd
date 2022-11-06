import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUsecase } from "./updateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateUserAvatarUsecase = container.resolve(UpdateUserAvatarUsecase);

    await updateUserAvatarUsecase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
