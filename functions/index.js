//this is node js apparently
//accesses firebase database w/ SDK so this is us importing it
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//getHomepage is cloud functions name
//functions.https.onCall takes in a function, so THAT function will be run WHEN getHomepage is run
//cloud function runs inner function
exports.getHomepage = functions.https.onCall(async (data, context) => {
  //admin.database is how to reference database, .ref is /homepage, so pass database PATH u want data from
  //.once('value') just means u want the value of homepage ONCE
  const homepageSnapshot = await admin.database().ref('/homepage').once('value');
  //to get actual value, need to call .val()
  const homepage = homepageSnapshot.val();
  console.log(homepage);

  //auth undefined if NOT logged in, so if defined then get uid
  //now this renders the sanitized (NON SENSITIVE) deck data that you can use!!!!!
  const uid = context.auth && context.auth.uid;
  const sanitized = {};
  Object.keys(homepage).forEach(deckId => {
    const deck = homepage[deckId];

    if (deck.visibility === 'private' && deck.owner !== uid) {
      return;
    }
    sanitized[deckId] = deck;
  });

  return sanitized;
});
