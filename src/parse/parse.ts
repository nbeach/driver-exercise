import {Driver} from "../model/Driver"
import {Trip} from "../model/Trip"
import moment from "moment"
import {trim, negate, isEmpty} from "lodash"

const TIME_FORMAT = "HH:mm"

interface ObjectMap<T> { readonly [key: string]: T | undefined }

export const parseDrivers = (input: string): readonly Driver[] => {
    const driverMap = splitLines(input)
        .map(splitCommandAndArgs)
        .map(toDriver)
        .reduce(mergeDuplicateDrivers, {})

    return Object.values(driverMap)
}

const splitLines = (input: string): readonly string[] => {
    return input
        .trim()
        .split(/[\r\n]+/)
        .map(trim)
        .filter(negate(isEmpty))
}

const splitCommandAndArgs = (line: string): readonly string[] => {
    return line
        .split(/\s+/)
        .filter(negate(isEmpty))
}


const toDriver = ([commandName, ...args]: readonly string[]): Driver => {
    switch (commandName) {
        case "Trip": return tripCommandToDriver(args)
        case "Driver": return driverCommandToDriver(args)
        default: throw new Error("Unknown Command")
    }
}

const tripCommandToDriver = ([name, startTime, endTime, distance]: readonly string[]): Driver => ({
    name,
    trips: [{
        startTime: moment(startTime, TIME_FORMAT),
        endTime: moment(endTime, TIME_FORMAT),
        distance: Number(distance),
    }],
})

const driverCommandToDriver = ([name]: readonly string[]): Driver => ({
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
