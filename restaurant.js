// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';

process.env.DEBUG = 'actions-on-google:*';
let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let sprintf = require('sprintf-js').sprintf;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

const RESTAURANT_BOOKING_ACTION = 'restaurant.book';


const ANOTHER_GUESS_PROMPTS = ['What\'s your next guess?', 'Have another guess?', 'Try another.'];
const GREETING_PROMPTS = ['Let\'s play Number Genie!', 'Welcome to Number Genie!', 'Hi! This is Number Genie.',
    'Welcome back to Number Genie.'];
const INVOCATION_PROMPT = ['I\'m thinking of a number from %s to %s. What\'s your first guess?'];
const RE_PROMPT = ['Great!', 'Awesome!', 'Cool!', 'Okay, let\'s play again.', 'Okay, here we go again.',
    'Alright, one more time with feeling.'];
const RE_INVOCATION_PROMPT = ['I\'m thinking of a new number from %s to %s. What\'s your guess?'];

const VENUE_TITLE = 'venue-title';
const PEOPLE = 'people';
const DATE_TIME = 'date-time';


// HTTP POST request handler
 app.post('/', function (request, response) {
// HTTP Cloud Function handler
// exports.number_genie = function (request, response) {
  console.log('headers: ' + JSON.stringify(request.headers));
  console.log('body: ' + JSON.stringify(request.body));
  const assistant = new ApiAiAssistant({request: request, response: response});

  function restaurantBookingAction(assistant){
  console.log('restaurantBookingAction');	
    let venueTitle = assistant.getArgument(VENUE_TITLE);
    let people = assistant.getArgument(PEOPLE);
    let dateTime = assistant.getArgument(DATE_TIME);
  console.log('venueTitle: '+venueTitle);
  console.log('people: '+people);
  console.log('dateTime: '+ dateTime);		
  }	

  let actionMap = new Map();
  actionMap.set(RESTAURANT_BOOKING_ACTION, restaurantBookingAction);
  assistant.handleRequest(actionMap);
});
 
 // Start the web server
 let server = app.listen(app.get('port'), function () {
   console.log('App listening on port %s', server.address().port);
   console.log('Press Ctrl+C to quit.');
 });
 // [END app]

