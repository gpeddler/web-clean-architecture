import * as React from "react";
import { RouteComponentProps, RouteProps, withRouter } from "react-router";

export class Container extends React.Component<RouteComponentProps<any>> {
    render() {
        const { children } = this.props;
        return (
            <div>
                { children }
            </div>
        )
    }
}

export const AppContainer = withRouter<RouteProps>(Container);
