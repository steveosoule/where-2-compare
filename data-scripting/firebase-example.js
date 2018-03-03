var admin = require("firebase-admin");

var serviceAccount = require("firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://where-2-compare.firebaseio.com"
});