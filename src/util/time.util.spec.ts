import {hoursElapsed} from "./time.util"
import {expect} from "chai"

describe(hoursElapsed.name, () => {

    it("returns the number of hours elapsed between the provided times", () => {
        expect(hoursElapsed("10:30", "14:45")).to.eql(4.25)
    })

})
