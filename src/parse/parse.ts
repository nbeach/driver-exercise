import {Driver} from "../model/Driver"
import {TripInput} from "../model/Trip"

export const parseDrivers = (input: string): ReadonlyArray<Driver> => {
    const commands = input
        .split("\n")
        .map(line => explodeLine(line))

    const drivers = commands
        .filter(isDriverCommand)
        .map(parseDriver)
        .map(name => ({ name, trips: [] }))

    const driverTrips = commands
        .filter(isTripCommand)
        .map(parseTrip)
        .map(toDriver)

    return Object.values([...drivers, ...driverTrips].reduce(mergeDrivers, {}))
}

const explodeLine = (line: string): ReadonlyArray<string> => {
    return line.split(" ")
        .map(value => value.trim())
        .filter(value => value !== "")
}

const isDriverCommand = ([command]: ReadonlyArray<string>): boolean => command === "Driver"
const isTripCommand = ([command]: ReadonlyArray<string>): boolean =>  command === "Trip"

const parseDriver = ([_, name]: ReadonlyArray<string>): string => name

const parseTrip = ([_, driverName, startTime, endTime, distance]: ReadonlyArray<string>): TripInput => ({
    driverName, startTime, endTime, distance: Number(distance),
})

const toDriver = ({driverName, startTime, endTime, distance}: TripInput): Driver => ({
    name: driverName,
    trips: [{ startTime, endTime, distance}],
})

interface ObjectMap<V> { readonly [key: string]: V | undefined }

const mergeDrivers = (drivers: ObjectMap<Driver>, nextDriver: Driver): ObjectMap<Driver> => {
    const existingDriver = drivers[nextDriver.name]

    const updatedDriver = existingDriver === undefined ? nextDriver : {
        ...existingDriver,
        trips: [...existingDriver.trips, ...nextDriver.trips],
    }

    return { ...drivers, [nextDriver.name]: updatedDriver }
}
