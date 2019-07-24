import {parseDrivers} from "./parse"
import {expect} from "chai"
import {Driver} from "../model/Driver"
import {time} from "../util/test.util"

describe(parseDrivers.name, () => {

    it("parses commands into drivers", () => {

        const input = `
            Driver Dan
            Trip Dan 07:15 07:45 17.3
            Trip Dan 06:12 06:32 21.8
         `

        const expected: ReadonlyArray<Driver> = [
            {
                name: "Dan",
                trips: [
                    { startTime: time("07:15"), endTime: time("07:45"), distance: 17.3},
                    { startTime: time("06:12"), endTime: time("06:32"), distance: 21.8},
                ],
            },
        ]

        expect(parseDrivers(input)).to.eql(expected)
    })


    describe("when a driver has no trips", () => {

        it("the driver is still included", () => {
            const input = "Driver Dan"

            const expected: ReadonlyArray<Driver> = [
                { name: "Dan", trips: [] },
            ]

            expect(parseDrivers(input)).to.eql(expected)
        })

    })

    // TODO: split this to multiple tests
    it("accepts input with varied whitespace between entries", () => {
        const input = `Driver\t\tDan\r\n  \r\n   Trip Dan      07:15 07:45 17.3\r`

        const expected: ReadonlyArray<Driver> = [
            {
                name: "Dan",
                trips: [{ startTime: time("07:15"), endTime: time("07:45"), distance: 17.3}],
            },
        ]

        expect(parseDrivers(input)).to.eql(expected)
    })

    it("throws an exception if a command is not recognized", () => {
        expect(() => parseDrivers("Unknown 123")).to.throw()
    })

})
