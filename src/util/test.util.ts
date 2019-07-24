import moment, {Moment} from "moment"

export const time = (time: string): Moment => moment(time, "HH:mm")
