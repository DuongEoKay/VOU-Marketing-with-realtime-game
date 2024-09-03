require("dotenv").config();
const { Pool } = require('pg')

const cors = require("cors")

const express = require('express')
const port = 5000

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

const setupRouter = require("./routes/setup")(pool);
const brandRouter = require("./routes/brand")(pool);
const eventRouter = require("./routes/event")(pool);
const voucherRouter = require("./routes/voucher")(pool);

const connectDB = async () => {
    try {
      await pool.connect();
      console.log("PostgreSQL connected");
    } 
    catch (error) {
      console.error("Error connecting to PostgreSQL:", error.message);
      process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/brand/api/setup", setupRouter);
app.use("/brand/api/brand", brandRouter);
app.use("/brand/api/event", eventRouter);
app.use("/brand/api/voucher", voucherRouter);


app.listen(port, () => console.log(`Server has started on port: ${port}`))

require('./eureka-client');