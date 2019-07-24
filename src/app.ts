import {readFileSync} from "fs"
import {summarizeTrips} from "./summarize/summarize"
import {parseDrivers} from "./parse/parse"
import {displayTripSummariesView} from "./view/displayTripSummariesView"
import {first} from "function-composition"

const STDIN = 0
const input = readFileSync(STDIN, "utf-8")

const view = first(parseDrivers)
    .then(summarizeTrips)
    .then(displayTripSummariesView)
    .apply(input)

process.stdout.write(view)
