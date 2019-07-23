import {Driver} from "./model/Driver"
import {Trip, TripInput} from "./model/Trip"

export const parseDrivers = (input: string): ReadonlyArray<Driver> => {
    const lines = input.split("\n")

    const drivers = lines
        .filter(isDriverInput)
        .map(parseDriver)
        .map(name => ({ name, trips: [] }))

    const driverTrips = lines
        .filter(isTripInput)
        .map(parseTrip)
        .map(toDriver)

    return Object.values([...drivers, ...driverTrips].reduce(mergeDrivers, {}))
}

const explodeLine = (line: string): ReadonlyArray<string> => {
    return line.split(" ")
        .map(value => value.trim())
        .filter(value => value !== "")
}

const isDriverInput = (line: string): boolean => {
    return explodeLine(line)[0] === "Driver"
}

const isTripInput = (line: string): boolean => {
    return explodeLine(line)[0] === "Trip"
}

const parseDriver = (line: string): string => {
    const [_, name] = explodeLine(line)
    return name
}

const parseTrip = (line: string): TripInput => {
    const [_, driverName, startTime, endTime, distance] = explodeLine(line)
    return { driverName, startTime, endTime, distance: Number(distance) }
}

const toDriver = ({driverName, startTime, endTime, distance}: TripInput): Driver => {
    return {
        name: driverName,
        trips: [{ startTime, endTime, distance}],
    }
}

interface ObjectMap<V> { readonly [key: string]: V | undefined }

const mergeDrivers = (drivers: ObjectMap<Driver>, nextDriver: Driver): ObjectMap<Driver> => {
    const existingEntry = drivers[nextDriver.name]

    if (existingEntry !== undefined) {
        return {
            ...drivers,
            [nextDriver.name]: {
                ...existingEntry,
                trips: [...existingEntry.trips, ...nextDriver.trips],
            },
        }
    } else {
        return {
            ...drivers,
            [nextDriver.name]: nextDriver,
        }
    }
}
