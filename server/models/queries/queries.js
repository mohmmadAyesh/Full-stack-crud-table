const {getDB}=require('../db.js');
/*
it will retrieve all records from joined coin_pair and note_volume tables
*/
const getAllRecords=async()=>{
    try{
    const db=await getDB();
    const [results]=await db.query("SELECT coin_pair.coin_pair,coin_pair.price,note_volume.volume,note_volume.note FROM coin_pair join note_volume on coin_pair.id=note_volume.coin_pair_id ");
    console.log(results);
    return results;
    }catch(err){
        console.log("err in selecting",err);
    }
}
/*
it will update the entire row from joined  coin_pair and note-volume tables 
*/
const updateRecordQuery = async (new_coin_pair, newPrice, newNote, newVolume, id) => {
    console.log(new_coin_pair, newPrice, newNote, newVolume, id);
    try {
        const db = await getDB();
        const sql = `UPDATE coin_pair cp JOIN
            note_volume nv ON cp.id = nv.coin_pair_id 
            SET cp.coin_pair = ?, cp.price = ?, nv.note = ?, nv.volume = ?
            WHERE cp.id = ?`;
        const values = [new_coin_pair, newPrice, newNote, newVolume, id];
        const [results] = await db.query(sql, values);
        console.log('Rows affected:', results.affectedRows);
    } catch (err) {
        console.log('Error while updating:', err);
    }
};
/*
this query is for pagination like it will display in the same page the number specified in limit and it 
it took query string as paginate to get value page number from it
*/ 
const getPaginateRecords=async(paginate)=>{
    try{
        const db=await getDB();
        const sql=`select coin_pair.coin_pair,coin_pair.price, note_volume.note, note_volume.volume from coin_pair join note_volume on coin_pair.id=note_volume.coin_pair_id limit ?,?`;
        const values=[(paginate-1)*2,2];
        const [results]=await db.query(sql, values);
        return results;
    }catch(err){
        console.log('Error in selecting paginating: ',err);
    }
}
/*
query for deleting a record from coin_pair which is automatically delete the related record at note_volume table
*/
const deleteRecordQuery=async(id)=>{
    try{
    const db=await getDB();
    const sql=`delete from coin_pair where id=?;`;
    const values=[id];
    const results=await db.query(sql,values);
    console.log('result of deleted record',results);
    return results;
    }catch(err){
        console.log(`Error in deleting fields`,err);
    }

}
/*
this query for testing it will retrieved note volume records to ensure that update and delete affecting on every records
*/
const GetNoteVolumeRecordsQuery=async()=>{
    try{
        const db=await getDB();
        const sql=`select * from note_volume`;
        const results=await db.query(sql);
        return results;
    }catch(err){
        console.log('Error in getting note volume');
    }
}
module.exports={getAllRecords,updateRecordQuery,getPaginateRecords,
    deleteRecordQuery,GetNoteVolumeRecordsQuery};
