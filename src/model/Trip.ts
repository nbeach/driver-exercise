import {Moment} from "moment"

export interface Trip {
    readonly startTime: Moment
    readonly endTime: Moment
    readonly distance: number
}

export interface TripSummaryView {
    readonly driverName: string
    readonly totalMiles: number
    readonly averageMilesPerHour: number | null
}
