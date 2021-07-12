// create an express app
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
var token;
var request = require('request');
const xmlParser = require('xml2json');
var Set = require("collections/set");
var moment = require('moment');

var jsonRes;
var SourceListDEResult;
var xml2js = require('xml2js');
const { stringify } = require("querystring");
var xml2jsParser = new xml2js.Parser();
var DEListMap = {};
var favorites = [];
var DERecordMap = {};

//Code Faizal
app.use(express.static(path.join(__dirname, './images')));
//Code Khatam

// use the express-static middleware
app.use(express.static("marketing-cloud-query-app"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './assets')));

// define the first route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/loginpage.html'));
})
app.set('view engine', 'html');
app.post("/secondpage", async function (req, res) {
  // var clientidSource = req.body.clientid;
  var clientidSource = "sr7id7zht854bwdco8t9qdym";
  // var clientsecretSource = req.body.clientsecret;
  // var clinentauthurl= req.body.authurl;
  var clientsecretSource = "vhmEsBaxDl3LVeqYbLUxsg6p";
  var clinentauthurl = "https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/";
  var granttypeSource = "client_credentials";
  //  console.log('Avi '+ clientidSource,'Avi1 '+ clientsecretSource,'Avi2 '+ clinentauthurl);
  //alert('Avi'+ clientidSource,'Avi1'+ clientsecretSource,'Avi2'+ clinentauthurl);

  var access_token = await getacesstoken(clientidSource, clientsecretSource, granttypeSource);

  res.sendFile(path.join(__dirname + '/secondpage.html'));

  var FormData = require('form-data');
  var data = new FormData();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', clientidSource);
  data.append('client_secret', clientsecretSource);
  // data.append('account_id', '514011820');

  var config = {
    method: 'post',
    url: clinentauthurl,
    headers: {
      'Content-Type': 'application/json',
      ...data.getHeaders()
    },
    data: data
  };

  axios(config)
    .then(function (response) {

      // console.log(JSON.stringify(response.data));
      token = response.data.access_token;
      console.log("token" + token);
    })
    .catch(function (error) {
      //   console.log(error);
    });



  app.post("/DEListFetch", async (reqCall, resCall) => {
    var DEListFetchOptions = {
      'method': 'POST',
      'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
      'headers': {
        'Content-Type': 'text/xml',
        'SoapAction': 'Retrieve'
      },
      body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtension</ObjectType>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>IsSendable</Properties>\r\n                <Properties>SendableSubscriberField.Name</Properties>\r\n               \r\n            </RetrieveRequest>\r\n        </RetrieveRequestMsg>\r\n    </s:Body>\r\n</s:Envelope>'
    };
    request(DEListFetchOptions, function (error, response) {
      if (error) throw new Error(error);
      var TempDEListFetchResult;
      xml2jsParser.parseString(response.body, function (err, result) {
        TempDEListFetchResult = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
      });
      console.log("TempDEListFetchResult : " + JSON.stringify(TempDEListFetchResult));
      var targetDEArray = {};

      for (var key in ResultList) {
        console.log("Data Extension " + ResultList[key].Name)
        console.log("Data Extension key " + ResultList[key].CustomerKey)
        targetDEArray[ResultList[key].CustomerKey] = ResultList[key].Name;
        //   targetDEArray.push(ResultList[key].Name);
        //   ResultListMap[ResultList[key].Name] = ResultList[key] ; 
      }
      for (var i in targetDEArray) {
        console.log(i);
        console.log(targetDEArray[i]);
      }
      console.log("targetDEArray    :   " + targetDEArray);

      resCall.json({ targetDEArray: targetDEArray });
    });

  });


  app.post("/fields", async (reqCall, resCall) => {
    console.log("yeh app.post fields wale me hai token " + access_token);
    var body2 = '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtensionField</ObjectType>\r\n                <Properties>Client.ID</Properties>\r\n                <Properties>CreatedDate</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>DataExtension.CustomerKey</Properties>\r\n                <Properties>DefaultValue</Properties>\r\n                <Properties>FieldType</Properties>\r\n                <Properties>IsPrimaryKey</Properties>\r\n                <Properties>IsRequired</Properties>\r\n                <Properties>MaxLength</Properties>\r\n                <Properties>ModifiedDate</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>Ordinal</Properties>\r\n                <Properties>Scale</Properties>\r\n\r\n                               <QueryAllAccounts>true</QueryAllAccounts>\r\n                <Retrieves />\r\n                <Options>\r\n                    <SaveOptions />\r\n                    <IncludeObjects>true</IncludeObjects>\r\n                </Options>\r\n            </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'
    var options = {
      'method': 'POST',
      'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
      'headers': {
        'Content-Type': 'text/xml',
        'SoapAction': 'Retrieve'
      },
      body: body2
    };
    request(options, function (error, response) {
      //    if (error) throw new Error(error);
      SourceDEFieldsResult = response.body;
      xml2jsParser.parseString(SourceDEFieldsResult, function (err, result) {
        // console.log('mera result : ' + JSON.stringify(result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results']));
        SourceDEFieldsResult = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
        // console.log('my new result '+JSON.stringify(SourceDEFieldsResult));
      });


      //code Faizal
      var FieldSet = new Set();
      for (var key in SourceDEFieldsResult) {
        FieldSet.add(JSON.stringify({
          "CustomerKey": SourceDEFieldsResult[key].DataExtension[0].CustomerKey[0],
          "FieldName": SourceDEFieldsResult[key].Name[0],
          "FieldType": SourceDEFieldsResult[key].FieldType[0]
        }));
      }
      favorites = [];
      for (var val of Array.from(FieldSet)) {
        favorites.push(JSON.parse(val));
      }
      //code khatm


      /*
      for (var key in SourceDEFieldsResult) {
        DEListMap= {
          "FieldName": SourceDEFieldsResult[key].Name[0],
          "CustomerKey":SourceDEFieldsResult[key].DataExtension[0].CustomerKey[0],
          "FieldType":SourceDEFieldsResult[key].FieldType[0]
        };
        favorites.push(DEListMap);
      }
      */

      resCall.json({ favorites: favorites });
    });
  });

  
  var Name;
  app.post("/RunQuery", async (reqCall, resCall) => {
    var currentDate = moment().format('yyyy-mm-dd:hh:mm:ss');
    var DERecords = [];
    var JoinQueryDESelectedFields = reqCall.body.JoinQueryDESelectedFields;
    console.log('JoinQueryDESelectedFields : ' + JSON.stringify(JoinQueryDESelectedFields));
    //await DECreate(JoinQueryDESelectedFields);
    //await getDERecords(currentDate);

    console.log('Name : ' + Name);
    DERecords = await getDERecords(Name);
    console.log('DERecords : ' + DERecords);

    resCall.send(DERecords);


    async function DECreate(JoinQueryDESelectedFields) {
      return new Promise(function (resolve, reject) {
        var DEListBody = '';
        DEListBody = '<?xml version="1.0" encoding="UTF-8"?>' +
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
          '<soapenv:Header>' +
          '<fueloauth>' + access_token + '</fueloauth>' +
          '</soapenv:Header>' +
          '<soapenv:Body>' +
          '<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
          '<Options/>' +
          '<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">' +
          '<CustomerKey>' + currentDate + '</CustomerKey>' +
          '<Name>' + currentDate + '</Name>' +
          '<Description>This Data Extension is created automatically by the Query AppExchange Application.</Description>' +
          '<IsSendable>false</IsSendable>' +
          '<IsTestable>false</IsTestable>' +
          '<DataRetentionPeriodLength>1</DataRetentionPeriodLength>' +
          '<DataRetentionPeriod>Days</DataRetentionPeriod>' +
          '<RowBasedRetention>false</RowBasedRetention>' +
          '<ResetRetentionPeriodOnImport>false</ResetRetentionPeriodOnImport>' +
          '<DeleteAtEndOfRetentionPeriod>false</DeleteAtEndOfRetentionPeriod>' +
          '<Fields>';

        for (var key in JoinQueryDESelectedFields) {
          if (JoinQueryDESelectedFields[key]["FieldType"] == 'Number' || JoinQueryDESelectedFields[key]["FieldType"] == 'Date' || JoinQueryDESelectedFields[key]["FieldType"] == 'Boolean') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>' + JoinQueryDESelectedFields[key]["FieldType"] + '</FieldType>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'EmailAddress') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>EmailAddress</FieldType>' +
              '<MaxLength>254</MaxLength>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Phone') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Phone</FieldType>' +
              '<MaxLength>50</MaxLength>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Decimal') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Decimal</FieldType>' +
              '<MaxLength>38</MaxLength>' +
              '<Scale>38</Scale>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Locale') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Locale</FieldType>' +
              '<MaxLength>5</MaxLength>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Text') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Text</FieldType>' +
              '<MaxLength>4000</MaxLength>' +
              '</Field>';
          }
        }

        DEListBody = DEListBody + '</Fields>' +
          '</Objects>' +
          '</CreateRequest>' +
          '</soapenv:Body>' +
          '</soapenv:Envelope>';


        var DEListOption = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Create',
            'Authorization': 'Bearer ' + access_token
          },
          body: DEListBody
        };
        request(DEListOption, async function (error, response) {
          if (error) throw new Error(error);
          var DEInsertResult;
          xml2jsParser.parseString(response.body, function (err, result) {
            DEInsertResult = result['soap:Envelope']['soap:Body'][0]['CreateResponse'][0]['Results'];
          });
          console.log('DEInsertResult : ' + JSON.stringify(DEInsertResult));
          resolve(DEInsertResult);
        });


      })
    }

    async function getDERecords(key) {
      return new Promise(async function (resolve, reject) {

        //var NextUrl;
        var DEDataOptions = {
          'method': 'GET',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/customobjectdata/key/' + key + '/rowset/',
          'headers': {
            'Authorization': 'Bearer ' + access_token
          }
        };
        request(DEDataOptions, async function (error, response) {
          if (error) throw new Error(error);
          //console.log('respo : ' + response.body);
          var tempResult = JSON.parse(response.body);

          if (tempResult.count != 0) {
            for (var i in tempResult.items) {
              DERecords.push(tempResult.items[i].values);
            }
          }

          /*
          //If DE has primary key
          if(tempResult.count != 0) {
            if(Object.keys(tempResult.items[0].keys).length != 0) {
              DERecords.push.apply(DERecords, tempResult.items);
            }
            else {
              for(var i in tempResult.items) {
                DERecords.push(tempResult.items[i].values);
              }
            }
          }
          */

          /*
          var looplength = Math.ceil(tempResult.count / tempResult.pageSize);
          if (looplength >= 2) {
            NextUrl = tempResult.links.next;
            for (var i = 2; i <= looplength; i++) {
              NextUrl = await getMoreDERecords(NextUrl, key);
            }
          }*/

          resolve(DERecords);
        });
      })
    }

    async function getMoreDERecords(NextUrl) {
      return new Promise(async function (resolve, reject) {

        var DEMoreDataOptions = {
          'method': 'GET',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data' + NextUrl,
          'headers': {
            'Authorization': 'Bearer ' + access_token
          }
        };
        request(DEMoreDataOptions, function (error, response) {
          if (error) throw new Error(error);
          var tempResult1 = JSON.parse(response.body);

          if (tempResult1.count != 0) {
            if (Object.keys(tempResult1.items[0].keys).length != 0) {
              DERecords.push.apply(DERecords, tempResult1.items);
            }
            else {
              for (var i in tempResult1.items) {
                DERecords.push(tempResult1.items[i].values);
              }
            }
          }

          NextUrl = tempResult1.links.next;
          resolve(NextUrl);
        })

      })
    }

  })


  app.post("/validatequery", async (reqCall, resCall) => {

    var currentDate = moment().format('yyyy-mm-dd:hh:mm:ss');
    var DERecords = [];
    var JoinQueryDESelectedFields = reqCall.body.JoinQueryDESelectedFields;
    console.log('JoinQueryDESelectedFields : ' + JSON.stringify(JoinQueryDESelectedFields));
    var queryDefinitionId = '';

    var dynamicQuery = reqCall.body.dynamicQuery;
    console.log("dynamicQuery  :  " + dynamicQuery);
    var actionType = reqCall.body.actionType
    console.log(actionType);
    //   console.log(reqCall)
    //   console.log('reqCall.data.dynamicQuery  :  ' + reqCall.data);
    //   console.log("reqCall.body validatequery" + JSON.stringify(reqCall.data));  
    //   console.log("reqCall.body validatequery" + JSON.stringify(reqCall.data.dynamicQuery));  
    //  console.log("reqCall.body validatequery2" + reqCall.data.dynamicQuery);    
    //  console.log("reqCall.body validatequery" + JSON.stringify(reqCall.body));
    console.log("validate query access token" + access_token);
    var options = {
      'method': 'POST',
      'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/automation/v1/queries/actions/validate/',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      },
      body: JSON.stringify({ "Text": dynamicQuery })

    };
    request(options, async function (error, response) {
      if (error) throw new Error(error);
      console.log("yeh response body validate query ka --- > " + response.body);
      var responsee = JSON.parse(response.body);
      var fal = responsee.queryValid;
      console.log('responsee Valid : ' + JSON.parse(response.body));
      console.log(fal);

      if (actionType != "run") {
        resCall.json({ validatequery: fal });
      }


      
      if (fal == true && actionType == "run") {

        var FolderCheckResult = await FolderCheck();
        console.log('FolderCheckResult : ' + JSON.stringify(FolderCheckResult))

        var ParentFolderCatagoryID = '';
        var ChildFolderCatagoryID = '';
        for(key in FolderCheckResult) {
          if(FolderCheckResult[key]["Name"][0] == "Data Extensions" && FolderCheckResult[key]["CustomerKey"][0] == "dataextension_default") {
            ParentFolderCatagoryID = FolderCheckResult[key]["ID"][0];
          }
          if(FolderCheckResult[key]["Name"][0] == "Query App") {
            ChildFolderCatagoryID = FolderCheckResult[key]["ID"][0];
          }
        }
        if(ChildFolderCatagoryID != '') {
          var DECreateResult = await DECreate(JoinQueryDESelectedFields , ChildFolderCatagoryID);
        }
        else {
          ChildFolderCatagoryID = await FolderCreate(ParentFolderCatagoryID);
          console.log('ChildFolderCatagoryID : ' + JSON.stringify(ChildFolderCatagoryID))
          var DECreateResult = await DECreate(JoinQueryDESelectedFields , ChildFolderCatagoryID);
        }
        

        //console.log("DECreateResult object Id -- > " + JSON.stringify(DECreateResult))
        //console.log("DECreateResult object Id -- > " + DECreateResult[0].NewObjectID[0])
        console.log("DECreateResult object Id -- > " + DECreateResult[0].NewObjectID[0])
        var ObjectID = DECreateResult[0].Object[0].ObjectID[0];
        var CustomerKey = DECreateResult[0].Object[0].CustomerKey[0];
        Name = DECreateResult[0].Object[0].Name[0];

        
        var taskId = await CreateRunQuery(ObjectID, CustomerKey, dynamicQuery, Name);
        // Yahan aajaigi task id aur query run hui ki nhi 
        console.log("Yes Task Id Hai ---> " + taskId);
        if (taskId) {



          var getDERecordsResult = [];
          var queryStatus;
          var b = setInterval(async function () {
            queryStatus = await queryStatusMethod(taskId);
            console.log("queryStatus : " + queryStatus);
            if (queryStatus == "Complete") {
              getDERecordsResult = await getDERecords(CustomerKey);
              await QueryDelete(queryDefinitionId);
              console.log('getDERecordsResult : ' + JSON.stringify(getDERecordsResult));
              clearInterval(b);
            }
          }, 10000);

          app.post("/DERecordGet", async (reqCall1, resCall1) => {
            console.log("reqCall1 : " + JSON.stringify(reqCall1.body));
            console.log("getDERecordsResult : " + JSON.stringify(getDERecordsResult));
            
            if (queryStatus != "Complete") {
              resCall1.send("false");
            }
            else {
              resCall1.send(getDERecordsResult);
            }
            
          })


          





          /*

          DERecords = [];
          var count = 0;
          var getDERecordsResult = [];
          var b = setInterval(async function () {
            getDERecordsResult = await getDERecords(CustomerKey);
            console.log('getDERecordsResult : ' + JSON.stringify(getDERecordsResult));
            count += 1;
            console.log('count : ' + count);
            if (getDERecordsResult.length != 0) {
              console.log('aa gae');
              console.log('you can see target DE resultant records by clicking on RunQuery button.')
              resCall.json({ "getDERecordsResult": getDERecordsResult });
              clearInterval(b);
            }
            if (count == 7) {
              console.log("It is taking longer time then expected, Please try clicking on RunQuery button after some time");
              clearInterval(b);
            }
          }, 10000);
        
          */

          //var getDERecordsResult = await getDERecords(CustomerKey);
          //console.log("getDERecordsResult" + getDERecordsResult);
          //resCall.json({ "getDERecordsResult": getDERecordsResult });
          //resCall.send(getDERecordsResult);
          //resCall.send('Query Run Successfully');
        }




      }
    });


    
    async function FolderCheck() {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Retrieve',
            'Authorization': 'Bearer ' + access_token
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataFolder</ObjectType>\r\n                <Properties>ID</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>ContentType</Properties>\r\n                <Properties>ParentFolder.Name</Properties>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>ParentFolder.ObjectID</Properties>\r\n                <Properties>AllowChildren</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n\r\n                                <Filter xsi:type="par:ComplexFilterPart" xmlns:par="http://exacttarget.com/wsdl/partnerAPI">\r\n                    <LeftOperand xsi:type="par:SimpleFilterPart">\r\n                        <Property>ContentType</Property>\r\n                        <SimpleOperator>equals</SimpleOperator>\r\n                        <Value>dataextension</Value>\r\n                    </LeftOperand>\r\n                    <LogicalOperator>AND</LogicalOperator>\r\n                    <RightOperand xsi:type="par:SimpleFilterPart">\r\n                        <Property>Name</Property>\r\n                        <SimpleOperator>IN</SimpleOperator>\r\n                        <Value>Data Extensions</Value>\r\n                        <Value>Query App</Value>\r\n                    </RightOperand>\r\n                </Filter>\r\n\r\n                <QueryAllAccounts>true</QueryAllAccounts>\r\n            </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'

        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          xml2jsParser.parseString(response.body, async function (err, result) {
            FolderCheckResult = result["soap:Envelope"]["soap:Body"][0]["RetrieveResponseMsg"][0]["Results"];
            resolve(FolderCheckResult);
          });
        });
      })
    }

    async function FolderCreate(ParentFolderCatagoryID) {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Create',
            'Authorization': 'Bearer ' + access_token
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<SOAP-ENV:Envelope\r\n    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    \r\n    <SOAP-ENV:Header>\r\n        <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </SOAP-ENV:Header>\r\n    \r\n    <SOAP-ENV:Body>\r\n        <CreateRequest\r\n            xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <Options/>\r\n            <ns1:Objects\r\n                xmlns:ns1="http://exacttarget.com/wsdl/partnerAPI"\r\n                xsi:type="ns1:DataFolder">\r\n                <ns1:ModifiedDate\r\n                 xsi:nil="true"/>\r\n                <ns1:ObjectID\r\n                 xsi:nil="true"/>\r\n                <ns1:CustomerKey>Query App</ns1:CustomerKey>\r\n                <ns1:ParentFolder>\r\n                    <ns1:ModifiedDate\r\n                     xsi:nil="true"/>\r\n                    <ns1:ID>' + ParentFolderCatagoryID + '</ns1:ID>\r\n                    <ns1:ObjectID\r\n                     xsi:nil="true"/>\r\n                </ns1:ParentFolder>\r\n                <ns1:Name>Query App</ns1:Name>\r\n                <ns1:Description>Query App</ns1:Description>\r\n                <ns1:ContentType>dataextension</ns1:ContentType>\r\n                <ns1:IsActive>true</ns1:IsActive>\r\n                <ns1:IsEditable>true</ns1:IsEditable>\r\n                <ns1:AllowChildren>true</ns1:AllowChildren>\r\n            </ns1:Objects>\r\n        </CreateRequest>\r\n    </SOAP-ENV:Body>\r\n</SOAP-ENV:Envelope>'
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
          xml2jsParser.parseString(response.body, function (err, result) {
            ChildFolderCatagoryID = result['soap:Envelope']['soap:Body'][0]['CreateResponse'][0]['Results'][0]['NewID'][0];
            resolve(ChildFolderCatagoryID);
          });
        });
      })
    }

    async function DECreate(JoinQueryDESelectedFields , ChildFolderCatagoryID) {
      return new Promise(function (resolve, reject) {
        var DEListBody = '';
        DEListBody = '<?xml version="1.0" encoding="UTF-8"?>' +
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
          '<soapenv:Header>' +
          '<fueloauth>' + access_token + '</fueloauth>' +
          '</soapenv:Header>' +
          '<soapenv:Body>' +
          '<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
          '<Options/>' +
          '<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">' +
          '<CustomerKey>' + currentDate + '</CustomerKey>' +
          '<Name>' + currentDate + '</Name>' +
          '<Description>This Data Extension is created automatically by the Query AppExchange Application.</Description>' +
          '<CategoryID>' + ChildFolderCatagoryID + '</CategoryID>' +
          '<IsSendable>false</IsSendable>' +
          '<IsTestable>false</IsTestable>' +
          '<DataRetentionPeriodLength>1</DataRetentionPeriodLength>' +
          '<DataRetentionPeriod>Days</DataRetentionPeriod>' +
          '<RowBasedRetention>false</RowBasedRetention>' +
          '<ResetRetentionPeriodOnImport>false</ResetRetentionPeriodOnImport>' +
          '<DeleteAtEndOfRetentionPeriod>false</DeleteAtEndOfRetentionPeriod>' +
          '<Fields>';

        for (var key in JoinQueryDESelectedFields) {
          if (JoinQueryDESelectedFields[key]["FieldType"] == 'Number' || JoinQueryDESelectedFields[key]["FieldType"] == 'Date' || JoinQueryDESelectedFields[key]["FieldType"] == 'Boolean') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>' + JoinQueryDESelectedFields[key]["FieldType"] + '</FieldType>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'EmailAddress') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>EmailAddress</FieldType>' +
              '<MaxLength>254</MaxLength>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Phone') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Phone</FieldType>' +
              '<MaxLength>50</MaxLength>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Decimal') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Decimal</FieldType>' +
              '<MaxLength>38</MaxLength>' +
              '<Scale>38</Scale>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Locale') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Locale</FieldType>' +
              '<MaxLength>5</MaxLength>' +
              '</Field>';
          }
          else if (JoinQueryDESelectedFields[key]["FieldType"] == 'Text') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + JoinQueryDESelectedFields[key]["FieldName"] + '</CustomerKey>' +
              '<Name>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Name>' +
              '<Label>' + JoinQueryDESelectedFields[key]["FieldName"] + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Text</FieldType>' +
              '<MaxLength>4000</MaxLength>' +
              '</Field>';
          }
        }

        DEListBody = DEListBody + '</Fields>' +
          '</Objects>' +
          '</CreateRequest>' +
          '</soapenv:Body>' +
          '</soapenv:Envelope>';


        var DEListOption = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Create',
            'Authorization': 'Bearer ' + access_token
          },
          body: DEListBody
        };
        request(DEListOption, async function (error, response) {
          if (error) throw new Error(error);
          var DEInsertResult;
          xml2jsParser.parseString(response.body, function (err, result) {
            DEInsertResult = result['soap:Envelope']['soap:Body'][0]['CreateResponse'][0]['Results'];
          });
          //console.log('DEInsertResult : ' + JSON.stringify(DEInsertResult));
          resolve(DEInsertResult);
        });


      })
    }

    async function CreateRunQuery(ObjectID, CustomerKey, dynamicQuery, Name) {
      return new Promise(function (resolve, reject) {
        console.log("ObjectID --- > " + JSON.stringify(ObjectID));
        console.log("CustomerKey --- > " + CustomerKey);
        console.log("dynamicQuery --- > " + dynamicQuery);
        console.log("Name --- > " + Name);

        var options = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/automation/v1/queries/',
          'headers': {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": "QueryDE " + Name,
            "key": "QueryDE " + Name,
            "description": "",
            "queryText": dynamicQuery,
            "targetName": Name,
            "targetKey": CustomerKey,
            "targetId": ObjectID,
            "targetDescription": "Created via REST API",
            "targetUpdateTypeId": 0,
            "targetUpdateTypeName": "Overwrite",
            "categoryId": 10844
          })

        };
        request(options, async function (error, response) {
          if (error) throw new Error(error);
          //     console.log( "response.body.queryDefinitionId" + response.body);
          //     console.log("response.body.name" + response.body.name);
          console.log("queryDefinitionId body --- > " + response.body);
          var responsee = JSON.parse(response.body);
          queryDefinitionId = responsee.queryDefinitionId;
          console.log("queryDefinitionId --- > " + queryDefinitionId);
          if (queryDefinitionId) {
            console.log("query run me aagya -- > ")





            
            // var options = {
            //   'method': 'POST',
            //   'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/automation/v1/queries/' + queryDefinitionId + '/actions/start/',
            //   'headers': {
            //     'Authorization': 'Bearer ' + access_token,
            //     'Content-Type': 'application/json'
            //   }
            // };
            // request(options, async function (error, response) {
            //   if (error) throw new Error(error);
            //   console.log("Query run hogyi hai  " + JSON.stringify(response));

            //   if (response.body == '"OK"') {
            //     console.log('OK me aa gya ---------------------');
            //     resolve('true');
            //   }
            //   else {
            //     console.log('OK ka else me aa gya ---------------------');
            //     resolve('false');
            //   }
            // });





            console.log('queryDefinitionId : ' + queryDefinitionId);

            var options = {
              'method': 'POST',
              'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
              'headers': {
                'Content-Type': 'text/xml;charset=UTF-8',
                'SOAPAction': 'Perform',
                'Authorization': 'Bearer ' + access_token
              },
              body: '<?xml version="1.0" encoding="utf-8"?>\r\n<soapenv:Envelope\r\n    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    <soapenv:Header>\r\n   <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </soapenv:Header>\r\n    <soapenv:Body>\r\n        <PerformRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <Action>start</Action>\r\n            <Definitions>\r\n                <Definition xsi:type="QueryDefinition">\r\n                    <ObjectID>' + queryDefinitionId + '</ObjectID>\r\n                </Definition>\r\n            </Definitions>\r\n        </PerformRequestMsg>\r\n    </soapenv:Body>\r\n</soapenv:Envelope>'

            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              console.log("yeh hai run soap query ka response" + response.body);
              var SourceListQueryResult;
              xml2jsParser.parseString(response.body, function (err, result) {
                SourceListQueryResult = result['soap:Envelope']['soap:Body'][0]['PerformResponseMsg'][0]['Results'][0]['Result'][0]['Task'][0]['ID'][0];
                console.log("Result tak xml result" + JSON.stringify(SourceListQueryResult));
                resolve(SourceListQueryResult);
              });
            });
          }
        });
      });
    }

    async function queryStatusMethod(TaskId) {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
          'headers': {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'Retrieve'
          },
          body: '<?xml version="1.0" encoding="utf-8"?>\r\n<soapenv:Envelope\r\n    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    <soapenv:Header>\r\n   <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </soapenv:Header>\r\n   <soapenv:Body>\r\n      <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n         <RetrieveRequest>\r\n            <ObjectType>AsyncActivityStatus</ObjectType>\r\n            <Properties>Status</Properties>\r\n            <Properties>StartTime</Properties>\r\n            <Properties>EndTime</Properties>\r\n            <Properties>TaskID</Properties>\r\n            <Properties>ParentInteractionObjectID</Properties>\r\n            <Properties>InteractionID</Properties>\r\n            <Properties>Program</Properties>\r\n            <Properties>StepName</Properties>\r\n            <Properties>ActionType</Properties>\r\n            <Properties>Type</Properties>\r\n            <Properties>Status</Properties>\r\n            <Properties>CustomerKey</Properties>\r\n            <Properties>ErrorMsg</Properties>\r\n            <Properties>CompletedDate</Properties>\r\n            <Properties>StatusMessage</Properties>\r\n            <Filter xsi:type="SimpleFilterPart">\r\n               <Property>TaskID</Property>\r\n               <SimpleOperator>equals</SimpleOperator>\r\n               <Value>' + TaskId + '</Value>\r\n            </Filter>\r\n         </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          var queryStatusTemp;
          xml2jsParser.parseString(response.body, function (err, result) {
            queryStatusTemp = result["soap:Envelope"]["soap:Body"][0]["RetrieveResponseMsg"][0]["Results"][0]["Properties"][0]["Property"][7]["Value"][0];
            resolve(queryStatusTemp);
          });
        });
      })
    }


    // async function runSoapQuery() {

    //         var request = require('request');
    //   var options = {
    //     'method': 'POST',
    //     'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
    //     'headers': {
    //       'Content-Type': 'text/xml;charset=UTF-8',
    //       'SOAPAction': 'Perform',
    //       'Authorization': 'Bearer '+ access_token
    //     },
    //     body: '<?xml version="1.0" encoding="utf-8"?>\r\n<soapenv:Envelope\r\n    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    <soapenv:Header>\r\n   <fueloauth xmlns="http://exacttarget.com">' +access_token + '</fueloauth>\r\n    </soapenv:Header>\r\n    <soapenv:Body>\r\n        <PerformRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <Action>start</Action>\r\n            <Definitions>\r\n                <Definition xsi:type="QueryDefinition">\r\n                    <ObjectID>a1a78144-1fcd-4386-bd2c-342edde60cc9</ObjectID>\r\n                </Definition>\r\n            </Definitions>\r\n        </PerformRequestMsg>\r\n    </soapenv:Body>\r\n</soapenv:Envelope>'

    //   };
    //   request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log( "yeh hai run soap query ka response" + response.body);
    //   });

    // }


    async function getDERecords(key) {
      return new Promise(async function (resolve, reject) {

        //var NextUrl;
        var DEDataOptions = {
          'method': 'GET',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/customobjectdata/key/' + key + '/rowset/',
          'headers': {
            'Authorization': 'Bearer ' + access_token
          }
        };
        request(DEDataOptions, async function (error, response) {
          if (error) throw new Error(error);
          var tempResult = JSON.parse(response.body);

          if (tempResult.count != 0) {
            if (Object.keys(tempResult.items[0].keys).length != 0) {
              DERecords.push.apply(DERecords, tempResult.items);
            }
            else {
              for (var i in tempResult.items) {
                DERecords.push(tempResult.items[i].values);
              }
            }
          }
          //console.log('DERecords : ' + DERecords);

          /*
          var looplength = Math.ceil(tempResult.count / tempResult.pageSize);
          if (looplength >= 2) {
            NextUrl = tempResult.links.next;
            for (var i = 2; i <= looplength; i++) {
              NextUrl = await getMoreDERecords(NextUrl, key);
            }
          }*/

          resolve(DERecords);
        });
      })
    }

    async function QueryDelete(queryDefinitionId) {
      return new Promise(async function (resolve, reject) {
        console.log('query Delete : ' + queryDefinitionId);
        var options = {
          'method': 'DELETE',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/automation/v1/queries/' + queryDefinitionId,
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          }
        };
        request(options, async function (error, response) {
          if (error) throw new Error(error);
          resolve(response.body)
          console.log('Query Delete Resonse : ' + response.body);
        });
      })
    }


  });



  app.post("/query", async (reqCall, resCall) => {
    console.log("yeh app query fields wale me hai token " + access_token);
    var options = {
      'method': 'POST',
      'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
      'headers': {
        'Content-Type': 'text/xml',
        'SOAPAction': 'Create'
      },
      body: '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    <SOAP-ENV:Header>\r\n        <fueloauth>' + access_token + '</fueloauth>\r\n    </SOAP-ENV:Header>\r\n    <SOAP-ENV:Body>\r\n        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <Options></Options>\r\n            <Objects xsi:type="QueryDefinition">\r\n                <PartnerKey xsi:nil="true"></PartnerKey>\r\n                <ObjectID xsi:nil="true"></ObjectID>\r\n                <!--<CategoryID>68371</CategoryID>-->\r\n                <Name>New Query</Name>\r\n                <Description>test</Description>\r\n                <QueryText>SELECT [First Name],[Email Address] as [Email Id] FROM NTOSubscribers</QueryText>\r\n                <TargetType>DE</TargetType>\r\n                <DataExtensionTarget>\r\n                    <PartnerKey xsi:nil="true"></PartnerKey>\r\n                    <ObjectID xsi:nil="true"></ObjectID>\r\n                    <CustomerKey>DE992E56-58C9-490B-BF5B-3F6EAC5EF94E</CustomerKey>\r\n                    <Name>DE for Query</Name>\r\n                </DataExtensionTarget>\r\n                <TargetUpdateType>Update</TargetUpdateType>\r\n            </Objects>\r\n        </CreateRequest>\r\n    </SOAP-ENV:Body>\r\n</SOAP-ENV:Envelope>'

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);

      var queryRes = response.body;


      xml2jsParser.parseString(queryRes, function (err, result) {
        console.log('mera result : ' + JSON.stringify(result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results']));
        //queryRes = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
        // console.log('my new result '+JSON.stringify(SourceDEFieldsResult));
      });
      /* for (var key in SourceDEFieldsResult) {
       // DEListMap[SourceDEFieldsResult[key].DataExtension[0].CustomerKey[0]] = {
        DEListMap= {
          "FieldName": SourceDEFieldsResult[key].Name[0],
          "CustomerKey":SourceDEFieldsResult[key].DataExtension[0].CustomerKey[0]
       };
        favorites.push(DEListMap);
 }

       console.log("DEListMap" + JSON.stringify(favorites)); 
    
        resCall.json({favorites : favorites});
*/

    });

  });


  async function getacesstoken(ClientIdDestination, ClientSecretDestination, GrantTypeDestination) {
    try {
      return new Promise(function (resolve, reject) {
        axios.post('https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
          {
            'client_id': ClientIdDestination,
            'client_secret': ClientSecretDestination,
            'grant_type': GrantTypeDestination,
            //  'account_id':  AccountIdDestination
          })
          .then((response) => {
            var result = response.data;
            //console.log("Result"+result.access_token);
            //console.log('Processing acess token'); 
            resolve(result.access_token);
          },
            (error) => {
              reject(error);
            })

      });
    }
    catch (err) { }
  }




});








// start the server listening for requests
app.listen(process.env.PORT || 3000,
  () => console.log("Server is running."));
