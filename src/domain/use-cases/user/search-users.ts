import { UseCase } from "domain/use-cases";
import { List } from "immutable";
import { User } from "domain/entities/user";
import { Observable } from "rxjs/Rx";
import { UserRepositoryType } from "domain/repositories/user";

export class SearchUsers extends UseCase<List<User>> {
    private repository: UserRepositoryType;
    query: string = null;

    constructor(repository: UserRepositoryType) {
        super();
        this.repository = repository;
    }

    protected build(): Observable<List<User>> {
        return this.repository.search(this.query);
    }

    protected validate(): boolean {
        return this.query !== null;
    }

}
