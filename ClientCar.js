const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const url = 'https://voitur.herokuapp.com/?wsdl';
const soap = require('soap');
const cors = require("cors");
app.use(cors())
let getList = () => {
    let args = {};

    const promise = new Promise((resolve, reject) => {
        soap.createClient(url, function (err, client){
            client.displayListCar(args, function (err, result){
                resolve(result)
            });
        });
    });
    return promise;
}

app.get('/', (req, res) => {
    let list = getList();
    let test = list.then(value => {
        let j = JSON.parse(value['displayListCarResult'])
        console.log(j)
        res.json(j);
    })
});

app.listen(port, () => {
    console.log("server ecoute sur le port : ", port)
});
