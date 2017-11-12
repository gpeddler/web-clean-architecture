import { Observable, Scheduler } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { UseCase } from "domain/use-cases";
import { SubscriptionBag } from "ui/modules/subscription-bag";

declare module "domain/use-cases" {
    export interface UseCase<T> {
        runOnAnimateFrame(): Observable<T>
    }
}

UseCase.prototype.runOnAnimateFrame = function() {
    return this.run(Scheduler.async, Scheduler.animationFrame);
};


declare module "rxjs/Subscription" {
    export interface Subscription {
        unsubscribeBy(bag: SubscriptionBag): void;
    }
}

Subscription.prototype.unsubscribeBy = function(bag: SubscriptionBag) {
    bag.push(this);
};
