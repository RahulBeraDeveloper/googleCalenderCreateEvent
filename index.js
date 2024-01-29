const express = require('express');
const { google } = require('googleapis');
// const dotenv = require('dotenv');
// dotenv.config(); 

const app = express();


const SCOPES = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_PRIVATE_KEY = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCYT9ZpN74E0fOzua0y6VYdOMWcFI3FDi0AVsY4gxE246UU0CZkp+uKO+HjUeY2wvJ8pJaiynNtqTYY`;


const GOOGLE_CLIENT_EMAIL = 'calender-key@rahul-calender.iam.gserviceaccount.com';
const GOOGLE_PROJECT_NUMBER = 100239326374;
const GOOGLE_CALENDAR_ID = 'rahulbera3654@gmail.com';

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: 'v3',
  project: GOOGLE_PROJECT_NUMBER ,
  auth:  jwtClient
});

app.get('/', (req, res) => {
  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    },
    (error, result) => {
      if (error) {
        console.error('Error fetching events:', error);
        res.status(500).send(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: 'No upcoming events found.' }));
        }
      }
    }
  );
});


// app.get("/createEvent",(req,res)=>{ 
//   var event = { 
    // 'summary': 'My first event!', 
    // 'location': 'Kolkata,India', 
    // 'description': 'First event with EasterCodeUniverse!', 
    // 'start': { 
    //   'dateTime': '2024-01-30T09:00:00-07:00', 
    //   'timeZone': 'Asia/Kolkata', 
    // }, 
    // 'end': { 
    //   'dateTime': '2024-01-31T17:00:00-07:00', 
    //   'timeZone': 'Asia/Kolkata', 
    // }, 
    // 'attendees': [], 
    // 'reminders': { 
    //   'useDefault': false, 
    //   'overrides': [ 
    //     {'method': 'email', 'minutes': 24 * 60}, 
    //     {'method': 'popup', 'minutes': 10}, 
    //   ], 
    // }, 
//   }; 

app.get("/createEvent", (req, res) => {
  var event = {
    'summary': 'My first event!', 
    'location': 'Kolkata,India', 
    'description': 'First event with EasterCodeUniverse!', 
    'start': { 
      'dateTime': '2024-01-30T09:00:00-07:00', 
      'timeZone': 'Asia/Kolkata', 
    }, 
    'end': { 
      'dateTime': '2024-01-31T17:00:00-07:00', 
      'timeZone': 'Asia/Kolkata', 
    }, 
    'attendees': [], 
    'reminders': { 
      'useDefault': false, 
      'overrides': [ 
        {'method': 'email', 'minutes': 24 * 60}, 
        {'method': 'popup', 'minutes': 10}, 
      ], 
    }, 

  };
    
  const auth = new google.auth.GoogleAuth({
    keyFile: 'C:\\Users\\rahulkalkey\\Desktop\\credentials\\credentials.json',
    scopes: 'https://www.googleapis.com/auth/calendar',
  });
  
  auth.getClient().then(a => {
    calendar.events.insert({
      auth: a,
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
    }, function (err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Event created: %s', event.data);
      res.json({ message: 'Event successfully created!' });
    });
  });
});

  
app.listen(4500, () => console.log(`App listening on port 4500!`));
