import {TripSummaryView} from "../model/Trip"

export const createTripSummariesView = (summaries: ReadonlyArray<TripSummaryView>): string => {
    return summaries.map(formatSummary).join("")
}

const formatSummary = ({ driverName, totalMiles, averageMilesPerHour }: TripSummaryView): string => {
    const formattedAverageMilesPerHourSection = averageMilesPerHour === null ? "" :  ` @ ${averageMilesPerHour} mph`
    return `${driverName}: ${totalMiles} miles${formattedAverageMilesPerHourSection}\n`
}
