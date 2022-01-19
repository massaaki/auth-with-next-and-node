import { MeController } from "@/presentation/controllers/account/me/me-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeMeController = (): IController => {
  const controller = new MeController();
  return controller;
};
