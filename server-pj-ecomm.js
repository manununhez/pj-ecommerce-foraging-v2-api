'use strict'
const express = require('express');
const app = express();
const dotenv = require('dotenv');

const cors = require('cors')
const fileUpload = require('express-fileupload');

const fromFile = require('./readFile')
const db = require('./queries')
const task = require('./csv-to-json')
const upload = require('./uploadFile')

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors()) //RESOLVE! Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response
// default options
app.use(fileUpload());
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
/* this line tells Express to use the public folder as our static folder from which we can serve static files*/
app.use('/img', express.static('public/img'))
app.use('/csv', express.static('public/csv'))
app.use('/json', express.static('public/json'))

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * GET DATA
 */
app.get('/versions', db.getVersions)
app.get('/psform/:sex', db.getPSFormData)
app.get('/apptext/:sex', db.getAppTextData)
app.get('/inituserdata/:version', db.getUserInitialData)

app.get('/convert-short-stores', task.convertShortStores)
app.get('/convert-long-stores', task.convertLongStores)

app.get('/stores-long', fromFile.getLongStores);
app.get('/stores-short', fromFile.getShortStores);

app.post('/upload-stores', upload.uploadStores)
/**
 * SAVE DATA
 */
app.post("/psform", db.createPSForm);
app.post("/visualpattern", db.createVisualPattern);
app.post("/userinfo", db.createUserInfo);
app.post("/userlogtime", db.createUserLogTime);
app.post("/usergeneraldata", db.createUserGeneraldata);