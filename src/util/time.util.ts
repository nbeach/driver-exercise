import moment, {Moment} from "moment"

export const hoursElapsed = (startTime: Moment, endTime: Moment): number => {
    const timeDifference = endTime.diff(startTime)
    return moment.duration(timeDifference).asHours()
}
