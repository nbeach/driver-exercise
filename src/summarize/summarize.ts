import {Driver} from "../model/Driver"
import {Trip} from "../model/Trip"
import {sumBy, isEmpty} from "lodash"
import {hoursElapsed} from "../common/time.util"
import {DriverTripsSummary} from "../model/DriverTripsSummary"

export const summarizeDriverTrips = ({name, trips}: Driver): DriverTripsSummary => {
    const tripsWithinSpeedBounds = trips.filter(withinSpeedBounds)

    return ({
        name,
        totalMiles: totalMiles(tripsWithinSpeedBounds),
        averageMilesPerHour: averageMilesPerHour(tripsWithinSpeedBounds),
    })
}

const withinSpeedBounds = (trip: Trip): boolean => {
    const averageMph = averageMilesPerHour([trip])!
    return averageMph >= 5 && averageMph <= 100
}

const averageMilesPerHour = (trips: readonly Trip[]): number | null => {
    return isEmpty(trips) ? null : totalMiles(trips) / totalHours(trips)
}

const totalMiles = (trips: readonly Trip[]): number => {
    return sumBy(trips, trip => trip.distance)
}

const totalHours = (trips: readonly Trip[]): number => {
    return sumBy(trips, ({startTime, endTime}) => hoursElapsed(startTime, endTime))
}
