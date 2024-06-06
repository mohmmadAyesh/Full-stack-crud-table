const {updateSomeRecordsQuery,getAllRecords,getPaginateRecords,deleteRecordQuery,GetNoteVolumeRecordsQuery}=require('../models/queries/queries.js');
/*
it will update the entire row of joined tables of coin_pair and note_volume then it will send a message indicating whether
its a success or a fail
*/
const updateSomeRecords=async (req,res)=>{
    try{
    const{coin_pair,price,note,volume}=req.body;
    const {id}=req.params;
    await updateSomeRecordsQuery(coin_pair,Number(price),note,volume,Number(id));
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
        await deleteRecordsQuery(Number(id));
        res.status(200).send({success:true,message:"records deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"delete records failed"});
    }
}
// it will retrieve all records from note_volume table and then display a message whether its a success or a failure
const getNoteVolumeRecords=async(req,res)=>{
    try{
        const results=await GetNoteVolumeRecordQuery();
        res.status(200).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
module.exports={updateSomeRecords,getAll,getPaginate,deleteRecord,getNoteVolumeRecords};