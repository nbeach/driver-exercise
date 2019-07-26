import {readFileSync} from "fs"
import {summarizeDriverTrips} from "./summarize/summarize"
import {parseDrivers} from "./parse/parse"
import {driverSummariesView} from "./view/driverSummariesView"
import {first} from "function-composition"

const STDIN = 0
const input = readFileSync(STDIN, "utf-8")

const view = first(parseDrivers)
    .then(drivers => drivers.map(summarizeDriverTrips))
    .then(driverSummariesView)
    .apply(input)

process.stdout.write(view)
