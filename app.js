const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const xmlParser = require('xml2json');
const { stringify } = require("querystring");

var request = require('request');
var Set = require("collections/set");
var moment = require('moment');
var xml2js = require('xml2js');
var xml2jsParser = new xml2js.Parser();
var DEListMap = {
  "DEMap" : {},
  "SharedDEMap" : {},
  "DataViewMap" : {}
};

//Code Faizal
app.use(express.static(path.join(__dirname, './images')));
//Code Khatam
// Serve static files
app.use(express.static(__dirname + '/public'));
// use the express-static middleware
app.use(express.static(path.join(__dirname, './public/assets/icons')));
app.use(express.static(path.join(__dirname, './slds icons')));
app.use(express.static("marketing-cloud-query-app"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public/assets')));
app.use(express.static(path.join(__dirname, './marketing-cloud-query')));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/public/loginpage.html'));
})

app.set('view engine', 'html');

app.post("/secondpage", async function (req, res) {
   var AuthRequest = {
    "ClientId" : req.body.clientid,
    "ClientSecret" : req.body.clientsecret,
    "ClinentAuthURL" : req.body.authurl
   }
  //var AuthRequest = {
  //  "ClientId" : "sr7id7zht854bwdco8t9qdym",
  //  "ClientSecret" : "vhmEsBaxDl3LVeqYbLUxsg6p",
  //  "ClinentAuthURL" : "https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/"
  //}
  var NewDEName;
  var AuthResponse = await getacesstoken(AuthRequest);
  console.log(AuthResponse);
  if(AuthResponse.AccessToken)
  {
    console.log('Successfully redirected');
    res.sendFile(path.join(__dirname + '/public/secondpage.html')); 
  }
  else
  {
    res.end('no');
  }
  

  app.post("/DEListFetch", async (reqCall, resCall) => {
    DEListMap.DataViewMap = {
      "_EnterpriseAttribute": {
        "DEName": "_EnterpriseAttribute",
        "DEFields": [
          {
            "FieldName": "_SubscriberID",
            "FieldType": "Number"
          }
        ]
      },
      "_Subscribers": {
        "DEName": "_Subscribers",
        "DEFields": [
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "DateUndeliverable",
            "FieldType": "Date"
          },
          {
            "FieldName": "DateJoined",
            "FieldType": "Date"
          },
          {
            "FieldName": "DateUnsubscribed",
            "FieldType": "Date"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "EmailAddress",
            "FieldType": "Email"
          },
          {
            "FieldName": "BounceCount",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "SubscriberType",
            "FieldType": "Text"
          },
          {
            "FieldName": "Status",
            "FieldType": "Text"
          },
          {
            "FieldName": "Locale",
            "FieldType": "Locale"
          }
        ]
      },
      "_ListSubscribers": {
        "DEName": "_ListSubscribers",
        "DEFields": [
          {
            "FieldName": "AddedBy",
            "FieldType": "Number"
          },
          {
            "FieldName": "AddMethod",
            "FieldType": "Text"
          },
          {
            "FieldName": "CreatedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "DateUnsubscribed",
            "FieldType": "Date"
          },
          {
            "FieldName": "EmailAddress",
            "FieldType": "Text"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListName",
            "FieldType": "Text"
          },
          {
            "FieldName": "ListType",
            "FieldType": "Text"
          },
          {
            "FieldName": "Status",
            "FieldType": "Text"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "SubscriberType",
            "FieldType": "Text"
          }
        ]
      },
      "_Sent": {
        "DEName": "_Sent",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "EventDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggererSendDefinitionObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggeredSendCustomerKey",
            "FieldType": "Text"
          }
        ]
      },
      "_Open": {
        "DEName": "_Open",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "EventDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "TriggererSendDefinitionObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggeredSendCustomerKey",
            "FieldType": "Text"
          }
        ]
      },
      "_bounce": {
        "DEName": "_bounce",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "EventDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "BounceCategoryID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BounceCategory",
            "FieldType": "Text"
          },
          {
            "FieldName": "BounceSubcategoryID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BounceSubcategory",
            "FieldType": "Text"
          },
          {
            "FieldName": "BounceTypeID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BounceType",
            "FieldType": "Text"
          },
          {
            "FieldName": "SMTPBounceReason",
            "FieldType": "Text"
          },
          {
            "FieldName": "SMTPMessage",
            "FieldType": "Text"
          },
          {
            "FieldName": "SMTPCode",
            "FieldType": "Number"
          },
          {
            "FieldName": "TriggererSendDefinitionObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggeredSendCustomerKey",
            "FieldType": "Text"
          }
        ]
      },
      "_Click": {
        "DEName": "_Click",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "EventDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "TriggererSendDefinitionObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggeredSendCustomerKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "URL",
            "FieldType": "Text"
          },
          {
            "FieldName": "LinkName",
            "FieldType": "Text"
          },
          {
            "FieldName": "LinkContent",
            "FieldType": "Text"
          }
        ]
      },
      "_FTAF": {
        "DEName": "_FTAF",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "TriggererSendDefinitionObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggeredSendCustomerKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "TransactionTime",
            "FieldType": "Date"
          }
        ]
      },
      "_Unsubscribe": {
        "DEName": "_Unsubscribe",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "EventDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          }
        ]
      },
      "_Complaint": {
        "DEName": "_Complaint",
        "DEFields": [
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OYBAccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "EventDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          }
        ]
      },
      "_BusinessUnitUnsubscribes": {
        "DEName": "_BusinessUnitUnsubscribes",
        "DEFields": [
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "BusinessUnitID",
            "FieldType": "Number"
          },
          {
            "FieldName": "UnsubReason",
            "FieldType": "Text"
          },
          {
            "FieldName": "UnsubDateUTC",
            "FieldType": "Date"
          }
        ]
      },
      "_smsmessagetracking": {
        "DEName": "_smsmessagetracking",
        "DEFields": [
          {
            "FieldName": "MobileMessageTrackingID",
            "FieldType": "Number"
          },
          {
            "FieldName": "EID",
            "FieldType": "Number"
          },
          {
            "FieldName": "MID",
            "FieldType": "Number"
          },
          {
            "FieldName": "Mobile",
            "FieldType": "Phone"
          },
          {
            "FieldName": "MessageID",
            "FieldType": "Number"
          },
          {
            "FieldName": "KeywordID",
            "FieldType": "Text"
          },
          {
            "FieldName": "CodeID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ConversationID",
            "FieldType": "Text"
          },
          {
            "FieldName": "CampaignID",
            "FieldType": "Number"
          },
          {
            "FieldName": "Sent",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Delivered",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Undelivered",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Unsub",
            "FieldType": "Number"
          },
          {
            "FieldName": "OptIn",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "OptOut",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Outbound",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Inbound",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "CreateDateTime",
            "FieldType": "Date and time"
          },
          {
            "FieldName": "ModifiedDateTime",
            "FieldType": "Date and time"
          },
          {
            "FieldName": "ActionDateTime",
            "FieldType": "Date and time"
          },
          {
            "FieldName": "MessageText",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsTest",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "MobileMessageRecurrenceID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ResponseToMobileMessageTrackingID",
            "FieldType": "Number"
          },
          {
            "FieldName": "IsValid",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "InvalidationCode",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendSplitID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendSegmentID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendJobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendGroupID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendPersonID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "SMSStandardStatusCodeId",
            "FieldType": "Number"
          },
          {
            "FieldName": "Description",
            "FieldType": "Text"
          },
          {
            "FieldName": "Name",
            "FieldType": "Text"
          },
          {
            "FieldName": "ShortCode",
            "FieldType": "Text"
          },
          {
            "FieldName": "SharedKeyword",
            "FieldType": "Text"
          },
          {
            "FieldName": "Ordinal",
            "FieldType": "Number"
          },
          {
            "FieldName": "FromName",
            "FieldType": "Text"
          },
          {
            "FieldName": "JBActivityID",
            "FieldType": "Text"
          },
          {
            "FieldName": "JBDefinitionID",
            "FieldType": "Text"
          }
        ]
      },
      "_MobileLineAddressContactSubscriptionView": {
        "DEName": "_MobileLineAddressContactSubscriptionView",
        "DEFields": [
          {
            "FieldName": "ChannelID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ContactID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ContactKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "AddressID",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsActive",
            "FieldType": "Number"
          },
          {
            "FieldName": "CreatedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "ModifiedDate",
            "FieldType": "Date"
          }
        ]
      },
      "_MobileLineOrphanContactView": {
        "DEName": "_MobileLineOrphanContactView",
        "DEFields": [
          {
            "FieldName": "ContactID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ContactKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "AddressID",
            "FieldType": "Text"
          },
          {
            "FieldName": "CreatedDate",
            "FieldType": "Date"
          }
        ]
      },
      "_SMSSubscriptionLog": {
        "DEName": "_SMSSubscriptionLog",
        "DEFields": [
          {
            "FieldName": "LogDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "MobileSubscriptionID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriptionDefinitionID",
            "FieldType": "Text"
          },
          {
            "FieldName": "MobileNumber",
            "FieldType": "Phone"
          },
          {
            "FieldName": "OptOutStatusID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OptOutMethodID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OptOutDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "OptInStatusID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OptInMethodID",
            "FieldType": "Number"
          },
          {
            "FieldName": "OptInDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "Source",
            "FieldType": "Number"
          },
          {
            "FieldName": "CreatedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "ModifiedDate",
            "FieldType": "Date"
          }
        ]
      },
      "_UndeliverableSms": {
        "DEName": "_UndeliverableSms",
        "DEFields": [
          {
            "FieldName": "MobileNumber",
            "FieldType": "Phone"
          },
          {
            "FieldName": "Undeliverable",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "BounceCount",
            "FieldType": "Number"
          },
          {
            "FieldName": "FirstBounceDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "HoldDate",
            "FieldType": "Date"
          }
        ]
      },
      "_Journey ": {
        "DEName": "_Journey",
        "DEFields": [
          {
            "FieldName": "VersionID",
            "FieldType": "Text"
          },
          {
            "FieldName": "JourneyID",
            "FieldType": "Text"
          },
          {
            "FieldName": "JourneyName",
            "FieldType": "Text"
          },
          {
            "FieldName": "VersionNumber",
            "FieldType": "Number"
          },
          {
            "FieldName": "CreatedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "LastPublishedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "ModifiedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "JourneyStatus",
            "FieldType": "Text"
          }
        ]
      },
      "_JourneyActivity ": {
        "DEName": "_JourneyActivity ",
        "DEFields": [
          {
            "FieldName": "VersionID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ActivityID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ActivityName",
            "FieldType": "Text"
          },
          {
            "FieldName": "ActivityExternalKey",
            "FieldType": "Text"
          },
          {
            "FieldName": "JourneyActivityObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ActivityType",
            "FieldType": "Text"
          }
        ]
      },
      "_Job": {
        "DEName": "_Job",
        "DEFields": [
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "EmailID",
            "FieldType": "Number"
          },
          {
            "FieldName": "AccountID",
            "FieldType": "Number"
          },
          {
            "FieldName": "AccountUserID",
            "FieldType": "Number"
          },
          {
            "FieldName": "FromName",
            "FieldType": "Text"
          },
          {
            "FieldName": "FromEmail",
            "FieldType": "Email"
          },
          {
            "FieldName": "SchedTime",
            "FieldType": "Date"
          },
          {
            "FieldName": "PickupTime",
            "FieldType": "Date"
          },
          {
            "FieldName": "DeliveredTime",
            "FieldType": "Date"
          },
          {
            "FieldName": "EventID",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsMultipart",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "JobType",
            "FieldType": "Text"
          },
          {
            "FieldName": "JobStatus",
            "FieldType": "Text"
          },
          {
            "FieldName": "ModifiedBy",
            "FieldType": "Number"
          },
          {
            "FieldName": "ModifiedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "EmailName",
            "FieldType": "Text"
          },
          {
            "FieldName": "EmailSubject",
            "FieldType": "Text"
          },
          {
            "FieldName": "IsWrapped",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "TestEmailAddr",
            "FieldType": "Email"
          },
          {
            "FieldName": "Category",
            "FieldType": "Text"
          },
          {
            "FieldName": "BccEmail",
            "FieldType": "Email"
          },
          {
            "FieldName": "OriginalSchedTime",
            "FieldType": "Date"
          },
          {
            "FieldName": "CreatedDate",
            "FieldType": "Date"
          },
          {
            "FieldName": "CharacterSet",
            "FieldType": "Text"
          },
          {
            "FieldName": "IPAddress",
            "FieldType": "Text"
          },
          {
            "FieldName": "SalesForceTotalSubscriberCount",
            "FieldType": "Number"
          },
          {
            "FieldName": "SalesForceErrorSubscriberCount",
            "FieldType": "Number"
          },
          {
            "FieldName": "SendType",
            "FieldType": "Text"
          },
          {
            "FieldName": "DynamicEmailSubject",
            "FieldType": "Text"
          },
          {
            "FieldName": "SuppressTracking",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "SendClassificationType",
            "FieldType": "Text"
          },
          {
            "FieldName": "SendClassification",
            "FieldType": "Text"
          },
          {
            "FieldName": "ResolveLinksWithCurrentData",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "EmailSendDefinition",
            "FieldType": "Text"
          },
          {
            "FieldName": "DeduplicateByEmail",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "TriggererSendDefinitionObjectID",
            "FieldType": "Text"
          },
          {
            "FieldName": "TriggeredSendCustomerKey",
            "FieldType": "Text"
          }
        ]
      },
      "_SocialNetworkImpressions ": {
        "DEName": "_SocialNetworkImpressions ",
        "DEFields": [
          {
            "FieldName": "JobID",
            "FieldType": "Number"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "RegionTitle",
            "FieldType": "Text"
          },
          {
            "FieldName": "RegionDescription",
            "FieldType": "Text"
          },
          {
            "FieldName": "RegionHTML",
            "FieldType": "Text"
          },
          {
            "FieldName": "ContentRegionID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SocialSharingSiteID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SiteName",
            "FieldType": "Text"
          },
          {
            "FieldName": "CountryCode",
            "FieldType": "Text"
          },
          {
            "FieldName": "ReferringURL",
            "FieldType": "Text"
          },
          {
            "FieldName": "IPAddress",
            "FieldType": "Text"
          },
          {
            "FieldName": "TransactionTime",
            "FieldType": "Date"
          },
          {
            "FieldName": "PublishedSocialContentStatusID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ShortCode",
            "FieldType": "Text"
          },
          {
            "FieldName": "PublishTime",
            "FieldType": "Date"
          }
        ]
      },
      "_SocialNetworkTracking": {
        "DEName": "_SocialNetworkTracking ",
        "DEFields": [
          {
            "FieldName": "SubscriberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SubscriberKey",
            "FieldType": "Email"
          },
          {
            "FieldName": "ListID",
            "FieldType": "Number"
          },
          {
            "FieldName": "BatchID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SocialSharingSiteID",
            "FieldType": "Number"
          },
          {
            "FieldName": "SiteName",
            "FieldType": "Text"
          },
          {
            "FieldName": "CountryCode",
            "FieldType": "Text"
          },
          {
            "FieldName": "PublishedSocialContentID",
            "FieldType": "Text"
          },
          {
            "FieldName": "RegionTitle",
            "FieldType": "Text"
          },
          {
            "FieldName": "RegionDescription",
            "FieldType": "Text"
          },
          {
            "FieldName": "RegionHTML",
            "FieldType": "Text"
          },
          {
            "FieldName": "ContentRegionID",
            "FieldType": "Text"
          },
          {
            "FieldName": "OYBMemberID",
            "FieldType": "Number"
          },
          {
            "FieldName": "TransactionTime",
            "FieldType": "Date"
          },
          {
            "FieldName": "IsUnique",
            "FieldType": "Boolean"
          },
          {
            "FieldName": "Domain",
            "FieldType": "Text"
          },
          {
            "FieldName": "PublishedSocialContentStatusID",
            "FieldType": "Text"
          },
          {
            "FieldName": "ShortCode",
            "FieldType": "Text"
          },
          {
            "FieldName": "PublishTime",
            "FieldType": "Date"
          }
        ]
      }
    }
    DEListMap = await getDEMap();
    DEListMap = await getSharedDEMap();
    DEListMap = await getAllDEFields();
    resCall.send(DEListMap);

    async function getDEMap() {
      return new Promise(function (resolve, reject) {
        var ListDEOption = {
          'method': 'POST',
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Retrieve',
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">' + AuthResponse.SoapURL + 'Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtension</ObjectType>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>DataExtension.ObjectID</Properties>\r\n                <Properties>IsSendable</Properties>\r\n          <Properties>IsTestable</Properties>\r\n             <Properties>SendableSubscriberField.Name</Properties>\r\n        <Properties>SendableDataExtensionField.Name</Properties>\r\n          <Properties>Description</Properties>\r\n                  </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'
        };
        request(ListDEOption, function (error, response) {
          if (error) throw new Error(error);
          xml2jsParser.parseString(response.body, async function (err, result) {
            var TempDEListFetchResult = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
            for(var i in TempDEListFetchResult) {
              if (!["ExpressionBuilderAttributes" , "_MobileAddress" , "_MobileSubscription" , "_PushAddress" , "_PushTag" , "_MobileLineAddressContact" , "_MobileLineAddress" , "_MobileLineProfile" , "_MobileLineProfileAttribute" , "_MobileLineSubscription" , "MobileLineOrphanContact"].includes(TempDEListFetchResult[i]["Name"][0])) {
                DEListMap.DEMap[TempDEListFetchResult[i]["CustomerKey"][0]] = {
                  "DEName" : TempDEListFetchResult[i]["Name"][0],
                  "DEFields" : []
                }
              }
              else {
                DEListMap.DataViewMap[TempDEListFetchResult[i]["CustomerKey"][0]] = {
                  "DEName" : TempDEListFetchResult[i]["Name"][0],
                  "DEFields" : []
                }
              }
            }
            resolve(DEListMap);
          });
        });
      })
    }
    async function getSharedDEMap() {
      return new Promise(function (resolve, reject) {
        var SharedDEFolderOption = {
          'method': 'POST',
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Retrieve',
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">' + AuthResponse.SoapURL + 'Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataFolder</ObjectType>\r\n                <Properties>ID</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>ContentType</Properties>\r\n                <Properties>ParentFolder.Name</Properties>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>ParentFolder.ObjectID</Properties>\r\n\r\n                <ns1:Filter\r\n                     xmlns:ns1="http://exacttarget.com/wsdl/partnerAPI" xsi:type="ns1:SimpleFilterPart">\r\n                     <ns1:Property>ContentType</ns1:Property>\r\n                     <ns1:SimpleOperator>equals</ns1:SimpleOperator>\r\n                     <ns1:Value>shared_dataextension</ns1:Value>\r\n                </ns1:Filter>\r\n\r\n                <QueryAllAccounts>true</QueryAllAccounts>\r\n            </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'
        };
        request(SharedDEFolderOption, function (error, response) {
          if (error) throw new Error(error);
          var ListShareDEBody = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
            '<s:Header>' +
            '<a:Action s:mustUnderstand="1">Retrieve</a:Action>' +
            '<a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>' +
            '<a:ReplyTo>' +
            '<a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>' +
            '</a:ReplyTo>' +
            '<a:To s:mustUnderstand="1">' + AuthResponse.SoapURL + 'Service.asmx</a:To>' +
            '<fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>' +
            '</s:Header>' +
            '<s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
            '<RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
            '<RetrieveRequest>' +
            '<ObjectType>DataExtension</ObjectType>' +
            '<QueryAllAccounts>true</QueryAllAccounts>' +
            '<QueryAllAccountsSpecified>true</QueryAllAccountsSpecified>' +
            '<Properties>CustomerKey</Properties>' +
            '<Properties>Name</Properties>' +
            '<Properties>DataExtension.ObjectID</Properties>' +
            '<Properties>IsSendable</Properties>' +
            '<Properties>IsTestable</Properties>' +
            '<Properties>SendableSubscriberField.Name</Properties>' +
            '<Properties>SendableDataExtensionField.Name</Properties>' +
            '<Properties>Description</Properties>' +
            '<Properties>CategoryID</Properties>' +
            '<Properties>Client.ID</Properties>' +
            '<Filter xsi:type="SimpleFilterPart">' +
            '<Property>CategoryID</Property>';
          xml2jsParser.parseString(response.body, function (err, result) {
            if (result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'].length == 1) {
              ListShareDEBody = ListShareDEBody + '<SimpleOperator>equals</SimpleOperator> <Value>' + result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'][0].ID[0] + '</Value>';
            }
            else {
              ListShareDEBody = ListShareDEBody + '<SimpleOperator>IN</SimpleOperator>';
              for (var i = 0; i < result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'].length; i++) {
                ListShareDEBody = ListShareDEBody + '<Value>' + result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'][i].ID[0] + '</Value>';
              }
            }
          });
          ListShareDEBody = ListShareDEBody + '</Filter>' +
            '</RetrieveRequest>' +
            '</RetrieveRequestMsg>' +
            '</s:Body>' +
            '</s:Envelope>';
          var ListSharedDEOption = {
            'method': 'POST',
            'url': AuthResponse.SoapURL + 'Service.asmx',
            'headers': {
              'Content-Type': 'text/xml',
              'SoapAction': 'Retrieve',
              'Authorization': 'Bearer ' + AuthResponse.AccessToken
            },
            body: ListShareDEBody
          };
          request(ListSharedDEOption, function (error, response) {
            if (error) throw new Error(error);
            xml2jsParser.parseString(response.body, async function (err, result) {
              var TempSharedDEListFetchResult = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
              for(var i in TempSharedDEListFetchResult) {
                DEListMap.SharedDEMap[TempSharedDEListFetchResult[i]["CustomerKey"][0]] = {
                  "DEName" : TempSharedDEListFetchResult[i]["Name"][0],
                  "DEFields" : []
                }
              }
              resolve(DEListMap);
            });
          });
        });
      })
    }
    async function getAllDEFields() {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Retrieve'
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">' + AuthResponse.SoapURL + 'Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtensionField</ObjectType>\r\n                <Properties>Client.ID</Properties>\r\n                <Properties>CreatedDate</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>DataExtension.CustomerKey</Properties>\r\n                <Properties>DefaultValue</Properties>\r\n                <Properties>FieldType</Properties>\r\n                <Properties>IsPrimaryKey</Properties>\r\n                <Properties>IsRequired</Properties>\r\n                <Properties>MaxLength</Properties>\r\n                <Properties>ModifiedDate</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>Ordinal</Properties>\r\n                <Properties>Scale</Properties>\r\n\r\n                               <QueryAllAccounts>true</QueryAllAccounts>\r\n                <Retrieves />\r\n                <Options>\r\n                    <SaveOptions />\r\n                    <IncludeObjects>true</IncludeObjects>\r\n                </Options>\r\n            </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'
        };
        request(options, async function (error, response) {
          if (error) throw new Error(error);
          var TempFieldSet = new Set();
          var tempVal;
          xml2jsParser.parseString(response.body, function (err, result) {
            var TempDEFieldsResult = result['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'];
            for (var key in TempDEFieldsResult) {
              TempFieldSet.add(JSON.stringify({
                "CustomerKey": TempDEFieldsResult[key].DataExtension[0].CustomerKey[0],
                "FieldName": TempDEFieldsResult[key].Name[0],
                "FieldType": TempDEFieldsResult[key].FieldType[0]
              }));
            }
            for (var val of Array.from(TempFieldSet)) {
              tempVal = JSON.parse(val);
              if(tempVal.CustomerKey in DEListMap.DEMap) {
                DEListMap.DEMap[tempVal.CustomerKey].DEFields.push({
                  "FieldName": tempVal.FieldName,
                  "FieldType": tempVal.FieldType
                });
              }
              else if(tempVal.CustomerKey in DEListMap.SharedDEMap) {
                DEListMap.SharedDEMap[tempVal.CustomerKey].DEFields.push({
                  "FieldName": tempVal.FieldName,
                  "FieldType": tempVal.FieldType
                });
              }
              else if(tempVal.CustomerKey in DEListMap.DataViewMap) {
                DEListMap.DataViewMap[tempVal.CustomerKey].DEFields.push({
                  "FieldName": tempVal.FieldName,
                  "FieldType": tempVal.FieldType
                });
              }
            }
            resolve(DEListMap);
          });
        });
      })
    }
  });

  app.post("/validatequery", async (reqCall, resCall) => {
    NewDEName = moment().format('yyyy-mm-dd:hh:mm:ss');
    var DERecords = [];
    var NewDEFieldsList = reqCall.body.NewDEFieldsList;
    var dynamicQuery = reqCall.body.dynamicQuery;
    var actionType = reqCall.body.actionType
    var queryDefinitionId = '';

    console.log("dynamicQuery  :  " + dynamicQuery);

    var options = {
      'method': 'POST',
      'url': AuthResponse.RestURL + 'automation/v1/queries/actions/validate/',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthResponse.AccessToken
      },
      body: JSON.stringify({ "Text": dynamicQuery })
    };
    request(options, async function (error, response) {
      if (error) throw new Error(error);
      if (actionType == "Validate" && JSON.parse(response.body).queryValid == true) {
        resCall.send({
          'IsQueryValid' : JSON.parse(response.body).queryValid,
          'ErrorMsg' : ''
        });
      }
      else if (actionType == "Validate" && JSON.parse(response.body).queryValid == false) {
        resCall.send({
          'IsQueryValid' : JSON.parse(response.body).queryValid,
          'ErrorMsg' : JSON.parse(response.body).errors[0].message
        });
      }
      else if (actionType == "Run" && JSON.parse(response.body).queryValid == true) {
        resCall.send({
          'IsQueryValid' : JSON.parse(response.body).queryValid,
          'ErrorMsg' : ''
        });
        var FolderCheckResult = await FolderCheck();
        var ParentFolderCatagoryID = '';
        var ChildFolderCatagoryID = '';
        var DECreateResult;
        for(var key in FolderCheckResult) {
          if(FolderCheckResult[key]["Name"][0] == "Data Extensions" && FolderCheckResult[key]["CustomerKey"][0] == "dataextension_default") {
            ParentFolderCatagoryID = FolderCheckResult[key]["ID"][0];
          }
          if(FolderCheckResult[key]["Name"][0] == "Query App") {
            ChildFolderCatagoryID = FolderCheckResult[key]["ID"][0];
          }
        }
        if(ChildFolderCatagoryID != '') {
          DECreateResult = await DECreate(NewDEFieldsList , ChildFolderCatagoryID);
        }
        else {
          ChildFolderCatagoryID = await FolderCreate(ParentFolderCatagoryID);
          DECreateResult = await DECreate(NewDEFieldsList , ChildFolderCatagoryID);
        }
        var DECreateResultObjectID = DECreateResult[0].Object[0].ObjectID[0];
         console.log('Result ID: '+DECreateResultObjectID+' NewDENAme '+NewDEName+' dynamicQuery '+dynamicQuery);
        var taskId = await CreateRunQuery(DECreateResultObjectID, NewDEName, dynamicQuery);
        console.log('TaskId '+taskId);
        if (taskId) {
          var queryStatus;
          var b = setInterval(async function () {
            queryStatus = await queryStatusMethod(taskId);
            console.log('outside if '+queryStatus);
            if (queryStatus == "Complete") {
              console.log('Inside if '+NewDEName);
        
               DERecords = await getDERecords(NewDEName);
        
               console.log('Records Server '+JSON.stringify(DERecords));

              await QueryDelete(queryDefinitionId);
              console.log('ClearInterval up');
              clearInterval(b);
            }
          }, 10000);
          app.post("/DERecordGet", async (reqCall1, resCall1) => {
            console.log('In Derecord get');
            if (queryStatus != "Complete") {
              resCall1.send("false");
            }
            else {
              console.log('Server Side '+DERecords);
              resCall1.send(DERecords);
            }
          })
        }
      }
      else if (actionType == "Run" && JSON.parse(response.body).queryValid == false) {
        resCall.send({
          'IsQueryValid' : JSON.parse(response.body).queryValid,
          'ErrorMsg' : JSON.parse(response.body).errors[0].message
        });
      }
    });

    async function FolderCheck() {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Retrieve',
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\r\n        <a:ReplyTo>\r\n            <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\r\n        </a:ReplyTo>\r\n        <a:To s:mustUnderstand="1">' + AuthResponse.SoapURL + 'Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataFolder</ObjectType>\r\n                <Properties>ID</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>ContentType</Properties>\r\n                <Properties>ParentFolder.Name</Properties>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>ParentFolder.ObjectID</Properties>\r\n                <Properties>AllowChildren</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n\r\n                                <Filter xsi:type="par:ComplexFilterPart" xmlns:par="http://exacttarget.com/wsdl/partnerAPI">\r\n                    <LeftOperand xsi:type="par:SimpleFilterPart">\r\n                        <Property>ContentType</Property>\r\n                        <SimpleOperator>equals</SimpleOperator>\r\n                        <Value>dataextension</Value>\r\n                    </LeftOperand>\r\n                    <LogicalOperator>AND</LogicalOperator>\r\n                    <RightOperand xsi:type="par:SimpleFilterPart">\r\n                        <Property>Name</Property>\r\n                        <SimpleOperator>IN</SimpleOperator>\r\n                        <Value>Data Extensions</Value>\r\n                        <Value>Query App</Value>\r\n                    </RightOperand>\r\n                </Filter>\r\n\r\n                <QueryAllAccounts>true</QueryAllAccounts>\r\n            </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </s:Body>\r\n</s:Envelope>'
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          xml2jsParser.parseString(response.body, async function (err, result) {
            resolve(result["soap:Envelope"]["soap:Body"][0]["RetrieveResponseMsg"][0]["Results"]);
          });
        });
      })
    }

    async function FolderCreate(ParentFolderCatagoryID) {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Create',
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          },
          body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<SOAP-ENV:Envelope\r\n    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    \r\n    <SOAP-ENV:Header>\r\n        <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </SOAP-ENV:Header>\r\n    \r\n    <SOAP-ENV:Body>\r\n        <CreateRequest\r\n            xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <Options/>\r\n            <ns1:Objects\r\n                xmlns:ns1="http://exacttarget.com/wsdl/partnerAPI"\r\n                xsi:type="ns1:DataFolder">\r\n                <ns1:ModifiedDate\r\n                 xsi:nil="true"/>\r\n                <ns1:ObjectID\r\n                 xsi:nil="true"/>\r\n                <ns1:CustomerKey>Query App</ns1:CustomerKey>\r\n                <ns1:ParentFolder>\r\n                    <ns1:ModifiedDate\r\n                     xsi:nil="true"/>\r\n                    <ns1:ID>' + ParentFolderCatagoryID + '</ns1:ID>\r\n                    <ns1:ObjectID\r\n                     xsi:nil="true"/>\r\n                </ns1:ParentFolder>\r\n                <ns1:Name>Query App</ns1:Name>\r\n                <ns1:Description>Query App</ns1:Description>\r\n                <ns1:ContentType>dataextension</ns1:ContentType>\r\n                <ns1:IsActive>true</ns1:IsActive>\r\n                <ns1:IsEditable>true</ns1:IsEditable>\r\n                <ns1:AllowChildren>true</ns1:AllowChildren>\r\n            </ns1:Objects>\r\n        </CreateRequest>\r\n    </SOAP-ENV:Body>\r\n</SOAP-ENV:Envelope>'
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          xml2jsParser.parseString(response.body, function (err, result) {
            resolve(result['soap:Envelope']['soap:Body'][0]['CreateResponse'][0]['Results'][0]['NewID'][0]);
          });
        });
      })
    }

    async function DECreate(NewDEFieldsList , ChildFolderCatagoryID) {
      return new Promise(function (resolve, reject) {
        var DEListBody = '<?xml version="1.0" encoding="UTF-8"?>' +
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
          '<soapenv:Header>' +
          '<fueloauth>' + AuthResponse.AccessToken + '</fueloauth>' +
          '</soapenv:Header>' +
          '<soapenv:Body>' +
          '<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
          '<Options/>' +
          '<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">' +
          '<CustomerKey>' + NewDEName + '</CustomerKey>' +
          '<Name>' + NewDEName + '</Name>' +
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
        for (var Field of NewDEFieldsList) {
          if (Field.FieldType == 'Number' || Field.FieldType == 'Date' || Field.FieldType == 'Boolean') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + Field.FieldName + '</CustomerKey>' +
              '<Name>' + Field.FieldName + '</Name>' +
              '<Label>' + Field.FieldName + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>' + Field.FieldType + '</FieldType>' +
              '</Field>';
          }
          else if (Field.FieldType == 'EmailAddress') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + Field.FieldName + '</CustomerKey>' +
              '<Name>' + Field.FieldName + '</Name>' +
              '<Label>' + Field.FieldName + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>EmailAddress</FieldType>' +
              '<MaxLength>254</MaxLength>' +
              '</Field>';
          }
          else if (Field.FieldType == 'Phone') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + Field.FieldName + '</CustomerKey>' +
              '<Name>' + Field.FieldName + '</Name>' +
              '<Label>' + Field.FieldName + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Phone</FieldType>' +
              '<MaxLength>50</MaxLength>' +
              '</Field>';
          }
          else if (Field.FieldType == 'Decimal') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + Field.FieldName + '</CustomerKey>' +
              '<Name>' + Field.FieldName + '</Name>' +
              '<Label>' + Field.FieldName + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Decimal</FieldType>' +
              '<MaxLength>38</MaxLength>' +
              '<Scale>38</Scale>' +
              '</Field>';
          }
          else if (Field.FieldType == 'Locale') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + Field.FieldName + '</CustomerKey>' +
              '<Name>' + Field.FieldName + '</Name>' +
              '<Label>' + Field.FieldName + '</Label>' +
              '<IsRequired>false</IsRequired>' +
              '<IsPrimaryKey>false</IsPrimaryKey>' +
              '<FieldType>Locale</FieldType>' +
              '<MaxLength>5</MaxLength>' +
              '</Field>';
          }
          else if (Field.FieldType == 'Text') {
            DEListBody = DEListBody + '<Field xsi:type="ns2:DataExtensionField">' +
              '<CustomerKey>' + Field.FieldName + '</CustomerKey>' +
              '<Name>' + Field.FieldName + '</Name>' +
              '<Label>' + Field.FieldName + '</Label>' +
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
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Create',
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          },
          body: DEListBody
        };
        request(DEListOption, async function (error, response) {
          if (error) throw new Error(error);
          xml2jsParser.parseString(response.body, function (err, result) {
            resolve(result['soap:Envelope']['soap:Body'][0]['CreateResponse'][0]['Results']);
          });
        });
      })
    }

    async function CreateRunQuery(DECreateResultObjectID, NewDEName, dynamicQuery) {
      return new Promise(function (resolve, reject) {
        var options = {
          'method': 'POST',
          'url': AuthResponse.RestURL + 'automation/v1/queries/',
          'headers': {
            'Authorization': 'Bearer ' + AuthResponse.AccessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": "QueryDE " + NewDEName,
            "key": "QueryDE " + NewDEName,
            "description": "",
            "queryText": dynamicQuery,
            "targetName": NewDEName,
            "targetKey": NewDEName,
            "targetId": DECreateResultObjectID,
            "targetDescription": "Created via REST API",
            "targetUpdateTypeId": 0,
            "targetUpdateTypeName": "Overwrite",
            "categoryId": 10844
          })
        };
        request(options, async function (error, response) {
          if (error) throw new Error(error);
          queryDefinitionId = JSON.parse(response.body).queryDefinitionId;
          if (queryDefinitionId) {
            var options = {
              'method': 'POST',
              'url': AuthResponse.SoapURL + 'Service.asmx',
              'headers': {
                'Content-Type': 'text/xml;charset=UTF-8',
                'SOAPAction': 'Perform',
                'Authorization': 'Bearer ' + AuthResponse.AccessToken
              },
              body: '<?xml version="1.0" encoding="utf-8"?>\r\n<soapenv:Envelope\r\n    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    <soapenv:Header>\r\n   <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </soapenv:Header>\r\n    <soapenv:Body>\r\n        <PerformRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <Action>start</Action>\r\n            <Definitions>\r\n                <Definition xsi:type="QueryDefinition">\r\n                    <ObjectID>' + queryDefinitionId + '</ObjectID>\r\n                </Definition>\r\n            </Definitions>\r\n        </PerformRequestMsg>\r\n    </soapenv:Body>\r\n</soapenv:Envelope>'
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              xml2jsParser.parseString(response.body, function (err, result) {
                resolve(result['soap:Envelope']['soap:Body'][0]['PerformResponseMsg'][0]['Results'][0]['Result'][0]['Task'][0]['ID'][0]);
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
          'url': AuthResponse.SoapURL + 'Service.asmx',
          'headers': {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'Retrieve'
          },
          body: '<?xml version="1.0" encoding="utf-8"?>\r\n<soapenv:Envelope\r\n    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\r\n    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\r\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n    <soapenv:Header>\r\n   <fueloauth xmlns="http://exacttarget.com">' + AuthResponse.AccessToken + '</fueloauth>\r\n    </soapenv:Header>\r\n   <soapenv:Body>\r\n      <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n         <RetrieveRequest>\r\n            <ObjectType>AsyncActivityStatus</ObjectType>\r\n            <Properties>Status</Properties>\r\n            <Properties>StartTime</Properties>\r\n            <Properties>EndTime</Properties>\r\n            <Properties>TaskID</Properties>\r\n            <Properties>ParentInteractionObjectID</Properties>\r\n            <Properties>InteractionID</Properties>\r\n            <Properties>Program</Properties>\r\n            <Properties>StepName</Properties>\r\n            <Properties>ActionType</Properties>\r\n            <Properties>Type</Properties>\r\n            <Properties>Status</Properties>\r\n            <Properties>CustomerKey</Properties>\r\n            <Properties>ErrorMsg</Properties>\r\n            <Properties>CompletedDate</Properties>\r\n            <Properties>StatusMessage</Properties>\r\n            <Filter xsi:type="SimpleFilterPart">\r\n               <Property>TaskID</Property>\r\n               <SimpleOperator>equals</SimpleOperator>\r\n               <Value>' + TaskId + '</Value>\r\n            </Filter>\r\n         </RetrieveRequest>\r\n      </RetrieveRequestMsg>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          xml2jsParser.parseString(response.body, function (err, result) {
            resolve(result["soap:Envelope"]["soap:Body"][0]["RetrieveResponseMsg"][0]["Results"][0]["Properties"][0]["Property"][7]["Value"][0]);
          });
        });
      })
    }

    async function getDERecords(key) {
      return new Promise(async function (resolve, reject) {
        //var NextUrl;
        var DEDataOptions = {
          'method': 'GET',
          'url': AuthResponse.RestURL + 'data/v1/customobjectdata/key/'+key+'/rowset/',
          'headers': {
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          }
        };
        request(DEDataOptions, async function (error, response) {
          if (error) throw new Error(error);
          var tempResult = JSON.parse(response.body);
          if (tempResult.count != 0) {
            for (var i in tempResult.items) {
              DERecords.push(tempResult.items[i].values);
            }
          }
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
          'url': AuthResponse.RestURL + 'data' + NextUrl,
          'headers': {
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          }
        };
        request(DEMoreDataOptions, function (error, response) {
          if (error) throw new Error(error);
          var tempResult1 = JSON.parse(response.body);
          if (tempResult1.count != 0) {
            for (var i in tempResult1.items) {
              DERecords.push(tempResult1.items[i].values);
            }
          }
          NextUrl = tempResult1.links.next;
          resolve(NextUrl);
        })
      })
    }

    async function QueryDelete(queryDefinitionId) {
      return new Promise(async function (resolve, reject) {
        var options = {
          'method': 'DELETE',
          'url': AuthResponse.RestURL + 'automation/v1/queries/' + queryDefinitionId,
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          }
        };
        request(options, async function (error, response) {
          if (error) throw new Error(error);
          resolve(response.body)
        });
      })
    }

  });

  app.post("/RunQuery", async (reqCall, resCall) => {
    var DERecords = [];
    DERecords = await getDERecords(NewDEName);
    resCall.send(DERecords);
    async function getDERecords(key) {
      return new Promise(async function (resolve, reject) {
        //var NextUrl;
        var DEDataOptions = {
          'method': 'GET',
          'url': AuthResponse.RestURL + 'data/v1/customobjectdata/key/' + key + '/rowset/',
          'headers': {
            'Authorization': 'Bearer ' + AuthResponse.AccessToken
          }
        };
        request(DEDataOptions, async function (error, response) {
          if (error) throw new Error(error);
          var tempResult = JSON.parse(response.body);
          if (tempResult.count != 0) {
            for (var i in tempResult.items) {
              DERecords.push(tempResult.items[i].values);
            }
          }
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
  })
  
  async function getacesstoken(AuthRequest) {
    try {
      return new Promise(function (resolve, reject) {
        axios.post( AuthRequest.ClinentAuthURL + 'v2/token',
        {
          'client_id': AuthRequest.ClientId,
          'client_secret': AuthRequest.ClientSecret,
          'grant_type': 'client_credentials'
        })
        .then((response) => {
          resolve({
              'AccessToken' : response.data.access_token,
              'RestURL' : response.data.rest_instance_url,
              'SoapURL' : response.data.soap_instance_url
            });
        },
        (error) => {
          //reject(error);
          //res.end();
        })

      });
    }
    catch (err) { 
    }
  }
});

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running."));
