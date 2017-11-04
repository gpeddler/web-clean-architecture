import { Observable } from "rxjs/Rx";
import { Scheduler } from "rxjs/Scheduler";

export abstract class UseCase<T> {
    protected abstract build(): Observable<T>;
    protected abstract validate(): boolean;

    run(
        executorScheduler: Scheduler,
        postExecutionScheduler: Scheduler
    ): Observable<T> {
        if (!this.validate()) {
            throw Error("Invalid params in UseCase");
        }

        return this.build()
            .subscribeOn(executorScheduler)
            .observeOn(postExecutionScheduler)
    }

}
