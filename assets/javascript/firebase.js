
// Initialize Firebase
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCJo7PpoLQf0PSm8nlTN2WH07SOUM5Xf-k",
        authDomain: "startrekking-fixed-app.firebaseapp.com",
        databaseURL: "https://startrekking-fixed-app.firebaseio.com",
        projectId: "startrekking-fixed-app",
        storageBucket: "startrekking-fixed-app.appspot.com",
        messagingSenderId: "44108877010"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    var firstName = "";
    var lastName = "";
    var email = "";
    var country = "";
    var subject = "";

    $("#contact-us").on("click", function (event) {
        event.preventDefault();

        firstName = $("#fname").val().trim();
        lastName = $("#lname").val().trim();
        email = $("#email").val().trim();
        country = $("#country").val().trim();

        database.ref().set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            country: country,
            subject: subject
        });

        database.ref().on("value", function (snap) {
            console.log("First Name: " + snap.val().firstName);
            console.log("Last Name: " + snap.val().lastName);
            console.log("Email: " + snap.val().email);
            console.log("Country: " + snap.val().country);
            console.log("Message: " + snap.val().subject);
        });
    });
});


