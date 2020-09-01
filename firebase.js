const {Storage} = require('@google-cloud/storage');

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAT11wr2o-qTVWXvOUXm8aMwT9lARz5VW4",
    authDomain: "storage-test-6df04.firebaseapp.com",
    databaseURL: "https://storage-test-6df04.firebaseio.com",
    projectId: "storage-test-6df04",
    storageBucket: "storage-test-6df04.appspot.com",
    messagingSenderId: "466213639196",
    appId: "1:466213639196:web:83172822a9e5b2b1c63bd9",
    measurementId: "G-8TQFM6R234"
  };

  const storage = new Storage();

  const bucket = storage.bucket("storage-test-6df04.appspot.com")

  module.exports = bucket
