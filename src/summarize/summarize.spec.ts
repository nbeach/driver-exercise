import {expect} from "chai"
import {summarizeTrips} from "./summarize"
import {TripSummaryView} from "../model/Trip"
import {Driver} from "../model/Driver"


describe(summarizeTrips.name, () => {

    describe("the summary includes the", () => {
        let summary: TripSummaryView

        beforeEach(() => {
            const drivers: ReadonlyArray<Driver> = [   {
                name: "Dan",
                trips: [
                    { startTime: "01:00", endTime: "02:00", distance: 5},
                    { startTime: "03:00", endTime: "04:00", distance: 100},
                ],
            }]

            summary = summarizeTrips(drivers)[0]
        })

        it("driver name", () => {
            expect(summary.driverName).to.eql("Dan")
        })

        it("total miles driven", () => {
            expect(summary.totalMiles).to.eql(105)
        })

        it("average miles per hour", () => {
            expect(summary.averageMilesPerHour).to.eql(52.5)
        })

    })

    describe("when a driver has no trips it summarizes", () => {
        let summary: TripSummaryView

        beforeEach(() => {
            const drivers: ReadonlyArray<Driver> = [   {
                name: "Dan",
                trips: [],
            }]

            summary = summarizeTrips(drivers)[0]
        })

        it("total miles as zero", () => {
            expect(summary.totalMiles).to.eql(0)
        })

        it("average miles per hour as null", () => {
            expect(summary.averageMilesPerHour).to.be.null
        })

    })

    describe("excludes trips with", () => {

        it("an average speed less than 5mph", () => {
            const drivers: ReadonlyArray<Driver> = [   {
                name: "Dan",
                trips: [
                    { startTime: "01:00", endTime: "02:00", distance: 4.99},
                    { startTime: "03:00", endTime: "04:00", distance: 10},
                ],
            }]

            const summary = summarizeTrips(drivers)[0]

            expect(summary.averageMilesPerHour).to.eql(10)
            expect(summary.totalMiles).to.eql(10)
        })

        it("an average speed greater than 100mph", () => {
            const drivers: ReadonlyArray<Driver> = [   {
                name: "Dan",
                trips: [
                    { startTime: "01:00", endTime: "02:00", distance: 100.01},
                    { startTime: "03:00", endTime: "04:00", distance: 10},
                ],
            }]

            const summary = summarizeTrips(drivers)[0]

            expect(summary.averageMilesPerHour).to.eql(10)
            expect(summary.totalMiles).to.eql(10)
        })

    })

})
