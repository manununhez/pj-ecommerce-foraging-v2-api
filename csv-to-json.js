// Reading the file using default 
// fs npm package  
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();

const PUBLIC_URL = process.env.PUBLIC_URL
const STORES_SHORT_CSV_PATH = process.env.STORES_SHORT_CSV_PATH
const STORES_LONG_CSV_PATH = process.env.STORES_LONG_CSV_PATH
const STORES_SHORT_JSON_PATH = process.env.STORES_SHORT_JSON_PATH
const STORES_LONG_JSON_PATH = process.env.STORES_LONG_JSON_PATH

const convertShortStores = (request, response) => {
    response.json(convertStores(STORES_SHORT_CSV_PATH, STORES_SHORT_JSON_PATH))
}

const convertLongStores = (request, response) => {
    response.json(convertStores(STORES_LONG_CSV_PATH, STORES_LONG_JSON_PATH))
}

const convertStores = (inputFilePath, outputFilePath) => {
    // ### Reading DATA from file
    var filePath = inputFilePath

    var storeIndex = -1
    var stores = []

    //This will read the file.
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            console.log(err)
            return err;
        }
        //The following line will split the csv file line by line and store each of it in the vraiable dataArray.
        var dataArray = data.split("\n");

        //The following loop creates an object for every line and then pushes it into the array.
        for (var i = 0; i < dataArray.length; i++) {
            // var temp = {};
            //contains values which are separated by a comma in a line.
            var valuesArray = dataArray[i].split(",");

            // console.log(valuesArray)
            if (valuesArray[3] === '' && valuesArray[4] === '' && valuesArray[5] === '' && valuesArray[6] === '\r') {
                storeIndex++;
                //we save stores
                stores.push({
                    "storeNumber": parseInt(valuesArray[0]),
                    "bargainsNumber": parseInt(valuesArray[1]),
                    "delay": parseInt(valuesArray[2]),
                    "products": []
                })
            } else {
                var img = valuesArray[6]
                var imgParsed = img.substring(0, img.length - 1) //we remove the final /r
                var isBargain = (valuesArray[1].trim() === "B")

                stores[storeIndex].products.push({
                    "productNumber": parseInt(valuesArray[0]),
                    "isBargain": isBargain,
                    "oldPrice": parseInt(valuesArray[2]),
                    "newPrice": parseFloat(valuesArray[3]),
                    "discount": parseFloat(valuesArray[4]),
                    "numOfStars": parseInt(valuesArray[5]),
                    "img": PUBLIC_URL + "img/" + imgParsed
                })
            }

        }

        // Convert the resultant array to json and  
        // generate the JSON output file. 
        let json = JSON.stringify(stores);
        fs.writeFileSync(outputFilePath, json);

        return "Success!!"
    });
}

module.exports = {
    convertShortStores,
    convertLongStores,
    convertStores
}