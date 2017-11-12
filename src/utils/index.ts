import { List } from "immutable";

export function apply<T>(target: T, applier: (a: T) => void): T {
    applier(target);
    return target;
}

export function lets<T, U>(target: T, player: (it: T) => U): U {
    return player(target);
}

export const emptyList = () => List([]);
