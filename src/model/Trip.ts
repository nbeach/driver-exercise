export interface Trip {
    readonly startTime: string
    readonly endTime: string
    readonly distance: number
}

export interface TripInput  {
    readonly driverName: string
    readonly startTime: string
    readonly endTime: string
    readonly distance: number
}

export interface TripSummaryView {
    readonly driverName: string
    readonly totalMiles: number
    readonly averageMilesPerHour: number | null
}
