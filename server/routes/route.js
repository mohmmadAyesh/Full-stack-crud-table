const express=require('express');
const {updateSomeRecords,getAll,getPaginate,deleteRecord,getNoteVolumeRecords}=require('../controller/controller.js');
const router=express.Router();
router.put('/update/:id',updateSomeRecords);
router.get('/',getAll);
router.get('/paginate',getPaginate);
router.delete('/delete/:id',deleteRecord);
//testing routes
router.get('/test/note',getNoteVolumeRecords);
module.exports=router;