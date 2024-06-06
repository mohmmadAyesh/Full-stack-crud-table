const mysql = require('mysql2/promise');
require('dotenv').config();

let db;

async function ConnectDB() {
    if (db) {
        return db;
    }
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS,
        });

        await connection.query('CREATE DATABASE IF NOT EXISTS currency_db');
        await connection.end();

        db = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS,
            database: 'currency_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        console.log('Database connected successfully');
        return db;
    } catch (err) {
        console.log('Error happened connecting to db:', err);
        throw err;
    }
}

async function getDB() {
    if (!db) {
        try{
        db = await ConnectDB();
        }catch(err){
            console.log('error in creating database: getDb func',err);
        }
    }
    return db;
}

module.exports = { ConnectDB, getDB };