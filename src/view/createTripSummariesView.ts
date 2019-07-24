import {TripSummary} from "../model/TripSummary"
import {sortBy} from "lodash"

export const createTripSummariesView = (summaries: ReadonlyArray<TripSummary>): string => {
    return sortBy(summaries, summary => summary.totalMiles)
        .reverse()
        .map(formatSummary)
        .join("")
}

const formatSummary = ({ driverName, totalMiles, averageMilesPerHour }: TripSummary): string => {
    const formattedAverageMilesPerHourSection = averageMilesPerHour === null ? "" :  ` @ ${averageMilesPerHour.toFixed(0)} mph`
    return `${driverName}: ${totalMiles.toFixed(0)} miles${formattedAverageMilesPerHourSection}\n`
}
