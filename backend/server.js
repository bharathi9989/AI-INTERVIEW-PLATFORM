import express from "express";
import dotenev from "dotenv"

const app = express()


const PORT = 2026

app.listen(PORT, () => { 
    console.log("application is Healthy...")
})