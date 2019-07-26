import {parseDrivers} from "./parse"
import {expect} from "chai"
import {Driver} from "../model/Driver"
import {time} from "../common/test.util"

describe(parseDrivers.name, () => {

    it("parses commands into drivers", () => {

        const input = `
            Driver Dan
            Driver Alex
            Trip Dan 07:15 07:45 17.3
            Trip Alex 01:00 02:00 10
            Trip Dan 06:12 06:32 21.8
         `

        const expected: readonly Driver[] = [
            {
                name: "Dan",
                trips: [
                    { startTime: time("07:15"), endTime: time("07:45"), distance: 17.3},
                    { startTime: time("06:12"), endTime: time("06:32"), distance: 21.8},
                ],
            },
            {
                name: "Alex",
                trips: [
                    { startTime: time("01:00"), endTime: time("02:00"), distance: 10},
                ],
            },
        ]

        expect(parseDrivers(input)).to.eql(expected)
    })

    describe("when a driver has no trips", () => {

        it("the driver is still included", () => {
            const input = "Driver Dan"

            const expected: readonly Driver[] = [
                { name: "Dan", trips: [] },
            ]

            expect(parseDrivers(input)).to.eql(expected)
        })

    })

    describe("accepts input with", () => {

        [
            { description: "multiple spaces between arguments", input: "Driver    Dan\r\n Trip Dan   01:15 01:45 17"   },
            { description: "tabs between arguments",            input: "Driver\t\tDan\r\n Trip Dan 01:15\t\t01:45 17"  },
            { description: "blank lines" ,                      input: "Driver Dan\r\n \r\n Trip Dan 01:15 01:45 17"   },
            { description: "leading whitespace" ,               input: "\t Driver Dan\r\n \t Trip Dan 01:15 01:45 17"  },
            { description: "trailing whitespace" ,              input: "Driver Dan\t \r\n Trip Dan 01:15 01:45 17 \t"  },
        ].forEach(scenario => {
            it(scenario.description, () => {
                const expected: readonly Driver[] = [
                    {
                        name: "Dan",
                        trips: [{ startTime: time("01:15"), endTime: time("01:45"), distance: 17 }],
                    },
                ]

                expect(parseDrivers(scenario.input)).to.eql(expected)
            })
        })

    })

    it("throws an exception if a command is not recognized", () => {
        expect(() => parseDrivers("Unknown 123")).to.throw()
    })

})
