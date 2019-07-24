import {createTripSummariesView} from "./createTripSummariesView"
import {TripSummaryView} from "../model/Trip"
import {expect} from "chai"

describe(createTripSummariesView.name, () => {

    it("formats trip summaries for viewing", () => {
        const summaries: ReadonlyArray<TripSummaryView> = [
            { driverName: "Dan", totalMiles: 10, averageMilesPerHour: 20 },
            { driverName: "Alex", totalMiles: 30, averageMilesPerHour: 40 },
        ]

        expect(createTripSummariesView(summaries)).to.eql("Dan: 10 miles @ 20 mph\nAlex: 30 miles @ 40 mph\n")
    })

    it("when a driver does not have an average miles per hour it excludes that section for the driver", () => {
        const summaries: ReadonlyArray<TripSummaryView> = [
            { driverName: "Dan", totalMiles: 0, averageMilesPerHour: null },
        ]

        expect(createTripSummariesView(summaries)).to.eql("Dan: 0 miles\n")
    })

})
