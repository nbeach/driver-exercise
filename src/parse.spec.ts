import {isDriverInput, isTripInput, parseDriver, parseDrivers, parseTrip} from "./parse"
import {expect} from "chai"
import {TripInput} from "./model/Trip"
import {Driver} from "./model/Driver"

describe("Parse", () => {

    describe(isDriverInput.name, () => {

        it("when input line is a driver line returns true", () => {
            expect(isDriverInput(" Driver Jim")).to.be.true
        })

        it("when input line is not a driver line returns false", () => {
            expect(isDriverInput(" Foo Bar")).to.be.false
        })

    })

    describe(isTripInput.name, () => {

        it("when input line is a trip line returns true", () => {
            expect(isTripInput(" Trip Alex 12:01 13:16 42.0")).to.be.true
        })

        it("when input line is not a trip line returns false", () => {
            expect(isTripInput(" Foo Bar")).to.be.false
        })

    })

    describe(parseDriver.name, () => {

        it("parses the input line into a name", () => {
            expect(parseDriver(" Driver Jim")).to.eql("Jim")
        })

    })

    describe(parseTrip.name, () => {

        it("parses the input line into a TripInput object", () => {
            const expected: TripInput = {
                driver: "Alex",
                startTime: "12:01",
                endTime: "13:16",
                distance: 42,
            }

            expect(parseTrip(" Trip Alex 12:01 13:16 42.0")).to.eql(expected)
        })

    })

    describe(parseDrivers.name, () => {

        describe("when a driver has no trips", () => {

            it("the driver is still included", () => {
                const input = " Driver Dan"

                const expected: ReadonlyArray<Driver> = [
                    { name: "Dan", trips: [] },
                ]

                expect(parseDrivers(input)).to.eql(expected)
            })

        })



        it("parses input into drivers", () => {

            const input = `
                Driver Dan
                Trip Dan 07:15 07:45 17.3
                Trip Dan 06:12 06:32 21.8
             `

            const expected: ReadonlyArray<Driver> = [
                {
                    name: "Dan",
                    trips: [
                        { startTime: "07:15", endTime: "07:45", distance: 17.3},
                        { startTime: "06:12", endTime: "06:32", distance: 21.8},
                    ],
                },
            ]

            expect(parseDrivers(input)).to.eql(expected)
        })

    })

})
