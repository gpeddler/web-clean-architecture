import * as Rx from "rxjs/Rx";
import { ViewModel } from "ui/view-model";
import { apply, emptyList } from "utils/index";
import { FetchState } from "ui/fetch-state";
import { List } from "immutable";
import { User } from "core/entities/user";
import { Application } from "application/index";
import "ui/run-on-animate-frame";

export interface SearchRouteProps {
    /* explicitly empty */
}

export interface SearchRouteState {
    fetchState: FetchState;
    users: List<User>;
}

export class SearchRouteViewModel implements ViewModel<SearchRouteProps, SearchRouteState> {
    private query = new Rx.Subject<string>();

    state = new Rx.BehaviorSubject({
        fetchState: FetchState.FETCHED,
        users: emptyList()
    });

    constructor() {
        this.query
            .debounceTime(500, Rx.Scheduler.async)
            .subscribeOn(Rx.Scheduler.animationFrame)
            .subscribe(query => this.fetchUsers(query))
    }

    onChangeSearchInput = (query: string) => {
        this.query.next(query);
    };

    private fetchUsers = (query: string) => {
        this.state.next(
            apply(this.state.value, it => {
                it.fetchState = FetchState.FETCHING
            })
        );

        apply(Application.searchUsers(), it => it.query = query)
            .runOnAnimateFrame()
            .subscribe(
                result =>
                    this.state.next(
                        apply(this.state.value, it => {
                            it.users = result;
                            it.fetchState = FetchState.FETCHED;
                        })
                    ),
                error =>
                    this.state.next(
                        apply(this.state.value, it => {
                            it.fetchState = FetchState.ERROR;
                        })
                    )
            )
    };
}
