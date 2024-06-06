const {getDB}=require('../db.js');
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
const updateSomeRecordsQuery = async (new_coin_pair, newPrice, newNote, newVolume, id) => {
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
const deleteRecordsQuery=async(id)=>{
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
module.exports={getAllRecords,updateSomeRecordsQuery,getPaginateRecords,
    deleteRecordsQuery,GetNoteVolumeRecordsQuery};
