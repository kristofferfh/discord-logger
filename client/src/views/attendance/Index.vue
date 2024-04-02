<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import Accordion from 'primevue/accordion'
  import AccordionTab from 'primevue/accordiontab'

  const data = ref(null)

  const getAttendance = async () => {
    const response = await fetch('http://localhost:2000/get/attendance/all')
    data.value = await response.json()
  }

  const getName = async (id) => {
    const response = await fetch('http://localhost:2000/get/username/' + id)
    const name = await response.text()

    return name
  }

  const formatDate = (string) => {
    return new Date(string).toDateString()
  }

  const dateStringToHourMinute = (string) => {
    const date = new Date(string)

    // Check if timestamp is a date, if not, return arg
    if (date instanceof Date && !isNaN(date)) {
      const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()

      return `${hour}:${minutes}`
    } else {
      return date
    }
  }

  onMounted( async () => {
    getAttendance()
  })
</script>

<template>
  <main>
    <h1>Attendance list</h1>
    <img v-if="!data" src="/loading.gif" alt="loading icon">
    <Accordion :multiple="true" :activeIndex="[0]">
      <template v-for="attendance in data" v-bind:key="attendance._id">
        <AccordionTab :header="`${formatDate(attendance.date)} - Attendants ${attendance.messages.length}`">
          <ul>
            <li class="messages" v-for="( message, index ) in attendance.messages" v-bind:key="index">
              <span>{{ dateStringToHourMinute(message.date) }}</span>
              <span><RouterLink :to="'/users/' + message.user_ref">{{ message.user_name }}</RouterLink></span>
              <span>{{ message.message }}</span>
            </li>
          </ul>
        </AccordionTab>
      </template>
    </Accordion>
  </main>
</template>

<style>
  .attendance {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
  .header {
    display: flex;
    gap: 1rem;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.1);
  }
  .messages {
    display: flex;
    gap: 1rem;
  }
</style>