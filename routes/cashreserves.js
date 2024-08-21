const router= require('express').Router()
const { addCashReservers,getCashReservers, deleteCashReservers } = require('../controllers/cashreserves')




 router.post('/add-cashreserves',addCashReserves)
  .get('/getcashreserves-',getCashReserves)
  .delete('/delete-cashreserves/:id',deleteCashReserves)

module.exports = router