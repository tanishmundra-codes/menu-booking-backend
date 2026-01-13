require('dotenv').config();
const connectDb = require('./src/config/db');
const app = require("./src/index");

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, (req, res) => {
            console.log(`Server is started at PORT : ${PORT}`);
        })
    } catch(error){
        console.log('Failed to connect to DB', error);
    }
}

startServer();