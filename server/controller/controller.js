const {updateRecordQuery,getAllRecords,getPaginateRecords,deleteRecordQuery,GetNoteVolumeRecordsQuery
,SearchByCoinPairQuery,SearchByNoteQuery,SearchByPriceQuery,SearchByVolumeQuery}=require('../models/queries/queries.js');
/*
it will update the entire row of joined tables of coin_pair and note_volume then it will send a message indicating whether
its a success or a fail
*/
const updateRecord=async (req,res)=>{
    try{
    const{coin_pair,price,note,volume}=req.body;
    const {id}=req.params;
    await updateRecordQuery(coin_pair,Number(price),note,volume,Number(id));
    res.status(200).send({success:true,message:"rows updated successfully"});
    }catch(err){
        res.status(500).send({success:false,message:"something failed"});
    }
}
/*
it will return all joined records from two tables the coin_pair_price and note_volume table
and send message to indicate whether its a success or a fail if it a success then it will load all data
*/
const getAll=async(req,res)=>{
    try{
        const records=await getAllRecords();
        res.status(200).send({success:true,message:"rows retrieved successfully",data:records});
    }
    catch(err){
    console.log(err);
    res.status(500).send({success:false,message:"something failed in retrieving records"});
    }
}
/* this query is for pagination like it will display in the same page the number specified in limit and it 
it took query string as paginate to get value page number from it
*/
const getPaginate=async(req,res)=>{
    try{
        const paginate=Number(req.query.paginate);
        console.log(paginate);
        if(!paginate){
           return  res.status(400).send({success:false,message:"please provide a paginate"});
        }
        if(paginate<=0){
            return res.status(400).send({success:false,message:"paginate cannot be less than one"});
        }

        const results=await getPaginateRecords(paginate);
        console.log(results);
        return res.status(200).send({success:true,message:"rows retrieved paginate successfully",data:results});
    }catch(err){
        console.log(err);
        return res.status(500).send({success:false,message:"something failed in bringing paginated data"});
    }
}
// it will delete single record with id specified
const deleteRecord=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log('id is : ',id);
        await deleteRecordQuery(Number(id));
        res.status(200).send({success:true,message:"records deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"delete records failed"});
    }
}
// it will retrieve all records from note_volume table and then display a message whether its a success or a failure
const getNoteVolumeRecords=async(req,res)=>{
    try{
        const results=await GetNoteVolumeRecordsQuery();
        res.status(200).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
// it will retrieve all records that its coin_pair starts with the req specified
const getRecordsFilteredByCoinPair=async(req,res)=>{
    try{
        const {coinPair}=req.body;
        console.log('coin_pair filter',coinPair);
        const results=await SearchByCoinPairQuery(coinPair);
        res.status(201).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
// it will retrieve all records filtered by price
const getRecordsFilteredByPrice=async(req,res)=>{
    try{
        const {price}=req.body;
        const results=await SearchByPriceQuery(Number(price));
        res.status(200).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
// it will retrieve all records filtered by notes that starts with note 
const getRecordsFilteredByNote=async(req,res)=>{
    try{
        const {note}=req.body;
        const results=await SearchByNoteQuery(note);
        res.status(200).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
// it will retrieve all records filtered by volume
const getRecordsFilteredByVolume=async(req,res)=>{
    try{
        const {volume}=req.body;
        const results=await SearchByVolumeQuery(Number(volume));
        res.status(200).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
module.exports={updateRecord,getAll,getPaginate,deleteRecord,getNoteVolumeRecords,
getRecordsFilteredByCoinPair,
getRecordsFilteredByNote,
getRecordsFilteredByPrice,
getRecordsFilteredByVolume
};