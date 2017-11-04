import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface ViewModel<P = {}, S = {}> {
    state: BehaviorSubject<S>;
}
