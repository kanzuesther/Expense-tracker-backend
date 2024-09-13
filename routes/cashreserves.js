const router= require('express').Router()
const { addCashReserves,getCashReserves, deleteCashReserves,deleteCashReserve, updateCashReserve } = require('../controllers/cashreserves')




 router.post('/add-cashreserves', addCashReserves)
  .get('/get-cashreserves',getCashReserves)
  .delete('/delete-cashreserves/:id',deleteCashReserves)
  .delete('/delete-cashreserve',deleteCashReserve)
  .put('/update-cashreserve/:id',updateCashReserve)
module.exports = router