// create an express app
const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const path = require('path');
const axios = require('axios');
var token;
var request = require('request');
const xmlParser = require('xml2json');
var Set = require("collections/set");

var xml;
var jsonRes;
var SourceListDEResult;
var xml2js = require('xml2js');
const { stringify } = require("querystring");
var xml2jsParser = new xml2js.Parser();
var DEListMap={};
var favorites = [];
var DERecordMap={};

//Code Faizal
app.use(express.static(path.join(__dirname, './images')));
//Code Khatam

// use the express-static middleware
app.use(express.static("marketing-cloud-query-app"));
app.use(bodyParser.urlencoded({extended:true}));

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
   var clinentauthurl= "https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/";
   var granttypeSource = "client_credentials" ;
  //  console.log('Avi '+ clientidSource,'Avi1 '+ clientsecretSource,'Avi2 '+ clinentauthurl);
   //alert('Avi'+ clientidSource,'Avi1'+ clientsecretSource,'Avi2'+ clinentauthurl);
   
   var access_token= await getacesstoken(clientidSource,clientsecretSource,granttypeSource);

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
     data : data
   };
   
   axios(config)
   .then(function (response) {
   
    // console.log(JSON.stringify(response.data));
    token=response.data.access_token;
    console.log("token" + token);
   })
   .catch(function (error) {
  //   console.log(error);
   });
  
   

   app.post("/asset", async (reqCall,resCall)=>
   {
    console.log("yeh app.post me hai token" + access_token);
    var body1='<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">'+access_token+'</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtension</ObjectType>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>IsSendable</Properties>\r\n                <Properties>SendableSubscriberField.Name</Properties>\r\n               \r\n            </RetrieveRequest>\r\n        </RetrieveRequestMsg>\r\n    </s:Body>\r\n</s:Envelope>'
    var options = {
      'method': 'POST',
      'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
      'headers': {
        'Content-Type': 'text/xml',
        'SoapAction': 'Retrieve'
      },
      body:body1 
     
    };
    //console.log("Token "+ token);
    //console.log("Debody "+ body1);
 
    request(options, function (error, response)  {
     if (error) throw new Error(error);
      xml=response.body;
      SourceListDEResult = xml.replace(/:/g, "");
      SourceListDEResult = xmlParser.toJson(SourceListDEResult);
      console.log("yeh hai de ki response ki json body" +SourceListDEResult);
      SourceListDEResult = JSON.parse(SourceListDEResult);
      var ResultList  = SourceListDEResult.soapEnvelope.soapBody.RetrieveResponseMsg.Results;
         console.log("Result list " + JSON.stringify(ResultList)); 
         var targetDEArray = {};
         
         for (var key in ResultList) 
        {
         console.log("Data Extension " + ResultList[key].Name)   
         console.log("Data Extension key " + ResultList[key].CustomerKey)   
         targetDEArray[ResultList[key].CustomerKey]= ResultList[key].Name ; 
      //   targetDEArray.push(ResultList[key].Name);
       //   ResultListMap[ResultList[key].Name] = ResultList[key] ; 
        }
        for (var i in targetDEArray)
        {
          console.log(i);
          console.log(targetDEArray[i]);
        }
        console.log("targetDEArray    :   " +  targetDEArray);
     
        resCall.json({targetDEArray : targetDEArray});
     });
    
   });


   app.post("/fields", async (reqCall,resCall)=>
   {
    console.log("yeh app.post fields wale me hai token " + access_token);
    var body2='<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtensionField</ObjectType>\r\n                <Properties>Client.ID</Properties>\r\n                <Properties>CreatedDate</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>DataExtension.CustomerKey</Properties>\r\n                <Properties>DefaultValue</Properties>\r\n                <Properties>FieldType</Properties>\r\n                <Properties>IsPrimaryKey</Properties>\r\n                <Properties>IsRequired</Properties>\r\n                <Properties>MaxLength</Properties>\r\n                <Properties>ModifiedDate</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>Ordinal</Properties>\r\n                <Properties>Scale</Properties>\r\n\r\n                               <QueryAllAccounts>true</QueryAllAccounts>\r\n                <Retrieves />\r\n                <Options>\r\n                    <SaveOptions />\r\n                    <IncludeObjects>true</IncludeObjects>\r\n                </Options>\r\n            </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'
    var options = {
      'method': 'POST',
      'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
      'headers': {
        'Content-Type': 'text/xml',
        'SoapAction': 'Retrieve'
      },
      body:body2 
    };
    request(options, function (error, response)  {
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

        resCall.json({favorites : favorites});
   });
});

app.post("/RunQuery", async (reqCall,resCall)=>
{
  var JoinQueryDetails = reqCall.body.RunQueryDetails;
  var JoinQueryDESelectedFields = reqCall.body.JoinQueryDESelectedFields

  var DESet = new Set();
  for (var key in JoinQueryDESelectedFields) {
    DESet.add(key);
  }
  for (var key of Array.from(DESet)) {
    console.log('key : ' + key)
    await DERecordFetch(key);
  }
  console.log('--------------------------------------------');
  console.log('DERecordMap : ' + JSON.stringify(DERecordMap));



  resCall.send(DERecordMap);
  function DERecordFetch(key) {
    return new Promise(async function (resolve, reject) {
      var DEDataBody = '<?xml version="1.0" encoding="UTF-8"?>' +
                      '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
                        '<s:Header>' +
                          '<a:Action s:mustUnderstand="1">Retrieve</a:Action>' +
                          '<a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>' +
                          '<a:ReplyTo>' +
                            '<a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>' +
                          '</a:ReplyTo>' +
                          '<a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>' +
                          '<fueloauth xmlns="http://exacttarget.com">' + access_token + '</fueloauth>' +
                        '</s:Header>' +
                        '<s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
                          '<RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
                            '<RetrieveRequest>' +
                              '<ObjectType>DataExtensionObject[' + key + ']</ObjectType>';
        for (var FieldName in JoinQueryDESelectedFields[key]["DESelectedFields"]) {
          DEDataBody = DEDataBody + '<Properties>' + JoinQueryDESelectedFields[key]["DESelectedFields"][FieldName] + '</Properties>';
        }
        DEDataBody = DEDataBody + '<Options>' +
                                    '<BatchSize>2500</BatchSize>' +
                                  '</Options>' +
                                  '</RetrieveRequest>' +
                                '</RetrieveRequestMsg>' +
                              '</s:Body>' +
                            '</s:Envelope>';
        

        var DEDataOptions = {
          'method': 'POST',
          'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Retrieve',
            'Authorization': 'Bearer ' + access_token
          },
          body: DEDataBody
        };

        request(DEDataOptions, async function (error, response) {
          if (error) throw new Error(error);

          //var DEDataRequestId;
          var SourceDEDataResult = response.body;
          console.log('response.body : ' + response.body);
          xml2jsParser.parseString(SourceDEDataResult, function (err, result) {
            SourceDEDataResult = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
            //DEDataRequestId = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['RequestID'][0]
          });
          console.log('SourceDEDataResult : ' + SourceDEDataResult);

          if(SourceDEDataResult) {
            for (var key1 in SourceDEDataResult) {
              if(DERecordMap[key]) {
                DERecordMap[key].push(SourceDEDataResult[key1].Properties[0]);
              }
              else {
                DERecordMap[key] = [SourceDEDataResult[key1].Properties[0]];
              }
            }
          }
          else {
            DERecordMap[key] = [];
          }
          resolve(DERecordMap);
        });
    })
  }
})


app.post("/validatequery", async (reqCall,resCall)=>
   {
     console.log(reqCall)
     console.log('reqCall.data.dynamicQuery  :  ' + reqCall.data);
     console.log("reqCall.body validatequery" + JSON.stringify(reqCall.data));  
  //   console.log("reqCall.body validatequery" + JSON.stringify(reqCall.data.dynamicQuery));  
   //  console.log("reqCall.body validatequery2" + reqCall.data.dynamicQuery);    
  //  console.log("reqCall.body validatequery" + JSON.stringify(reqCall.body));
     console.log("validate query access token" + access_token);
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/automation/v1/queries/actions/validate/',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + access_token
  },
  body: JSON.stringify({"Text":"SELECT [EmailAddress],[FirstName] FROM Adventure"})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log("yeh response body validate query ka --- > " + response.body);
  var responsee = JSON.parse(response.body) ;
  var fal = responsee.queryValid ;
  console.log(fal) ;
  
  resCall.json({validatequery : fal});
});

 
});



app.post("/query", async (reqCall,resCall)=>
   {
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
    request(options, function (error, response)  {
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


async function getacesstoken(ClientIdDestination,ClientSecretDestination,GrantTypeDestination)
  {
    try
      {
        return new Promise(function (resolve, reject) {
        axios.post('https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
          {
            'client_id': ClientIdDestination,
            'client_secret': ClientSecretDestination,
            'grant_type': GrantTypeDestination,
          //  'account_id':  AccountIdDestination
          })
          .then( (response) => 
            { 
              var result = response.data; 
              //console.log("Result"+result.access_token);
              //console.log('Processing acess token'); 
              resolve(result.access_token); 
            }, 
          (error) => 
            { 
              reject(error); 
            })                    

        }); 
      }
    catch(err){}    
  }




});



  
  



  // start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running."));
