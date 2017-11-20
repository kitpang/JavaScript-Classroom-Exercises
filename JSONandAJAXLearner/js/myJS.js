/*alert("hello");*/

/*================================================

THIS IS MY JS FILE FOR THE CARS DEMO

==================================================*/

//Creating even listeners
var mySurvey = document.getElementById("survey");
mySurvey.addEventListener("change", loadMyData, false);

var myManufacturer = document.getElementById("manufacturer");
myManufacturer.addEventListener("change", loadMyData, false);

function loadMyData() {

    var manufacturerStored = myManufacturer.options[myManufacturer.selectedIndex].value;

    console.log(manufacturerStored);

    var myRequest = new XMLHttpRequest();
    myRequest.open("GET", "https://raw.githubusercontent.com/kitpang/JavaScript-Classroom-Exercises/master/expensiveLuxuryCars.json", true);
    myRequest.send();

    console.log(myRequest);

    myRequest.onload = function () {

        if (myRequest.readyState === 4 && myRequest.status === 200) {

            var myData = JSON.parse(myRequest.responseText);

            console.log(myData);

            if (manufacturerStored === "") {

                function clearAll() {

                    var hideText = document.getElementsByClassName("data");

                    for (var i = 0; i < hideText.length; i++) {

                        hideText[i].innerHTML = "";
                    }
                }

                clearAll();

                document.getElementById("messageAlert").innerHTML = "Please, you must choose a car manufacturer to load data";


            } else {

                document.getElementById("manufacturerC").innerHTML = myData.data[manufacturerStored].manufacturer;

                document.getElementById("modelC").innerHTML = myData.data[manufacturerStored].model;

                document.getElementById("priceC").innerHTML = "£ " + myData.data[manufacturerStored].price;

                document.getElementById("descriptionC").innerHTML =
                    '<button data-toggle="modal" data-target="#modal1">Full Description click here</button.';

                document.getElementById("fullD").innerHTML = myData.data[manufacturerStored].description;

                document.getElementById("fullL").innerHTML = '<a href=' + myData.data[manufacturerStored].wiki + ' target="_blank">Click here to access Wikipedia for more information.</a>';

                document.getElementById("videoC").innerHTML = '<iframe width="auto" height="auto" src="' + myData.data[manufacturerStored].video + '" frameborder="0" allowfullscreen></iframe>';

                document.getElementById("overallC").innerHTML = myData.data[manufacturerStored].quality[0].rating;

                document.getElementById("mechanicalC").innerHTML = myData.data[manufacturerStored].quality[1].rating;

                document.getElementById("powertrainC").innerHTML = myData.data[manufacturerStored].quality[2].rating;

                document.getElementById("bodyC").innerHTML = myData.data[manufacturerStored].quality[3].rating;

                document.getElementById("interiorC").innerHTML = myData.data[manufacturerStored].quality[4].rating;

                document.getElementById("accessoriesC").innerHTML = myData.data[manufacturerStored].quality[5].rating;

                document.getElementById("imgC").innerHTML = '<img src="' + myData.data[manufacturerStored].img + '" frameborder="0" allowfullscreen></img>';

                document.getElementById("messageAlert").innerHTML = "";



                // Chart.js stuff

                var chartType = document.getElementById("survey").value;



                {
                    var chart = new CanvasJS.Chart("chartContainer", {

                        theme: "theme1",
                        backgroundColor: "transparent",


                        /*   title: {
                               text: ""
                           },*/

                        dataPointMaxWidth: 20,
                        axisX: {
                            labelFontColor: "white",
                            gridColor: "white",
                            lineColor: "white"
                        },

                        axisY: {
                            maximum: 5,
                            labelFontColor: "white",
                            gridColor: "white",
                            gridThickness: 1,
                            lineColor: "white"
                        },

                        animationEnabled: true,

                        data: [
                            {
                                // Change type to "doughnut", "line", "splineArea", etc.
                                indexLabelFontColor: "white",
                                type: chartType,
                                dataPoints: [
                                    {
                                        label: "Overall",
                                        y: myData.data[manufacturerStored].quality[0].rating
                                    },
                                    {
                                        label: "Mechanical",
                                        y: myData.data[manufacturerStored].quality[1].rating
                                    },
                                    {
                                        label: "Powertrain",
                                        y: myData.data[manufacturerStored].quality[2].rating
                                    },
                                    {
                                        label: "Body",
                                        y: myData.data[manufacturerStored].quality[3].rating
                                    },
                                    {
                                        label: "Interior",
                                        y: myData.data[manufacturerStored].quality[4].rating
                                    },
                                    {
                                        label: "Accessories",
                                        y: myData.data[manufacturerStored].quality[5].rating
                                    }

            ]
        }
        ]
                    });
                    chart.render();
                }


            }

            console.log(myData);

        } else {

            //MN: connected to the server but not the internet
            document.getElementById("messageAlert").innerHTML = "We successfully connected to the server but it returned an ERROR!";


        }

    }

};

myRequest.onerror = function () {

    //MN: connected to the internet but not the server.
    document.getElementById("messageAlert").innerHTML = "You are not connected online and we can't reach the server!";
}


myRequest.send();
