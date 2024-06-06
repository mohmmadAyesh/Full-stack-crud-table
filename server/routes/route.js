const express=require('express');
const {updateSomeRecords,getAll,getPaginate,deleteRecords,getNoteVolumeRecords}=require('../controller/controller.js');
const router=express.Router();
router.put('/update/:id',updateSomeRecords);
router.get('/',getAll);
router.get('/paginate',getPaginate);
router.delete('/delete/:id',deleteRecords);
//testing routes
router.get('/test/note',getNoteVolumeRecords);
module.exports=router;