import {readFileSync} from "fs"
import {summarizeTrips} from "./summarize/summarize"
import {parseDrivers} from "./parse/parse"
import {tripSummaryView} from "./view/tripSummaryView"
import {first} from "function-composition"

const STDIN_PATH = 0
const input = readFileSync(STDIN_PATH, "utf-8")

const presentation = first(parseDrivers)
    .then(summarizeTrips)
    .then(views => tripSummaryView(views, console.log))
    .apply(input)
