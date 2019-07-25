import {Trip} from "./Trip"

export interface Driver {
    readonly name: string
    readonly trips: readonly Trip[]
}
