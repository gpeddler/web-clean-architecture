export function apply<T>(target: T, applier: (a: T) => void): T {
    applier(target);
    return target;
}

export function lets<T, U>(target: T, player: (it: T) => U): U {
    return player(target);
}

export function optional<T, U>(target: T, player: (it: T) => U): U {
    if (target === null || target === undefined) {
        return null;
    }
    return player(target);
}
