import { List } from "immutable";
import { Observable } from "rxjs/Rx";
import { RepositoryType } from "core/repositories";
import { User } from "core/entities/user";

export interface UserRepositoryType extends RepositoryType {
    search(query: string): Observable<List<User>>
}
