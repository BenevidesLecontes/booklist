"use strict";

const AWS = require("aws-sdk");
const { S3 } = AWS;

const Jimp = require("jimp").default;
const multipart = require("parse-multipart");
const multiparty = require("multiparty");

const lambda_multipart = require("aws-lambda-multipart-parser");

var Busboy = require("busboy");

const CorsResponse = obj => ({
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
  },
  body: JSON.stringify(obj)
});

module.exports.uploadCover = async (event, context, c) => {
  const s3 = new S3({});

  var boundary;

  try {
    boundary = event.headers["content-type"].split("=")[1];
  } catch (e) {
    boundary = e;
  }

  var body = event.body;

  var parts;
  //let buff = new Buffer(body, "base64");
  //let body2 = buff.toString("ascii");

  try {
    parts = multipart.Parse(body, boundary);
  } catch (e) {
    parts = e;
  }

  var allFiles = "";
  var allFields = "";
  //const form = new multiparty.Form();
  return new Promise(res => {
    //form.parse(event, (err, fields, files) => {

    //var contentType = event.headers["Content-Type"] || event.headers["content-type"];
    try {
      //return res(CorsResponse(event)); // err || "Success!!! :-D "));
      var event2 = event;
      if (event.isBase64Encoded) {
        event2.body = Buffer.from(event.body, "base64").toString("binary");
      }

      let result = lambda_multipart.parse(event2, true);

      //return res(CorsResponse(Object.assign({}, { result, event, parts })));

      var params = { Bucket: "my-library-cover-upload-staging", Key: "Ayyyyyyy.jpg", Body: result.fileUploaded.content };
      s3.upload(params, function(err, data) {
        res(CorsResponse(err || "Success!!! :-D "));
      });
    } catch (er) {
      res(CorsResponse({ er2a: er }));
    }
  });

  //context.succeed(CorsResponse(event));
  return;
  //return CorsResponse(event);

  return new Promise(res => {
    var sourceParams = { Bucket: "my-library-cover-upload-staging", Key: "big-image.jpg" };
    s3.getObject(sourceParams, (err, data) => {
      if (err) {
        return res(err);
      }
      const originalImg = data.Body; //.toString('base64');

      Jimp.read(originalImg, function(err, image) {
        if (err || !image) {
          return res(err);
        }

        try {
          if (image.bitmap.width > 100) {
            image.resize(100, Jimp.AUTO);

            image.getBuffer(image.getMIME(), (err, body) => {
              if (err) {
                return res(err);
              }
              var params = { Bucket: "my-library-cover-upload-staging", Key: "resized-YEAH.jpg", Body: body };

              console.log(body);
              s3.upload(params, function(err, data) {
                res(err || "Success!!! O/ ");
              });
            });
          } else {
            return res("No upload");
          }
        } catch (err) {
          return res(null);
        }
      });
    });
  });
};
