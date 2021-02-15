var fs = require('fs');

const getLongStores = (request, response) => {
    var obj;
    fs.readFile('./public/json/stores-long.json', 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        response.json(JSON.parse(data))
    })
}

const getShortStores = (request, response) => {
    var obj;
    fs.readFile('./public/json/stores-short.json', 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        response.json(JSON.parse(data))
    })
}

module.exports = {
    getLongStores,
    getShortStores
}