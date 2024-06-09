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
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/GBP',0.8)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/CAD',1.34)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/AUD',1.45)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/NZD',1.52)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/CHF',0.92)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/ZAR',18.0)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/INR',82.5)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/BRL',4.95)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/MXN',17.5)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/KRW',1300)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/SGD',1.35)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/HKD',7.85)");
    await db.query("INSERT into coin_pair(coin_pair,price) values('USD/TRY',26.2)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in euro',5000,1)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in egp',5000,2)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in japan yen',5000,3)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('what usd equal in chinese yuan',5000,4)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about ils',3000,5)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about gbp',3500,6)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about cad',4000,7)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about aud',4500,8)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about nzd',5000,9)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about chf',5500,10)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about zar',6000,11)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about inr',6500,12)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about brl',7000,13)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about mxn',7500,14)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about krw',8000,15)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about sgd',8500,16)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about hkd',9000,17)");
    await db.query("INSERT into note_volume(note,volume,coin_pair_id) values('note about try',9500,18)");
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

