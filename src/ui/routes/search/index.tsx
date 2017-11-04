import * as React from "react";
import { View } from "ui/view";
import {
    SearchRouteProps,
    SearchRouteState,
    SearchRouteViewModel
} from "ui/routes/search/view-model";
import { ChangeEvent } from "react";
import { FetchState } from "ui/fetch-state";
import { User } from "core/entities/user";
import { List } from "immutable";

export class SearchRoute extends View<SearchRouteProps, SearchRouteState, SearchRouteViewModel> {
    resolve() {
        return new SearchRouteViewModel();
    }

    render() {
        const { users, fetchState } = this.state;
        return (
            <div>
                <input type="text" onChange={ this.onChange } />
                {
                    fetchState === FetchState.FETCHED ? (
                        this.renderUsers(users)
                    ) : fetchState === FetchState.FETCHING ? (
                        <div>loading ...</div>
                    ) : (
                        <div>error</div>
                    )
                }
            </div>
        )
    }

    private renderUsers = (users: List<User>) =>
        <ul>
            {
                users.map((user, i) =>
                    <li key={ `users-${i}` }>
                        { user.name }
                    </li>
                )
            }
        </ul>;

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.viewModel.onChangeSearchInput(e.target.value);
    }
}
