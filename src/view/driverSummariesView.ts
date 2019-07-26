import {DriverTripsSummary} from "../model/DriverTripsSummary"
import {sortBy} from "lodash"

export const driverSummariesView = (summaries: readonly DriverTripsSummary[]): string => {
    return sortBy(summaries, summary => summary.totalMiles)
        .reverse()
        .map(formatSummary)
        .join("")
}

const formatSummary = ({ name, totalMiles, averageMilesPerHour }: DriverTripsSummary): string => {
    const formattedAverageMilesPerHourSection = averageMilesPerHour === null ? "" :  ` @ ${averageMilesPerHour.toFixed(0)} mph`
    return `${name}: ${totalMiles.toFixed(0)} miles${formattedAverageMilesPerHourSection}\n`
}
