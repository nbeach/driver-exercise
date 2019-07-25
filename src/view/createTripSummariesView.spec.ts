import {createTripSummariesView} from "./createTripSummariesView"
import {expect} from "chai"
import {TripSummary} from "../model/TripSummary"

describe(createTripSummariesView.name, () => {

    it("formats trip summaries for viewing in order by miles driven descending", () => {
        const summaries: ReadonlyArray<TripSummary> = [
            { driverName: "Alex", totalMiles: 20, averageMilesPerHour: 50 },
            { driverName: "Sarah", totalMiles: 30, averageMilesPerHour: 70 },
            { driverName: "Dan", totalMiles: 10, averageMilesPerHour: 60 },
        ]

        expect(createTripSummariesView(summaries))
            .to.eql("Sarah: 30 miles @ 70 mph\nAlex: 20 miles @ 50 mph\nDan: 10 miles @ 60 mph\n")
    })

    it("when a driver does not have an average miles per hour it excludes that section for the driver", () => {
        const summaries: ReadonlyArray<TripSummary> = [
            { driverName: "Dan", totalMiles: 0, averageMilesPerHour: null },
        ]

        expect(createTripSummariesView(summaries)).to.eql("Dan: 0 miles\n")
    })

    describe("rounds to a whole number the", () => {

        it("total miles", () => {
            const summaries: ReadonlyArray<TripSummary> = [
                { driverName: "Alex", totalMiles: 20.5, averageMilesPerHour: 1 },
            ]

            expect(createTripSummariesView(summaries))
                .to.eql("Alex: 21 miles @ 1 mph\n")
        })

        it("average miles per hour", () => {
            const summaries: ReadonlyArray<TripSummary> = [
                { driverName: "Alex", totalMiles: 1, averageMilesPerHour: 20.4 },
            ]

            expect(createTripSummariesView(summaries))
                .to.eql("Alex: 1 miles @ 20 mph\n")
        })

    })


})
