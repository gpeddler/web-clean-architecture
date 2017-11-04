import { Entity } from "core/entities";

export interface JSONMapper<T extends Entity> {
    toJSON(entity: T): any;
    toEntity(json: any): T;
}
