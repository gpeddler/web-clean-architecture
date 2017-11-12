import { HttpProvider } from "data/http";
import { Observable } from "rxjs/Observable";
import { List } from "immutable";
import { User } from "domain/entities/user";
import { UserMapper } from "data/http/mappers/user";

export class GithubApiProvider extends HttpProvider {
    searchUser(query: string): Observable<List<User>> {
        return this.requestGET('/search/users', { q: query })
            .map(result =>
                result.items.map((item: any) =>
                    new UserMapper().toEntity(item)
                )
            )
    }

}
