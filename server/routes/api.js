// Dependencies
import express, { json } from 'express'
import { __dirname } from '../main.js'

// Api files
import postMessage from '../services/mongodb/create/message.js'
import { createGroup } from '../services/mongodb/create/group.js'
import { addUserToGroup } from '../services/mongodb/update/group.js'
import { getUserById, getUsers } from '../services/mongodb/get/user.js'
import { getGroupById, getGroupByName, getGroups } from '../services/mongodb/get/group.js'
import getAttendance from '../services/mongodb/get/attendance.js'

// Utils
import { dateToHourMinute } from '../utils/convertTimestamp.js'
import generateMessages from '../utils/generateMessages.js'

// Create express route
const apiRouter = express.Router()

apiRouter.get('/', async ( req, res ) => {
  res.send("Only api requests allowed, have a nice day.")
})

// Get attendances entries, can be supplied with date range
apiRouter.post('/get/attendance/', async ( req, res ) => {
  const data = await getAttendance(req.body)
  res.json(data)
})

// Create test data, generates a list of messates for a specific date. Remove in prod
apiRouter.post('/post/attendance/testdata', async ( req, res ) => {
  // convert input into two variables
  const from = parseInt(req.body.from)
  const to = parseInt(req.body.to)

  // check if conversion to number was successfull
  if (typeof from !== 'number' || typeof to !== 'number') {
    return res.status(500).json({status: 'Missing or incorrect input fields'})
  }

  // Generate a list of fake messages with params
  const messages = generateMessages(from, to)

  for (let i = 0; i < messages.length; i++) {
    await postMessage(messages[i].discord_id, messages[i].discord_username, messages[i].date, messages[i].message)
  }

  res.json({status: 'success', from: from, to:to, messages: messages})
})

// Find and return user name with :ID
apiRouter.get('/get/username/:id', async ( req, res ) => {
  const user = await getUserById(req.params.id)

  if (user.display_name) res.send(user.display_name)
  if (!user.display_name) res.send(user.discord_id)
})

// Find and return user data with :ID
apiRouter.get('/get/user/:id', async ( req, res ) => {
  try {
    const user = await getUserById(req.params.id)
    res.send(user)
  } catch (err) {
    console.log(err.message)
  }
})

// Get all users
apiRouter.get('/get/users', async ( req, res ) => {
  try {
    const user = await getUsers()
    res.send(user)
  } catch (err) {
    console.log(err.message)
  }
})

// Create group
apiRouter.post('/post/group', async ( req, res ) => {
  try {
    const group = await createGroup(req.body.name)

    if (group) {
      res.json({ status: 'success', name: group.name, _id: group._id })
    } else {
      res.json({ status: 'failed', name: 'name already exists', })
    }
  } catch (err) {
    console.log(err.message)
  }
})

// Add user to group
apiRouter.post('/post/addusertogroup', async ( req, res ) => {
  try {
    const response = await addUserToGroup(req.body.user, req.body.group)

    if (response) {
      res.json({ status: 'success', ...response })
    } else {
      res.json({ status: 'failed', message: 'Bad user or group id', })
    }
  } catch (err) {
    console.log(err.message)
  }
})

// Get all groups
apiRouter.get('/get/groups', async ( req, res ) => {
  try {
    const groups = await getGroups()
    res.send(groups)
  } catch (err) {
    console.log(err.message)
  }
})

// Get specific group
apiRouter.get('/get/group/:name', async ( req, res ) => {
  try {
    const group = await getGroupByName(req.params.name)
    res.send(group)
  } catch (err) {
    console.log(err.message)
  }
})

// HTML response for htmx test. I really hate this, but it'll work for now.
apiRouter.get('/get/attendance/test', async ( req, res ) => {
  // Fetch attendance data
  const data = await getAttendance()

  // Sort data by date while using desta data because of broken timestamp, remove in prod
  // - Means ascending, + means descending
  data.sort((a, b) => a.day - b.day)
  data.sort((a, b) => a.month - b.month)
  data.sort((a, b) => a.year - b.year)

  // Generate an empty list that will be filled with li elements for each entry into attendance
  let attendanceList = []

  // Loop over each entry in attendance
  for (let i = 0; i < data.length; i++) {
    // Create header for this entry
    const header = `<h2>${data[i].year}/${data[i].month}/${data[i].day}/</h2>`

    // Generate an empty array to store messages in
    let messageList = []

    // Loop over every message in this entry and push it to messageList
    for (let j = 0; j < data[i].messages.length; j++) {
      messageList.push(`<li><span>${dateToHourMinute(data[i].messages[j].date)}</span><span>${data[i].messages[j].user}</span><span>${data[i].messages[j].message}</span></li>`)
    }

    // Combine all messages into an list
    const messageUl = `<ul class="messages">${messageList.join('')}</ul>`


    // Combine header and messages into one line and push to attendanceList
    attendanceList.push(`<li>${header}${messageUl}</li>`)
  }

  // Combine all entries into one html payload and SHIP IT!
  const html = `<ul class="entries">${attendanceList.join('')}</ul>`

  res.send(html)
})

export default apiRouter