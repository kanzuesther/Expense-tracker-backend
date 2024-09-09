const router= require('express').Router()
const { addCashReserves,getCashReserves, deleteCashReserves, updateCashReserve } = require('../controllers/cashreserves')




 router.post('/add-cashreserves', addCashReserves)
  .get('/get-cashreserves',getCashReserves)
  .delete('/delete-cashreserves/:id',deleteCashReserves)
  .put('/update-cashreserve/:id',updateCashReserve)


module.exports = router