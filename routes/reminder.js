const { addReminder,getReminder, deleteReminder } = require('../controllers/reminder')

const router= require('express').Router()



router.post('/add-reminder',addReminder)
  .get('/get-reminder',getReminder)
  .delete('/delete-reminder/:id',deleteReminder)

module.exports = router