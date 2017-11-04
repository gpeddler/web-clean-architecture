import { List } from "immutable";
import { Observable } from "rxjs/Rx";
import { UserRepositoryType } from "core/repositories/user";
import { GithubApiProvider } from "data/http/api/github";
import { User } from "core/entities/user";

export class UserRepository implements UserRepositoryType {
    private githubApi: GithubApiProvider;

    constructor(githubApi: GithubApiProvider) {
        this.githubApi = githubApi;
    }

    search(query: string): Observable<List<User>> {
        return this.githubApi.searchUser(query);
    }

}
