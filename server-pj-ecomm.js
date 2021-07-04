'use strict'
const express = require('express');
const app = express();
const dotenv = require('dotenv');
var compression = require('compression');

const cors = require('cors')
const fileUpload = require('express-fileupload');

const fromFile = require('./readFile')
const db = require('./queries')
const task = require('./csv-to-json')
const upload = require('./uploadFile')

dotenv.config();

const port = process.env.PORT || 5000;

app.use(compression())
app.use(cors()) //RESOLVE! Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response
// default options
app.use(fileUpload()); //{debug: true}
app.use(express.json())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
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
app.get('/bargains-result', db.getBargainsResult)
app.get('/bargains-result-per-store', db.getBargainsResultPerStore)
app.get('/survey-result', db.getPSFormResults)
app.get('/demographic-result', db.getUserFormResults)
app.get('/memory-result', db.getMemoryTaskResult)
app.get('/users', db.getUsers)

app.get('/bargains-result/:userId', db.getBargainsResultPerUser)
app.get('/bargains-result-per-store/:userId', db.getBargainsResultPerStorePerUser)
app.get('/survey-result/:userId', db.getPSFormResultsPerUser)
app.get('/demographic-result/:userId', db.getUserFormResultsPerUser)
app.get('/memory-result/:userId', db.getMemoryTaskResultPerUser)

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
app.post("/userbargain", db.createUserBargains);