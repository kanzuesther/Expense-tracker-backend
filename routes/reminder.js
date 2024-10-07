const { addReminder,getReminder, deleteReminder, deleteReminders } = require('../controllers/reminder')

const router= require('express').Router()



router.post('/add-reminder',addReminder)
  .get('/get-reminder',getReminder)
  .delete('/delete-reminder/:id',deleteReminder)
  .delete('/delete-reminders', deleteReminders)
  


module.exports = router