import { Scheduler } from "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { UseCase } from "core/use-cases";

declare module "core/use-cases" {
    export interface UseCase<T> {
        runOnAnimateFrame(): Observable<T>
    }
}

UseCase.prototype.runOnAnimateFrame = function() {
    return this.run(Scheduler.async, Scheduler.animationFrame);
};
