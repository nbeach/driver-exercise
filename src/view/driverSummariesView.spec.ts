import {driverSummariesView} from "./driverSummariesView"
import {expect} from "chai"
import {DriverTripsSummary} from "../model/DriverTripsSummary"

describe(driverSummariesView.name, () => {

    it("formats trip summaries for viewing in order by miles driven descending", () => {
        const summaries: readonly DriverTripsSummary[] = [
            { name: "Alex", totalMiles: 20, averageMilesPerHour: 50 },
            { name: "Sarah", totalMiles: 30, averageMilesPerHour: 70 },
            { name: "Dan", totalMiles: 10, averageMilesPerHour: 60 },
        ]

        expect(driverSummariesView(summaries))
            .to.eql("Sarah: 30 miles @ 70 mph\nAlex: 20 miles @ 50 mph\nDan: 10 miles @ 60 mph\n")
    })

    it("when a driver does not have an average miles per hour it excludes that section for the driver", () => {
        const summaries: readonly DriverTripsSummary[] = [
            { name: "Dan", totalMiles: 0, averageMilesPerHour: null },
        ]

        expect(driverSummariesView(summaries)).to.eql("Dan: 0 miles\n")
    })

    describe("rounds to a whole number the", () => {

        it("total miles", () => {
            const summaries: readonly DriverTripsSummary[] = [
                { name: "Alex", totalMiles: 20.5, averageMilesPerHour: 1 },
            ]

            expect(driverSummariesView(summaries))
                .to.eql("Alex: 21 miles @ 1 mph\n")
        })

        it("average miles per hour", () => {
            const summaries: readonly DriverTripsSummary[] = [
                { name: "Alex", totalMiles: 1, averageMilesPerHour: 20.4 },
            ]

            expect(driverSummariesView(summaries))
                .to.eql("Alex: 1 miles @ 20 mph\n")
        })

    })


})
