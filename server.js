import express from 'express'
import cors from 'cors'
import fs from 'fs'
import {arr as data} from "./dataBase.js"

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","PUT","POST","DELETE"],
    credentials: true,
}));    

app.get('/api/getData', (req,res) => {
    try {
        res.send(data)
    } catch (error) {
        console.log(error.message);   
    }
})

app.post('/api/createData', (req,res) => {
    try {
        data.push(req.body)
        fs.writeFileSync('./dataBase.js',`export const arr = ${JSON.stringify(data)}`)
        res.send({message: "Data created Sucessfully!"})
    } catch (error) {
        console.log(error.message);
        
    }
})

app.listen(8080, () => {
    console.log("server is running on port!");
})