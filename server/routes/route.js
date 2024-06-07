const express=require('express');
const {updateRecord,getAll,getPaginate,deleteRecord,getNoteVolumeRecords,
getRecordsFilteredByCoinPair,
getRecordsFilteredByNote,
getRecordsFilteredByPrice,
getRecordsFilteredByVolume

}=require('../controller/controller.js');
const router=express.Router();
// updating one record by Id
router.put('/update/:id',updateRecord);
// retrieve all records from joined tables
router.get('/',getAll);
// retrieve all data paginated by page number
router.get('/paginate',getPaginate);
// delete record
router.delete('/delete/:id',deleteRecord);
// filtering by coin_pair that starts with the parameter
router.get('/filter/coin_pair',getRecordsFilteredByCoinPair);
// filtering by price 
router.get('/filter/price',getRecordsFilteredByPrice);
// filtering by note that starts with the parameter
router.get('/filter/note',getRecordsFilteredByNote);
// filtering by volume
router.get('/filter/volume',getRecordsFilteredByVolume);
//testing routes
router.get('/test/note',getNoteVolumeRecords);
module.exports=router;