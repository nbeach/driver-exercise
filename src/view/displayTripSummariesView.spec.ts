import {displayTripSummariesView} from "./displayTripSummariesView"
import {TripSummaryView} from "../model/Trip"
import {expect} from "chai"

describe(displayTripSummariesView.name, () => {

    it("formats trip summaries for viewing", () => {
        const summaries: ReadonlyArray<TripSummaryView> = [
            { driverName: "Dan", totalMiles: 10, averageMilesPerHour: 20 },
            { driverName: "Alex", totalMiles: 30, averageMilesPerHour: 40 },
        ]

        const actual = displayTripSummariesView(summaries)

        expect(actual).to.eql("Dan: 10 miles @ 20 mph\nAlex: 30 miles @ 40 mph\n")
    })

    it("when a driver has not average miles per hour it excludes it", () => {
        const summaries: ReadonlyArray<TripSummaryView> = [
            { driverName: "Dan", totalMiles: 0, averageMilesPerHour: null },
        ]

        const actual = displayTripSummariesView(summaries)

        expect(actual).to.eql("Dan: 0 miles\n")
    })

})
