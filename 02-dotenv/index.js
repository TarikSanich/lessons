import 'dotenv/config';

import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

async function run() {
    try {
        await mongoose.connect(DB_URI);
        await mongoose.connection.db.command({ ping: 1 });
        console.info("Database connection successful");
    } finally {
        await mongoose.disconnect();
    }
}

run().catch(error => console.error(error));
