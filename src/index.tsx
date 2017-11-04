import * as React from "react";
import * as ReactDOM from "react-dom";
import Axios from "axios";
import { Config } from "application/config";
import { Context } from "application/context";
import { EntryRoute } from "ui/routes";

const axiosInstance = Axios.create({
    baseURL: Config.hosts.github,
    timeout: Config.timeout,
    headers: {
        'Accept': 'application/json'
    }
});

export const Application = new Context(axiosInstance);

ReactDOM.render(
    <EntryRoute />,
    document.getElementById('root')
);
