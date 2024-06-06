const {updateSomeRecordsQuery,getAllRecords,getPaginateRecords,deleteRecordsQuery,GetNoteVolumeRecordsQuery}=require('../models/queries/queries.js');
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
const getPaginate=async(req,res)=>{
    try{
        const{paginate}=req.query;
        if(!paginate){
           return  res.status(400).send({success:false,message:"please provide a paginate"});
        }
        if(paginate<=0){
            return res.status(400).send({success:false,message:"paginate cannot be less than one"});
        }

        const results=await getPaginateRecords(paginate);
        return res.status(204).send({success:true,message:"rows retrieved paginate successfully",data:results});
    }catch(err){
        console.log(err);
        return res.status(500).send({success:false,message:"something failed in bringing paginated data"});
    }
}
const deleteRecords=async(req,res)=>{
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
const getNoteVolumeRecords=async(req,res)=>{
    try{
        const results=await GetNoteVolumeRecordsQuery();
        res.status(200).send({success:true,message:"data retrieved successfully",data:results[0]});
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message:"data retrieved failed"});
    }
}
module.exports={updateSomeRecords,getAll,getPaginate,deleteRecords,getNoteVolumeRecords};