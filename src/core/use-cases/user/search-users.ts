import { UseCase } from "core/use-cases";
import { List } from "immutable";
import { User } from "core/entities/user";
import { Observable } from "rxjs/Rx";
import { UserRepositoryType } from "core/repositories/user";

export class SearchUsers extends UseCase<List<User>> {
    private repository: UserRepositoryType;
    query: string;

    constructor(repository: UserRepositoryType) {
        super();
        this.repository = repository;
    }

    protected build(): Observable<List<User>> {
        return this.repository.search(this.query);
    }

    protected validate(): boolean {
        return this.query && this.query.length > 2;
    }

}
