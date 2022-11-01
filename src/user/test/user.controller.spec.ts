import { Test } from "@nestjs/testing"
import { UserController } from "../user.controller"
import { UserService } from "../user.service"

jest.mock('../user.service')

describe('UserController', () => {
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [ UserController ],
            providers: [ UserService ]
        }).compile();
    })
})