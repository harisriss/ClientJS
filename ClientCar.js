const express = require('express');
const app = express();
const port = 8080;

const url = 'http://127.0.0.1:8008/?wsdl';
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

    let test = list.then(value => {
        let j = JSON.parse(value['displayListCarResult'])
        console.log(j)
        res.json(j);
    })
});

app.listen(port, () => {
    console.log("server ecoute sur le port : ", port)
});
