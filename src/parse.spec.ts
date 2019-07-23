import {parseDrivers} from "./parse"
import {expect} from "chai"
import {Driver} from "./model/Driver"

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
                    { startTime: "07:15", endTime: "07:45", distance: 17.3},
                    { startTime: "06:12", endTime: "06:32", distance: 21.8},
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


    it("accepts input with varied whitespace between entries", () => {
        const input = `Driver\t\tDan\r\n     Trip Dan      07:15 07:45 17.3\r`

        const expected: ReadonlyArray<Driver> = [
            {
                name: "Dan",
                trips: [{ startTime: "07:15", endTime: "07:45", distance: 17.3}],
            },
        ]

        expect(parseDrivers(input)).to.eql(expected)
    })


})
