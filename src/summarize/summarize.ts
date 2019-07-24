import {Driver} from "../model/Driver"
import {Trip, TripSummaryView} from "../model/Trip"
import {sumBy} from "lodash"
import {hoursElapsed} from "../util/time.util"

export const summarizeDriverTrips = ({name, trips}: Driver): TripSummaryView => {
    const filteredTrips = trips.filter(withinSpeedBounds)

    return ({
        driverName: name,
        totalMiles: totalMiles(filteredTrips),
        averageMilesPerHour: averageMilesPerHour(filteredTrips),
    })
}

const withinSpeedBounds = (trip: Trip): boolean => {
    const averageMph = averageMilesPerHour([trip])!
    return averageMph >= 5 && averageMph <= 100
}

const averageMilesPerHour = (trips: ReadonlyArray<Trip>): number | null => {
    return trips.length === 0 ? null : totalMiles(trips) / totalHours(trips)
}

const totalMiles = (trips: ReadonlyArray<Trip>): number => {
    return sumBy(trips, trip => trip.distance)
}

const totalHours = (trips: ReadonlyArray<Trip>): number => {
    return sumBy(trips, ({startTime, endTime}) => hoursElapsed(startTime, endTime))
}
