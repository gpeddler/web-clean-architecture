import { AxiosInstance } from "axios";
import { UserRepository } from "data/repositories/user";
import { GithubApiProvider } from "data/http/api/github";
import { SearchUsers } from "domain/use-cases/user/search-users";

interface ApiProviderDependencies {
    github: GithubApiProvider;
}

interface RepositoryDependencies {
    user: UserRepository;
}

export class Context {
    private githubAxiosInstance: AxiosInstance;
    private apiProviders: ApiProviderDependencies;
    private repositories: RepositoryDependencies;

    constructor(githubAxiosInstance: AxiosInstance) {
        this.githubAxiosInstance = githubAxiosInstance;
        this.apiProviders = {
            github: new GithubApiProvider(githubAxiosInstance)
        };
        this.repositories = {
            user: new UserRepository(this.apiProviders.github)
        };
    }

    searchUsers = () => new SearchUsers(this.repositories.user);
}
