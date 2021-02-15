const task = require('./csv-to-json')

const uploadStores = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            status: false,
            message: 'No files were uploaded.'
        });
    }

    if (Object.keys(req.files.stores).length > 2) {
        return res.status(500).send({
            status: false,
            message: 'Max files to upload: 2'
        });
    }

    for (let key of Object.keys(req.files.stores)) {
        let store = req.files.stores[key];

        if (store.mimetype !== 'text/csv') {
            return res.status(500).send({
                status: false,
                message: 'Files extension allowed: CSV'
            });
        }
    }

    for (let key of Object.keys(req.files.stores)) {
        let store = req.files.stores[key];

        if (store.mimetype !== 'text/csv') {
            return res.status(500).send({
                status: false,
                message: 'Files extension allowed: CSV'
            });
        }
    }


    let data = [];

    //loop all files
    for (let key of Object.keys(req.files.stores)) {
        // _.forEach(_.keysIn(req.files.stores), (key) => {
        let store = req.files.stores[key];

        //move photo to uploads directory
        store.mv('./public/csv/' + store.name);

        //push file details
        data.push({
            name: store.name,
            mimetype: store.mimetype,
            size: store.size
        });
    }

    //return response
    res.send({
        status: true,
        message: 'Files are uploaded',
        data: data
    });

    //Update JSON files
    task.convertStores('./public/csv/stores-short.csv', './public/json/stores-short.json')
    task.convertStores('./public/csv/stores-long.csv', './public/json/stores-long.json')
}

module.exports = {
    uploadStores
}