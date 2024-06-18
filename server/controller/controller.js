const {
    updateRecordQuery,
    getAllRecords,
    getPaginateRecords,
    deleteRecordQuery,
    GetNoteVolumeRecordsQuery,
    SearchByCoinPairQuery,
    SearchByNoteQuery,
    SearchByPriceQuery,
    SearchByVolumeQuery,
    createRecordQuery
} = require('../models/queries/queries.js');
/*
it will update the entire row of joined tables of coin_pair and note_volume then it will send a message indicating whether
its a success or a fail
*/
const  CustomError = require('../utils/CustomError.js');
const updateRecord = async (req,res)=>{
    try{
    const{ coin_pair, price, note, volume } = req.body;
    const { id } = req.params;
    console.log('############', req.body);
    await updateRecordQuery(coin_pair, Number(price), note, volume, Number(id));
    res.status(200).send({ success:true, message:"rows updated successfully" });
    }catch(err){
        next(new CustomError('Something went wrong while updating',500,false));
    }
}
/*
it will return all joined records from two tables the coin_pair_price and note_volume table
and send message to indicate whether its a success or a fail if it a success then it will load all data
*/
const getAll=async(req,res)=>{
    try{
        const records = await getAllRecords();
        res.status(200).send({ success:true, message:"rows retrieved successfully", data:records });
    }
    catch(err){
    console.log(err);
    next(new CustomError("something failed in retrieving records"));
    }
}
/* this query is for pagination like it will display in the same page the number specified in limit and it 
it took query string as paginate to get value page number from it
*/
const getPaginate=async(req,res) => {
    try{
        const paginate = Number(req.query.paginate);
        console.log(paginate);
        if(!paginate){
            throw new CustomError('please provide a paginate',400);
          
        }
        if(paginate<=0){
            throw new CustomError('paginate cannot be less than one',400);
        }

        const results = await getPaginateRecords(paginate);
        console.log(results);
        return res.status(200).send({ success:true, message:"rows retrieved paginate successfully" , data:results });
    }catch(err){
        console.log(err);
        next(new CustomError('something failed in bringing paginated data'));
    }
}
// it will delete single record with id specified
const deleteRecord = async(req,res) => {
    try{
        const {id} = req.params;
        console.log('id is : ',id);
        await deleteRecordQuery(Number(id));
        res.status(200).send({ success:true, message:"records deleted successfully" });

    }catch(err){
        console.log(err);
        next(new CustomError('delete records failed'));
    
    }
}
// it will retrieve all records from note_volume table and then display a message whether its a success or a failure
const getNoteVolumeRecords=async(req,res) => {
    try{
        const results = await GetNoteVolumeRecordsQuery();
        res.status(200).send({ success:true, message:"data retrieved successfully", data:results[0] });
    }catch(err){
        console.log(err);
        next(new CustomError('data retrieved failed'));
    }
}
// it will retrieve all records that its coin_pair starts with the req specified
const getRecordsFilteredByCoinPair = async(req,res) => {
    try{
        const { coin_pair, paginate } = req.body;
        console.log('coin_pair filter',req.body);
        const results=await SearchByCoinPairQuery(coin_pair,Number(paginate));
        res.status(201).send({ success:true, message:"data retrieved successfully", data:results });
    }catch(err){
        console.log(err);
        next(new CustomError('data retrieved failed'));
    }
}
// it will retrieve all records filtered by price
const getRecordsFilteredByPrice = async(req,res) => {
    try{
        const { price , paginate }=req.body;
        const results=await SearchByPriceQuery(Number(price),Number(paginate));
        res.status(201).send({ success:true, message:"data retrieved successfully", data:results });
    }catch(err){
        console.log(err);
        next(new CustomError('data retrieved failed'));
    }
}
// it will retrieve all records filtered by notes that starts with note 
const getRecordsFilteredByNote=async(req,res) => {
    try{
        const { note, paginate } = req.body;
        const results=await SearchByNoteQuery(note,Number(paginate));
        res.status(201).send({ success:true,message:"data retrieved successfully",data:results });
    }catch(err){
        console.log(err);
        next(new CustomError('data retrieved failed'));
    }
}
// it will retrieve all records filtered by volume
const getRecordsFilteredByVolume=async(req,res)=>{
    try{
        const { volume, paginate }=req.body;
        console.log(paginate);
        const results = await SearchByVolumeQuery(Number(volume),Number(paginate));
        console.log(results);
        res.status(201).send({ success:true, message:"data retrieved successfully", data:results });
    }catch(err){
        console.log(err);
        next(new CustomError('data retrieved failed'));
    }
}
const createRecord = async(req,res)=>{
    try{
        const { coin_pair, price, note, volume } = req.body;
        console.log('what we sended',req.body);
        const result=await createRecordQuery(coin_pair,Number(price),note,volume);
        return res.status(201).send({ success:true, message:"data created successfully" ,data:result });
    }catch(err){
        console.log(err);
        next(new CustomError('data insert failed'));
    }
}
module.exports={updateRecord,
    getAll,
    getPaginate,
    deleteRecord,
    getNoteVolumeRecords,
    getRecordsFilteredByCoinPair,
    getRecordsFilteredByNote,
    getRecordsFilteredByPrice,
    getRecordsFilteredByVolume,
    createRecord
    };