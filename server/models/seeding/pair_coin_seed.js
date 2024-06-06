const {getDB}=require('../db.js');
require('dotenv').config();
async function createDatabase(){
    try{
        const db=await getDB();
        const dropNoteVolumeTable = "DROP TABLE IF EXISTS note_volume";
        await db.query(dropNoteVolumeTable);
        const dropCoinPairTable = "DROP TABLE IF EXISTS coin_pair";
        await db.query(dropCoinPairTable);
        const addCoinPairTable="create table IF NOT EXISTS coin_pair (id int auto_increment primary key,coin_pair varchar(10),price decimal(8,4));";
        await db.query(addCoinPairTable);
        const addNoteVolume="create table IF NOT EXISTS note_volume (id int auto_increment primary key,volume int,note varchar(125),coin_pair_id int);";
        await db.query(addNoteVolume);
        const connect2Tables="ALTER TABLE note_volume ADD CONSTRAINT fk_coin_pair_id FOREIGN KEY (coin_pair_id) REFERENCES coin_pair(id) ON DELETE CASCADE;";
        await db.query(connect2Tables);
        console.log("database created successfully");
    }catch(err){
        console.log("error happened in createDatabase: ",err);
    }
}
const seedDatabase=async ()=>{
    const db=await getDB();
    try{
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/EUR',0.9)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/EGP',47.65)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/JPY',156.8)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/YUAN',7.24)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/ILS',3.72)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in egp',5000,2)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in japan yen',5000,3)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in euro',5000,1)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in chinese yuan',5000,4)");
    console.log('data seeded successfully');
    }catch(err){
        console.log('errorr happened in seeding database: ',err);
    }
}
(async () => {
    await createDatabase();
    await seedDatabase();
    process.exit(0);
    
})();

