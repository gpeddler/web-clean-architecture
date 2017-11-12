import * as React from "react";
import { List } from "immutable";
import { Scheduler } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { User } from "domain/entities/user";
import { Application } from "application/index";
import { SubscriptionBag } from "ui/modules/subscription-bag";
import { FetchState } from "ui/modules/fetch-state";
import { apply, emptyList } from "utils/index";
import "ui/extension";

interface Props {
    /* explicitly empty */
}

interface State {
    fetchState: FetchState;
    users: List<User>;
}

export class GithubSearch extends React.Component<Props, State> {
    state = {
        fetchState: FetchState.FETCHED,
        users: emptyList()
    };

    private subscriptionBag = new SubscriptionBag();
    private queryStream = new Subject<string>();

    componentDidMount() {
        this.queryStream
            .debounceTime(300, Scheduler.async)
            .subscribeOn(Scheduler.animationFrame)
            .subscribe(query => this.search(query))
    }

    componentWillUnmount() {
        this.subscriptionBag.destroy();
    }

    render() {
        const { users, fetchState } = this.state;
        return (
            <div>
                <input type="text" onChange={ this.onChangeSearchQuery } />
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

    private onChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.queryStream.next(e.target.value);
    };

    private search = (query: string) => {
        this.setState({
            fetchState: FetchState.FETCHING
        },  () =>
            apply(Application.searchUsers(), it => it.query = query)
                .runOnAnimateFrame()
                .subscribe(
                    users =>
                        this.setState({
                            users,
                            fetchState: FetchState.FETCHED
                        }),
                    error =>
                        this.setState({
                            fetchState: FetchState.ERROR
                        })
                )
                .unsubscribeBy(this.subscriptionBag)
        );
    }
}
