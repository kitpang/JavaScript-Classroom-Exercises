/* -------------------------------------------------------------------------------------

    THE OPEN WEATHER API - JAVASCRIPT CODE FOR THE DEMO


------------------------------------------------------------------------------------- */

/*var myAPPIKEY = "0e6b748ed37e9bf0ac9beb3c0824fb0c";*/

var myAPPIKEY = "6c5dbc17b5c4fa8f4c39c6d40743aaee"; //manuel's api

var theButton = document.getElementById("myButton");

theButton.addEventListener("click", getWeather, false);

function getWeather() {

    var userCityInput = document.getElementById("theCity").value;

    var userCity = userCityInput.charAt(0).toUpperCase() + userCityInput.slice(1).toLowerCase();

    console.log(userCity);

    var theAPIcall = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + userCity + "&units=metric&APPID=" + myAPPIKEY + "&cnt=7";

    console.log(theAPIcall);

    //Go now and get the AJAX CALL...

    var myRequest = new XMLHttpRequest();

    myRequest.open("GET", theAPIcall, true);


    myRequest.onload = function () {

        if (this.readyState === 4 && this.status === 200) {

            var myData = JSON.parse(this.responseText);
            console.log(myData);

            // http://openweathermap.org/img/w/10d.png
            var weatherImage = "http://openweathermap.org/img/w/" + myData.list["0"].weather["0"].icon + ".png";

            document.getElementById("imageToday").src = weatherImage;

            document.getElementById("highToday").innerHTML = myData.list["0"].temp.max + "<br><br>";
            document.getElementById("lowToday").innerHTML = myData.list["0"].temp.min + "<br><br>";
            document.getElementById("dayDescription").innerHTML = myData.list["0"].weather["0"].description + "<br><br>";

            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var day0 = new Date(myData.list["0"].dt * 1000);
            var day1 = new Date(myData.list["1"].dt * 1000);
            var day2 = new Date(myData.list["2"].dt * 1000);
            var day3 = new Date(myData.list["3"].dt * 1000);
            var day4 = new Date(myData.list["4"].dt * 1000);
            var day5 = new Date(myData.list["5"].dt * 1000);
            var day6 = new Date(myData.list["6"].dt * 1000);

            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            // Day1 of our forecast

            document.getElementById("r1c1").innerHTML = days[day1.getDay()];

            var weatherImage = "http://openweathermap.org/img/w/" + myData.list["1"].weather["0"].icon + ".png";

            document.getElementById("r1c2").src = weatherImage;

            document.getElementById("r1c3").innerHTML = myData.list["1"].temp.max + "&deg;C | ";
            document.getElementById("r1c4").innerHTML = myData.list["1"].temp.min + "&deg;C";

            // Day2 of our forecast

            document.getElementById("r2c1").innerHTML = days[day2.getDay()];

            var weatherImage = "http://openweathermap.org/img/w/" + myData.list["2"].weather["0"].icon + ".png";

            document.getElementById("r2c2").src = weatherImage;

            document.getElementById("r2c3").innerHTML = myData.list["2"].temp.max + "&deg;C | ";
            document.getElementById("r2c4").innerHTML = myData.list["2"].temp.min + "&deg;C";

            // Day3 of our forecast

            document.getElementById("r3c1").innerHTML = days[day3.getDay()];

            var weatherImage = "http://openweathermap.org/img/w/" + myData.list["3"].weather["0"].icon + ".png";

            document.getElementById("r3c2").src = weatherImage;

            document.getElementById("r3c3").innerHTML = myData.list["3"].temp.max + "&deg;C | ";
            document.getElementById("r3c4").innerHTML = myData.list["3"].temp.min + "&deg;C";


            console.log(myData);
        }


    };

    myRequest.send();
    //console.log("myRequest");


}
