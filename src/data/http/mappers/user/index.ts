import { JSONMapper } from "data/http/mappers";
import { User } from "domain/entities/user";
import { lets } from "utils";

export class UserMapper implements JSONMapper<User> {
    toJSON(entity: User): any {
        throw new Error("Method not implemented.");
    }

    toEntity(json: any): User {
        return new User(
            json.id,
            json.login,
            lets(json.type, it => {
                switch (it) {
                    case 'User':
                        return User.Type.USER;
                    case 'Org':
                        return User.Type.ORGANIZATION;
                    default:
                        return User.Type.USER;
                }
            })
        )
    }

}
