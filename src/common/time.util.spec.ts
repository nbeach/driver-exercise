import {hoursElapsed} from "./time.util"
import {expect} from "chai"
import {time} from "./test.util"

describe(hoursElapsed.name, () => {

    it("returns the number of hours elapsed between the provided times", () => {
        expect(hoursElapsed(time("10:30"), time("14:45"))).to.eql(4.25)
    })

})
