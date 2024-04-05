import { AttendanceModel } from "../../../models/attendance.js"

const getAttendance = async (params) => {
  // No date was supplied, looking up all entries in attendance
  if (Object.keys(params).length === 0) {
    return await AttendanceModel.find().populate('messages').exec()
  }

  // Date range supplied, looking for entries between dates
  if (params.from && params.to) {
    const date = { $gte: new Date(params.from), $lt: new Date(params.to) }
    return await AttendanceModel.find({date:date}).populate('messages').exec()
  }

  // Looking up specific day
  if (params.from && !params.to) {
    // Create to object, set time to 23:59:59
    const to = new Date(params.from)
    to.setHours(23)
    to.setMinutes(59)
    to.setSeconds(59)

    const date = { $gte: new Date(params.from), $lt: new Date(to) }
    return await AttendanceModel.find({date:date}).populate('messages').exec()
  }



  // Search db for matching params and return array of results
  // return await AttendanceModel.findOne(params).populate('messages').exec()
}

export default getAttendance