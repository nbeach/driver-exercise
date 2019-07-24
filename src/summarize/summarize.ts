import moment from "moment"
import {Driver} from "../model/Driver"
import {Trip, TripSummaryView} from "../model/Trip"

export const summarizeTrips = (drivers: ReadonlyArray<Driver>): ReadonlyArray<TripSummaryView> => {
    return drivers.map(({name, trips}) => {
        const filteredTrips = trips.filter(trip => {
            const averageMilesPerHourForTrip = averageMilesPerHour([trip])
            return averageMilesPerHourForTrip === null || (averageMilesPerHourForTrip >= 5 && averageMilesPerHourForTrip <= 100)
        })

        return ({
            driverName: name,
            totalMiles: totalMiles(filteredTrips),
            averageMilesPerHour: averageMilesPerHour(filteredTrips),
        })
    })
}

const totalMiles = (trips: ReadonlyArray<Trip>): number => {
    return trips.reduce((totalDistance, nextTrip) => totalDistance + nextTrip.distance, 0)
}

const totalHours = (trips: ReadonlyArray<Trip>): number => {
    return trips.reduce((totalHours, nextTrip) => totalHours + timeDifference(nextTrip.startTime, nextTrip.endTime), 0)
}

const timeDifference = (startTime: string, endTime: string): number => {
    const startMoment = moment(startTime, "HH:mm")
    const endMoment = moment(endTime, "HH:mm")

    const timeDifference = endMoment.diff(startMoment)
    return moment.duration(timeDifference).asHours()
}

const averageMilesPerHour = (trips: ReadonlyArray<Trip>): number | null => {
    return trips.length === 0 ? null : totalMiles(trips) / totalHours(trips)
}
