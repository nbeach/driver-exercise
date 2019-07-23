export interface Trip {
    readonly startTime: string
    readonly endTime: string
    readonly distance: number
}

export interface TripInput  {
    readonly driver: string
    readonly startTime: string
    readonly endTime: string
    readonly distance: number
}
