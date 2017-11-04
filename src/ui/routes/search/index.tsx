import * as React from "react";
import "ui/run-on-animate-frame";
import { View } from "ui/view";
import {
    SearchRouteProps,
    SearchRouteState,
    SearchRouteViewModel
} from "ui/routes/search/view-model";
import { ChangeEvent } from "react";

export class SearchRoute extends View<SearchRouteProps, SearchRouteState, SearchRouteViewModel> {
    render() {
        return (
            <div>
                <input type="text" onChange={ this.onChange } />
                { this.state.query }
            </div>
        )
    }

    resolve() {
        return new SearchRouteViewModel();
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.viewModel.onChangeSearchInput(e.target.value);
    }
}
