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

export interface TripSummary {
    readonly driverName: string
    readonly miles: number
    readonly averageSpeed: number
}
