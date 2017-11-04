import * as Rx from "rxjs/Rx";
import { ViewModel } from "ui/view-model";
import { apply } from "utils/index";

export interface SearchRouteProps {
    /* explicitly empty */
}

export interface SearchRouteState {
    query: string;
}

export class SearchRouteViewModel implements ViewModel<SearchRouteProps, SearchRouteState> {
    private query = new Rx.Subject<string>();

    state = new Rx.BehaviorSubject({
        query: ''
    });

    constructor() {
        this.query
            .debounceTime(1000, Rx.Scheduler.async)
            .subscribeOn(Rx.Scheduler.animationFrame)
            .subscribe(result => {
                this.state.next(
                    apply(this.state.value, it => it.query = result)
                )
            })
    }

    onChangeSearchInput = (query: string) => {
        this.query.next(query);
    }
}
