import {TripSummary} from "../model/TripSummary";

export const createTripSummariesView = (summaries: ReadonlyArray<TripSummary>): string => {
    return summaries.map(formatSummary).join("")
}

const formatSummary = ({ driverName, totalMiles, averageMilesPerHour }: TripSummary): string => {
    const formattedAverageMilesPerHourSection = averageMilesPerHour === null ? "" :  ` @ ${averageMilesPerHour} mph`
    return `${driverName}: ${totalMiles} miles${formattedAverageMilesPerHourSection}\n`
}
