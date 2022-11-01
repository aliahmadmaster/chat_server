import { AbstractModel } from "src/database/abstract.model";

export class UserModel extends AbstractModel {
    
    readonly name: string;

    readonly email: string;
}