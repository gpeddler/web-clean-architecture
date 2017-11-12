import { Subscription } from "rxjs/Rx";

export class SubscriptionBag {
    private subscriptions: Array<Subscription> = [];

    push(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    destroy() {
        this.subscriptions.forEach(it => it.unsubscribe());
    }
}
