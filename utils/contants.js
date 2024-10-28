require("dotenv").config();

const PORT = process.env.PORT;
const connectionStringToDatabase = process.env.connectionStringToDatabase;

module.exports = { PORT, connectionStringToDatabase };
