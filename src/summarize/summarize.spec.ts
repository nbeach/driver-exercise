import {expect} from "chai"
import {summarizeTrips} from "./summarize"
import {TripSummaryView} from "../model/Trip"
import {Driver} from "../model/Driver"


describe(summarizeTrips.name, () => {
    let summary: TripSummaryView

    beforeEach(() => {
        const drivers: ReadonlyArray<Driver> = [   {
            name: "Dan",
            trips: [
                { startTime: "01:00", endTime: "02:00", distance: 5},
                { startTime: "03:00", endTime: "04:00", distance: 10},
            ],
        }]

        summary = summarizeTrips(drivers)[0]
    })

    it("includes the driver name", () => {
        expect(summary.driverName).to.eql("Dan")
    })

    it("calculates the total miles driven", () => {
        expect(summary.totalMiles).to.eql(15)
    })

    it("calculates the average miles per hour", () => {
        expect(summary.averageMilesPerHour).to.eql(7.5)
    })

})
