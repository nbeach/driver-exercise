import {expect} from "chai"
import {Driver} from "../model/Driver"
import {summarizeDriverTrips} from "./summarize"
import {time} from "../util/test.util"
import {TripSummaryView} from "../model/TripSummaryView";


describe(summarizeDriverTrips.name, () => {

    describe("processes drivers into a summary that includes the", () => {
        let summary: TripSummaryView

        beforeEach(() => {
            const driver: Driver = {
                name: "Dan",
                trips: [
                    { startTime: time("01:00"), endTime: time("02:00"), distance: 5 },
                    { startTime: time("03:00"), endTime: time("04:00"), distance: 100 },
                ],
            }

            summary = summarizeDriverTrips(driver)
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
            const driver: Driver = {
                name: "Dan",
                trips: [],
            }

            summary = summarizeDriverTrips(driver)
        })

        it("total miles as zero", () => {
            expect(summary.totalMiles).to.eql(0)
        })

        it("average miles per hour as null", () => {
            expect(summary.averageMilesPerHour).to.be.null
        })

    })

    describe("excludes trips with and average speed", () => {

        it("less than 5mph", () => {
            const driver: Driver = {
                name: "Dan",
                trips: [
                    { startTime: time("01:00"), endTime: time("02:00"), distance: 4.99 },
                    { startTime: time("03:00"), endTime: time("04:00"), distance: 10 },
                ],
            }

            const summary = summarizeDriverTrips(driver)

            expect(summary.averageMilesPerHour).to.eql(10)
            expect(summary.totalMiles).to.eql(10)
        })

        it("greater than 100mph", () => {
            const driver: Driver = {
                name: "Dan",
                trips: [
                    { startTime: time("01:00"), endTime: time("02:00"), distance: 100.01},
                    { startTime: time("03:00"), endTime: time("04:00"), distance: 10 },
                ],
            }

            const summary = summarizeDriverTrips(driver)

            expect(summary.averageMilesPerHour).to.eql(10)
            expect(summary.totalMiles).to.eql(10)
        })

    })

})
