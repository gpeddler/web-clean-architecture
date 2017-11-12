import { Entity } from "domain/entities";

export interface JSONMapper<T extends Entity> {
    toJSON(entity: T): any;
    toEntity(json: any): T;
}
