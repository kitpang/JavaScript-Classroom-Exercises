/* ------------------------------------------------------------------------------------

    THIS IS THE JAVASCRIPT CODE FOR THE DRAG AND DROP DEMO


------------------------------------------------------------------------------------ */

//Global Variables

var dAnswerId;

var dValueId;


var dClassId;


var dQuestionsId;

var allAnswers;

var myAnswersArray = [];
var answersInArray;

//Event Listeners

var startAgain = document.getElementById("checkR");

startAgain.addEventListener("click", resetAll, false);

function resetAll() {

    for (var i = 0; i < myAnswersArray.length; i++) {

        answersInArray = myAnswersArray[i];


        //console.log(answersInArray);



        //MN: this part here is to style the moved element back to the original
        allAnswers = document.getElementById(answersInArray);
        allAnswers.className = "theAnswers";
        //console.log(allAnswers);
        allAnswers.style.display = "block";


        //MN: this part targets the boxes where they orignally were and appends them onto it.
        var allAnswersIds = document.getElementById("r" + answersInArray);
        //console.log(allAnswersIds);
        allAnswersIds.appendChild(allAnswers);

    }



}

function dragStart(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
    //console.log("ev after setData: " + ev);


    dAnswerId = ev.target.getAttribute("id");
    //console.log("dAnswerId: " + dAnswerId);

    dValueId = "a" + ev.target.getAttribute("value");
    //console.log("dValueId: " + dValueId);

       dClassId = ev.target.getAttribute("class");
        console.log("dClassId: " + dClassId);

}

function dragOver(ev) {

    ev.preventDefault();
}

function dragDrop(ev) {

    ev.preventDefault();

    //This is to solve the over stacking issue

    if(!ev.target.getAttribute("ondrop")) {

        return false;
    }


    var data = ev.dataTransfer.getData("text");

    //console.log("ev after getData: " + ev.dataTransfer.getData("text"));

    //console.log("data: " + data);

    //MN: This for loop was key in debugging the "boxes sticking together" bug.
    for (var i = 0; i < ev.target.attributes.length; i++) {
        console.log("the event target: " + ev.target.attributes[i].value);
    }

    dQuestionsId = ev.target.getAttribute("id");

    //console.log("dQuestionsId: " + dQuestionsId + " dQuestionsId[0]: " + dQuestionsId[0]);


    //MN: This if statement exist because the boxes stuck on top of each other. Valid drag and drops are from left to right and right to left. The valid drag and drop key characteristics were used as the condition for the if statement.
/*    if (((ev.target.attributes[0].value[0]) == "a" && ev.target.attributes.length === 4) || ((ev.target.attributes[0].value[0]) == "r" && ev.target.attributes.length === 5)) */

    {

        ev.target.appendChild(document.getElementById(data));

       /* if (dQuestionsId[0] == "r") {*/

        if (ev.target.getAttribute("name") === "answers") {

            document.getElementById(dAnswerId).className = "theAnswers";

        } else if (dQuestionsId === dValueId) {

            document.getElementById(dAnswerId).className = "correct";

        } else if (dQuestionsId !== dValueId) {

            document.getElementById(dAnswerId).className = "incorrect";

        }

    }


    //To collect answers and push to the array

    myAnswersArray.push(dAnswerId);

    //console.log(myAnswersArray);
}









//This is the carousel jQuery code

$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 0
    });

    var clickEvent = false;
    $('#myCarousel').on('click', '.nav a', function () {
        clickEvent = true;
        $('.nav li').removeClass('active');
        $(this).parent().addClass('active');
    }).on('slid.bs.carousel', function (e) {
        if (!clickEvent) {
            var count = $('.nav').children().length - 1;
            var current = $('.nav li.active');
            current.removeClass('active').next().addClass('active');
            var id = parseInt(current.data('slide-to'));
            if (count == id) {
                $('.nav li').first().addClass('active');
            }
        }
        clickEvent = false;
    });
});
