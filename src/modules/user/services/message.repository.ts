import { Injectable } from "@nestjs/common";
import { IUserMessage } from "../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { CreateContactMessageDTO } from "../dto/message";
import { UserMessage } from "../domain";

@Injectable()
export class UserMessageRepository {
  constructor(
    @InjectModel(DB_MOELS.USER_MESSAGES)
    private readonly model: Model<IUserMessage>,
  ) {}

  async create({
    email,
    fullName,
    message,
    user,
  }: CreateContactMessageDTO): Promise<UserMessage> {
    const newMessage = new this.model({
      user: user,
      fullName: fullName,
      email: email,
      message: message,
    });

    await newMessage.save();

    return this.map(newMessage);
  }

  private map(message: IUserMessage): UserMessage {
    return new UserMessage({
      email: message.email,
      fullName: message.fullName,
      id: message.id,
      message: message.message,
    });
  }
}
