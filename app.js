const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
const app =express();
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use((req,res,next) => {
    return next(new ApiError(404, "Resoure not found"));
});

app.use((err,req,res,next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// app.get("/", (req, res)=>{
//     res.json({ message: "Welcomto contact book application." });
// });

module.exports = app;