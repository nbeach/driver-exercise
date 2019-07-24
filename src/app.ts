import {readFileSync} from "fs"
import {summarizeDriverTrips} from "./summarize/summarize"
import {parseDrivers} from "./parse/parse"
import {createTripSummariesView} from "./view/createTripSummariesView"
import {first} from "function-composition"

const STDIN = 0
const input = readFileSync(STDIN, "utf-8")

const view = first(parseDrivers)
    .then(drivers => drivers.map(summarizeDriverTrips))
    .then(createTripSummariesView)
    .apply(input)

process.stdout.write(view)
