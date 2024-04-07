import { Request } from "express";
import { CurrentUser } from "../domain";

export type UserRequest = Request & { user: CurrentUser };
