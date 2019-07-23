import {Driver} from "./model/Driver"
import {Trip, TripInput} from "./model/Trip"

export const isDriverInput = (line: string): boolean => {
    return line.trim().startsWith("Driver")
}

export const isTripInput = (line: string): boolean => {
    return line.trim().startsWith("Trip")
}

export const parseDriver = (line: string): string => {
    const [_, name] = line.trim().split(" ")
    return name
}

export const parseTrip = (line: string): TripInput => {
    const [_, driver, startTime, endTime, distance] = line.split(" ")
    return { driver, startTime, endTime, distance: Number(distance) }
}

export const parseDrivers = (input: string): ReadonlyArray<Driver> => {
    const lines = input.split("\n")

    const drivers = lines
        .filter(isDriverInput)
        .map(parseDriver)

    const trips = lines
        .filter(isTripInput)
        .map(parseTrip)

    return drivers
        .map(name => ({ name, trips: [] }) )

}
