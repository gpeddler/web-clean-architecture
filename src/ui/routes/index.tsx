import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { AppContainer } from "ui/routes/container";
import { SearchRoute } from "ui/routes/search";

export const EntryRoute = () =>
    <div>
        <BrowserRouter>
            <AppContainer>
                <Switch>
                    <Route path="*" component={ SearchRoute } />
                </Switch>
            </AppContainer>
        </BrowserRouter>
    </div>;
