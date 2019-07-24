import moment from "moment"

export const hoursElapsed = (startTime: string, endTime: string): number => {
    const startMoment = moment(startTime, "HH:mm")
    const endMoment = moment(endTime, "HH:mm")

    const timeDifference = endMoment.diff(startMoment)
    return moment.duration(timeDifference).asHours()
}
