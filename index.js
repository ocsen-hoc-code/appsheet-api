import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to NodeJS!' });
});

app.get('/api', (req, res) => {
    res.json({ msg: 'App Sheet API!' });
});

app.get('/data', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {

        if (err) {
            res.json({ error: err });
        } else {
            res.json({ data });
        }
    });
});

app.post('/api', (req, res) => {
    const body = req.body;
    fs.appendFile('./data.json', JSON.stringify(body), (err) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ msg: 'Create Success' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Url: http://localhost:${PORT}`)
});