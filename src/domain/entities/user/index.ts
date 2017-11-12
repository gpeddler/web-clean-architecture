import { Entity } from "domain/entities";

export class User implements Entity {
    id: number;
    name: string;
    type: User.Type;

    constructor(
        id: number,
        name: string,
        type: User.Type
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

export module User {
    export enum Type {
        USER = 'User',
        ORGANIZATION = 'Org'
    }
}
