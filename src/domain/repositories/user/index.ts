import { List } from "immutable";
import { Observable } from "rxjs/Rx";
import { RepositoryType } from "domain/repositories";
import { User } from "domain/entities/user";

export interface UserRepositoryType extends RepositoryType {
    search(query: string): Observable<List<User>>
}
