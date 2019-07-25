import {execSync} from "child_process"
import {expect} from "chai"

describe("App", () => {

    it("prints a summary of driver trips", () => {
        const input = `
            Driver Dan
            Driver Alex
            Trip Dan 01:00 2:00 10
            Trip Alex 01:00 2:00 5
        `

        const output = execSync(`echo "${input}" | ./node_modules/.bin/ts-node --transpile-only src/app.ts`).toString()

        expect(output).to.contain("Dan")
        expect(output).to.contain("10 miles")
        expect(output).to.contain("10 mph")

        expect(output).to.contain("Alex")
        expect(output).to.contain("5 miles")
        expect(output).to.contain("5 mph")
    })

})
