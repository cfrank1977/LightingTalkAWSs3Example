// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

// Create unique bucket name
var bucketName = 'chris-frank-lightingtalk-' + uuid.v4();
// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
  function (data) {
  
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = { Bucket: bucketName, Key: '', Body: '' };
    var file = 'IsoldeChrisClose2.png';

    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    var path = require('path');
    uploadParams.Key = path.basename(file);

    // Create object upload promise
    var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(uploadParams).promise();
    uploadPromise.then(
      function (data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
  }).catch(
    function (err) {
      console.error(err, err.stack);
    });