import mongoose from 'mongoose';

const DB_URI = 'mongodb+srv://silaveri777:uShUQQcA8zs8xw6L@cluster0.xxv1cjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
