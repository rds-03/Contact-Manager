const express = require("express");
const errorHAndl = require("./middleware/errorhand");
const connectdb = require("./dbConnection");
const dontenv = require("dotenv").config();
connectdb();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./Routes/Contact"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use(errorHAndl);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
