import { AxiosInstance } from "axios";
import { Observable } from "rxjs/Rx";

export abstract class HttpProvider {
    private httpInstance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.httpInstance = instance;
    }

    protected requestGET = (url: string, params: any = {}, headers: any = {}) =>
        Observable.fromPromise(
            this.httpInstance.get(url, { params, headers })
        ).map(response => response.data);

}
