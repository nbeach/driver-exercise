import {Moment} from "moment"

export interface Trip {
    readonly startTime: Moment
    readonly endTime: Moment
    readonly distance: number
}
