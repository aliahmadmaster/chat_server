import mongoose from "mongoose";
import { User } from "src/user/schema/user.schema";

export const userStub = (): User => {
    return {
       email: 'test@example.com',
       _id: new mongoose.Types.ObjectId(),
       name: 'Tester1',
       password:'12345678',
    }
}