import * as React from "react";
import { ViewModel } from "ui/view-model";
import { Subscription } from "rxjs/Subscription";

export abstract class View<P, S, VM extends ViewModel<P, S>> extends React.Component<P, S> {
    private stateSubscription: Subscription;
    viewModel: VM;

    constructor() {
        super();
        this.viewModel = this.resolve();
        this.state = this.viewModel.state.value;
    }

    componentDidMount() {
        this.stateSubscription = this.viewModel.state.subscribe(
            state => this.setState(state)
        );
    }

    componentWillUnmount() {
        this.stateSubscription.unsubscribe();
    }

    abstract resolve(): VM;
}
