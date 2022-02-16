const express = require('express');
const app = express();
const port = 8080;

const url = 'https://voitur.herokuapp.com/?wsdl';
const soap = require('soap');

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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let test = list.then(value => {
        let j = JSON.parse(value['displayListCarResult'])
        console.log(j)
        res.json(j);
    })
});

app.listen(port, () => {
    console.log("server ecoute sur le port : ", port)
});
