import {Driver} from "../model/Driver"
import {Trip} from "../model/Trip"

interface ObjectMap<T> { readonly [key: string]: T | undefined }
type Command = ReadonlyArray<string>

export const parseDrivers = (input: string): ReadonlyArray<Driver> => {
    const driverMap = splitLines(input)
        .map(toCommand)
        .map(toDriver)
        .reduce(mergeDuplicateDrivers, {})

    return Object.values(driverMap)
}

const toCommand = (line: string): Command => {
    return line
        .split(/\s+/)
        .filter(value => value !== "")
}

const splitLines = (input: string): ReadonlyArray<string> => {
    return input
        .trim()
        .split(/[\r\n]+/)
        .filter(value => value.trim() !== "")
}

const toDriver = ([commandName, ...args]: Command): Driver => {
    switch (commandName) {
        case "Trip":
            const [name, startTime, endTime, distance] = args
            return { name, trips: [{ startTime, endTime, distance: Number(distance)}] }

        case "Driver":
            const [driverName] = args
            return { name: driverName, trips: [] }

        default:
            throw new Error("Unknown Command")
    }
}

const mergeDuplicateDrivers = (drivers: ObjectMap<Driver>, nextDriver: Driver): ObjectMap<Driver> => {
    const existingDriver = drivers[nextDriver.name]

    const updatedDriver = existingDriver === undefined ? nextDriver : {
        ...existingDriver,
        trips: [...existingDriver.trips, ...nextDriver.trips],
    }

    return {
        ...drivers,
        [nextDriver.name]: updatedDriver,
    }
}
