import {Driver} from "../model/Driver"
import {Trip} from "../model/Trip"
import moment from "moment"
import {trim, negate, isEmpty} from "lodash"

const TIME_FORMAT = "HH:mm"
const NEW_LINE = /[\r\n]+/
const WHITESPACE = /\s+/
interface ObjectMap<T> { readonly [key: string]: T | undefined }

export const parseDrivers = (input: string): readonly Driver[] => {
    const driverMap = splitOn(NEW_LINE)(input)
        .map(splitOn(WHITESPACE))
        .map(toDriver)
        .reduce(mergeDriversWithSameName, {})

    return Object.values(driverMap)
}

const splitOn = (pattern: RegExp): (input: string) => readonly string[] => {
    return (input: string) => input
        .split(pattern)
        .map(trim)
        .filter(negate(isEmpty))
}

const toDriver = ([commandName, ...commandArguments]: readonly string[]): Driver => {
    switch (commandName) {
        case "Trip": return tripCommandToDriver(commandArguments)
        case "Driver": return driverCommandToDriver(commandArguments)
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

const mergeDriversWithSameName = (drivers: ObjectMap<Driver>, nextDriver: Driver): ObjectMap<Driver> => {
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
