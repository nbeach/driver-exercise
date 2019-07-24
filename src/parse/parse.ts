import {Driver} from "../model/Driver"
import {Trip} from "../model/Trip"
import moment from "moment"

const TIME_FORMAT = "HH:mm"

interface ObjectMap<T> { readonly [key: string]: T | undefined }
type Command = ReadonlyArray<string>

export const parseDrivers = (input: string): ReadonlyArray<Driver> => {
    const driverMap = splitLines(input)
        .map(toCommand)
        .map(toDriver)
        .reduce(mergeDuplicateDrivers, {})

    return Object.values(driverMap)
}

const splitLines = (input: string): ReadonlyArray<string> => {
    return input
        .trim()
        .split(/[\r\n]+/)
        .filter(value => value.trim() !== "")
}

const toCommand = (line: string): Command => {
    return line
        .split(/\s+/)
        .filter(value => value !== "")
}


const toDriver = ([commandName, ...args]: Command): Driver => {
    switch (commandName) {
        case "Trip":
            return tripCommandToDriver(args)
        case "Driver":
            return driverCommandToDriver(args)
        default:
            throw new Error("Unknown Command")
    }
}

const tripCommandToDriver = ([name, startTime, endTime, distance]: ReadonlyArray<string>): Driver => ({
    name,
    trips: [{
        startTime: moment(startTime, TIME_FORMAT),
        endTime: moment(endTime, TIME_FORMAT),
        distance: Number(distance),
    }],
})

const driverCommandToDriver = ([name]: ReadonlyArray<string>): Driver => ({
    name,
    trips: [],
})

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
