const router= require('express').Router()
const { addCashReserves,getCashReserves, deleteCashReserves } = require('../controllers/cashreserves')




 router.post('/add-cashreserves', addCashReserves)
  .get('/get-cashreserves',getCashReserves)
  .delete('/delete-cashreserves/:id',deleteCashReserves)

module.exports = router