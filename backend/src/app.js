const express = require("express");
const cors = require("cors");
const jobRouter = require("./routers/job.router");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/jobs", jobRouter);

app.get('/', (req, res) => {
    res.send("Hello from server");
});

module.exports = app;