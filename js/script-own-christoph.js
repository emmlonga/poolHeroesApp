//DECLARATION OF VARIABLES
var courseNumber;
var $$ = Dom7;
var i;
var userFeedback;
var tagCollection;
var qualityName;
var qualityNumber;
var courseStatus;
var courseStatusName;
var tags = [];
var finalQuality;
//var feedLength;
var difficultyName;
var difficultyNumber;
var takeAgain;
var individualFeedback = {};





//FRAMEWORK7 STUFF
var myApp = new Framework7({
    modalTitle: 'Attention!'
});
var mainView = myApp.addView('.view-main', {});
$$('.chip-delete').on('click', function (e) {
    e.preventDefault();
    var chip = $$(this).parents('.chip');
    myApp.confirm('Do you want to delete this tiny demo Chip?', function () {
        chip.remove();
    });
});


//INITIALISING OF RATING PAGE, NEEDS INFORMATION OF COURSE NAME
myApp.onPageInit('rateCourseView', function (page, currentCourse) {
    // Do something here for "index" page


    if (typeof currentCourse == 'undefined') {
        currentCourse = MW2033;
    }

    console.log(page.name + ' initialized');
});



//INITIALIZING COURSEREVIEWNEW PAGE, NEEDS INFORMATION OF COURSE NAME, TOO//
myApp.onPageInit('courseReviewNew', function (page, currentCourse) {

    if (typeof currentCourse == 'undefined') {
        currentCourse = MW2033;
    }

    var feedLength = currentCourse.feedback.length //courses[0].feedback.length

    if (feedLength == 0) {
        return;
        //Put in solution for no feedback yet!
    }
    //FINDING THE CONTROL VARIABLE TO ADDRESS THE CORRECT COURSE, SAME AS ABOVE

    $("#pageTitle").html(currentCourse.name);

    var qualityCalc = 0;
    var difficultyCalc = 0;
    var statusCalc = 0;
    var recommendationCalc = 0;
    var examCalc = [];
    var positiveCalc = [];
    var negativeCalc = [];
    var recYes = 0;
    var recNo = 0;
    //Loop to find all selected tags, and to sum up all rating conditions (quality, difficulty, etc.)
    for (var i = 0; i < feedLength; i++) {
        qualityCalc += parseInt(currentCourse.feedback[i].quality);
        difficultyCalc += parseInt(currentCourse.feedback[i].difficulty.number);
        statusCalc += parseInt(currentCourse.feedback[i].status.number);
        if (currentCourse.feedback[i].recommendation == 1) {
            recYes += 1;
        };
        if (currentCourse.feedback[i].recommendation == -1) {
            recNo += 1;
        };
        recommendationCalc += parseInt(currentCourse.feedback[i].recommendation);
        //get amount of available exam tags
        for (var k = 0; k < currentCourse.feedback[0].exam.length; k++) {
            examCalc.push(0);
        };
        //get amount of selected exam tags
        for (var j = 0; j < currentCourse.feedback[0].exam.length; j++) {
            if (currentCourse.feedback[i].exam[j].status == true) examCalc[j] = examCalc[j] + 1;
        };
        //get amount of available positive tags
        for (var k = 0; k < currentCourse.feedback[0].positive.length; k++) {
            positiveCalc.push(0);
        };
        //get amount of selected positive tags
        for (var j = 0; j < currentCourse.feedback[0].positive.length; j++) {
            if (currentCourse.feedback[i].positive[j].status == true) positiveCalc[j] = positiveCalc[j] + 1;
        };
        //get amount of available negative tags
        for (var k = 0; k < currentCourse.feedback[0].negative.length; k++) {
            negativeCalc.push(0);
        };
        //get amount of selected negative tags
        for (var j = 0; j < currentCourse.feedback[0].negative.length; j++) {
            if (currentCourse.feedback[i].negative[j].status == true) negativeCalc[j] = negativeCalc[j] + 1;
        }
    }
    //find the most often selected tag by finding the highest number in the array, getting its coordinate and by that getting
    //the name of the tag
    //MOST OFTEN SELECTED EXAM TAG
    var examHighNumber = Math.max(...examCalc);
    var examHighCoordinates = examCalc.indexOf(examHighNumber);
    var examHighName = currentCourse.feedback[0].exam[examHighCoordinates].name;
    $("#examHigh1").empty();
    $('#examHigh1').text(examHighNumber);
    $("#examHigh2").empty();
    $('#examHigh2').text(examHighName);
    console.log(examHighName);
    //MOST OFTEN SELECTED POSITIVE TAG
    var positiveHighNumber = Math.max(...positiveCalc);
    var positiveHighCoordinates = positiveCalc.indexOf(positiveHighNumber);
    var positiveHighName = currentCourse.feedback[0].positive[positiveHighCoordinates].name;
    $("#positiveHigh1").empty();
    $('#positiveHigh1').html(positiveHighNumber);
    $("#positiveHigh2").empty();
    $('#positiveHigh2').html(positiveHighName);
    console.log(positiveHighName);
    //MOST OFTEN SELECTED NEGATIVE TAG
    var negativeHighNumber = Math.max(...negativeCalc);
    var negativeHighCoordinates = negativeCalc.indexOf(negativeHighNumber);
    var negativeHighName = currentCourse.feedback[0].negative[negativeHighCoordinates].name;
    $("#negativeHigh1").empty();
    $('#negativeHigh1').html(negativeHighNumber);
    $("#negativeHigh2").empty();
    $('#negativeHigh2').html(negativeHighName);
    console.log(negativeHighName);
    //Get final divisor, so an average can be calculated. final divisor is array.lenght - 1 as the first entry of the
    //feedback array serves as template

    //if no entry exists, later here will be the entry to decide what to do
    var finalDivisor = feedLength;
    if (finalDivisor == 0) {
        finalDivisor = 1;
    }
    //final quality calculation to display it on the screen
    finalQuality = (((qualityCalc / finalDivisor) / 4) * 100);
    //append progress-bar, DOES NOT WORK YET
    $("#courseQuality").empty();
    $$('#courseQuality').append('<div data-progress="' + finalQuality + '" class="progressbar color-green"></div>');
    $("#courseQualityPercentage").empty();
    $("#courseQualityPercentage").html(finalQuality + "%");
    /*$('#courseQuality').html(finalQuality);*/
    //this might not be necessary, the scale for rating will be 1 to 5 if kept like this, without "+1" it will be 0 to 4
    currentCourse.rating = (qualityCalc / feedLength) + 1;
    //calculate the difficulty and add the respective description
    var finalDifficultyNumber = Math.round(difficultyCalc / finalDivisor)
    $('#courseDifficultyNumber').html(finalDifficultyNumber + 1);
    if (finalDifficultyNumber == 0) {
        $('#courseDifficultyName').html("easy");
    };
    if (finalDifficultyNumber == 1) {
        $('#courseDifficultyName').html("manageable");
    };
    if (finalDifficultyNumber == 2) {
        $('#courseDifficultyName').html("medium");
    };
    if (finalDifficultyNumber == 3) {
        $('#courseDifficultyName').html("difficult");
    };
    if (finalDifficultyNumber == 4) {
        $('#courseDifficultyName').html("tough");
    };
    //recommendation scale is yes:1, unsure:0, no:-1, if only unsure and no was selected, if condition needs to be tested
    var finalRecommendation = (recYes / recYes + recNo) * 100;
    if (isNaN(finalRecommendation)) {
        finalRecommendation = 0;
    }
    $('#courseRecommendation').html(finalRecommendation + "%");
    //calculation of dropout, scale is successful:0, enrolled:0, dropped out:1
    var finalStatus = (statusCalc / finalDivisor) * 100;
    $('#courseStatus').html(finalStatus + "%");

    listReviewCards(feedLength);
    console.log(page.name + ' initialized');
});
//LOAD IN CARDS//
function listReviewCards(test) {
    //Clear UserComment section
    $("#userFeedback").empty()
        //loop from first to last entry of courses feedback length. NEEDS ADJUSTMENT WHEN FINISHED, i=1, because first feedback ist TEMPLATE
        //-1 Needs to be DELETED AS SOON AS COURSES VARIABLE DOES NOT CARRY ANY FEEDBACK TEMPLATE ANYMORE!!!!!
        //feedLength = courses[0].feedback.length
    for (i = 0; i < test; i++) {
        console.log(currentCourse.feedback.length);
        $$('#userFeedback').append(createFeedbackCardStartUp(i));
        tagCollection = "";
    };
};
//ADD QUALITY TO PROGRESS BAR, IS NOT WORKING YET
function createQualityProgressStartUp() {
    '<div data-progress="' + finalQuality + '" class="progressbar color-green"></div>'
}
//CARD INFRASTRUCTURE, WHEN COURSE REVIEW PAGE IS OPENED, THOSE CARD WILL BE ADDED//
function createFeedbackCardStartUp() {
    //load the card with the repective information
    return '<div class="card courseOverview"><div class="card-header"><a href="#" class="color-black">' + user.name + '</a><div>rated: ' + currentCourse.feedback[i].quality / 4 * 100 + '%</div></div><div class="card-content"><div class="card-content-inner"><div class="content-block"><div class="row no-gutter"><div class="col-90 "><div class="list-block"><ul><div class="item-content"><div class="item-input writtenFeedback"><textarea class="font-size" disabled>' + currentCourse.feedback[i].comment + '</textarea></div></div></ul></div></div><div class="col-5"><div class="upDownVote"><p id="up' + i + '" class="buttons-row voting up" onclick="voteUp(' + i + ')"><a href="#" class="button button-raised color-green fa fa-chevron-up  voting-up"></a></p><p id="down' + i + '" class="buttons-row voting" onclick="voteDown(' + i + ')"><a href="#" class="button button-raised color-red fa fa-chevron-down voting-down"></a></p><p id="voteNumber' + i + '" class="buttons-row number-margin count">5</p></div></div></div></div></div><div class="commentPadding">' + tagsAddStartUp(i) + '</div></div><div class="card-footer"> <a href="#" class="color-gray">Report...</a>' + currentCourse.feedback[i].date + '</div></div>'
};
//TAG INFRASTRUCTURE AT STARTUP//
function tagsAddStartUp() {

    //load all available tags for the comment
    for (var j = 0; j < currentCourse.feedback[i].exam.length; j++) {
        if (currentCourse.feedback[i].exam[j].status == true) {
            tagCollection += ('<div class="chip listView"><div class="chip-media bg-blue"><i class="fa fa-book"></i></div><div class="chip-label"><a href="#" class="link color-black">' + currentCourse.feedback[i].exam[j].name + '</a></div></div>');
        }
    };
    for (var j = 0; j < currentCourse.feedback[i].positive.length; j++) {
        if (currentCourse.feedback[i].positive[j].status == true) {
            tagCollection += ('<div class="chip listView"><div class="chip-media bg-green"><i class="fa fa-plus"></i></div><div class="chip-label"><a href="#" class="link color-black">' + currentCourse.feedback[i].positive[j].name + '</a></div></div>');
        }
    };
    for (var j = 0; j < currentCourse.feedback[i].negative.length; j++) {
        if (currentCourse.feedback[i].negative[j].status == true) {
            tagCollection += ('<div class="chip listView"><div class="chip-media bg-red"><i class="fa fa-minus"></i></div><div class="chip-label"><a href="#" class="link color-black">' + currentCourse.feedback[i].negative[j].name + '</a></div></div>');
        }
    }
    if (typeof tagCollection == 'undefined') {
        return ""
    }
    return tagCollection;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RATECOURSEVIEW
//SUBMIT BUTTON RATECOURSEREVIEW/
//$$('.confirm-ok').on('click', function () {
function submit() {
    myApp.confirm('Do you want to submit your rating?', function () {
        //REBECCA: hier schreibe ich die information vom rating in das test[0] file. danach wird es in das array feedback "unshifted".
        //die variablen werden später nicht zurückgesetzt. das schaue ich mir jetzt an.

        if (typeof currentCourse == 'undefined') {
            currentCourse = MW2033;
        }





        individualFeedback = {
            date: "DD-MM-JJJJ MM:HH",
            quality: 2,
            difficulty: {
                term: "Medium",
                number: 2
            },
            status: {
                term: "Successful",
                number: 0
            },
            recommendation: 1,
            exam: [{
                name: "Difficult",
                status: false,
                    }, {
                name: "Multiple-Choice",
                status: false,
                    }, {
                name: "Manageable",
                status: false,
                    }],
            positive: [{
                    name: "Interesting",
                    status: false,
                    }, {
                    name: "Useful",
                    status: false,
                    }, {
                    name: "Entertaining",
                    status: false,
                    }
                ],
            negative: [{
                    name: "Demanding",
                    status: false,
                    }, {
                    name: "Time-Consuming",
                    status: false,
                    }, {
                    name: "Boring",
                    status: false,
                    }
                ],

            comment: "Nothing here yet"


        };




        //test = courses[len].feedback;
        if (typeof difficultyName != 'undefined') {
            individualFeedback.difficulty.term = difficultyName;
        };
        if (typeof difficultyNumber != 'undefined') {
            individualFeedback.difficulty.number = difficultyNumber;
        };
        if (typeof qualityNumber != 'undefined') {
            individualFeedback.quality = qualityNumber;
        };
        if (typeof courseStatusName != 'undefined') {
            individualFeedback.status.term = courseStatusName;
        };
        if (typeof courseStatus != 'undefined') {
            individualFeedback.status.number = courseStatus;
            if (courseStatus == -1) {
                currentCourse.progress = -1;
            } else if (courseStatus == 0) {
                currentCourse.progress = 2;
            } else {
                currentCourse.progress = 1;
            };
        };
        if (typeof takeAgain != 'undefined') {
            individualFeedback.recommendation = takeAgain;
        };
        var newDate = new Date();
        day = newDate.getDate();
        month = newDate.getMonth();
        month = month + 1;
        if ((String(day)).length == 1)
            day = '0' + day;
        if ((String(month)).length == 1)
            month = '0' + month;

        individualFeedback.date  = day + '.' + month + '.' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes();

        individualFeedback.comment = document.getElementById("rateComment").value;
        if (typeof tags != 'undefined') {
            for (var i = 0; i < tags.length; i++) {
                for (var j = 0; j < individualFeedback.exam.length; j++) {
                    var nameKey = individualFeedback.exam[j].name;
                    if (tags[i] == nameKey) {
                        individualFeedback.exam[j].status = true;
                    }
                };
                for (var j = 0; j < individualFeedback.positive.length; j++) {
                    var nameKey = individualFeedback.positive[j].name;
                    if (tags[i] == nameKey) {
                        individualFeedback.positive[j].status = true;
                    }
                };
                for (var j = 0; j < individualFeedback.negative.length; j++) {
                    var nameKey = individualFeedback.negative[j].name;
                    if (tags[i] == nameKey) {
                        individualFeedback.negative[j].status = true;
                    }
                };
            }
        };



        currentCourse.feedback.unshift(individualFeedback);
        tags = [];
    });
};

//GET QUALITY OF QUALITY-SLIDER
function getQuality() {
    if (document.getElementById("qualityRange").value == "0") {
        qualityName = "very bad";
        qualityNumber = "0";
    } else if (document.getElementById("qualityRange").value == "1") {
        qualityName = "bad";
        qualityNumber = "1";
    } else if (document.getElementById("qualityRange").value == "2") {
        qualityName = "average";
        qualityNumber = "2";
    } else if (document.getElementById("qualityRange").value == "3") {
        qualityName = "good";
        qualityNumber = "3";
    } else if (document.getElementById("qualityRange").value == "4") {
        qualityName = "very good";
        qualityNumber = "4";
    }
};
//GET QUALITY OF DIFFICULTY-SLIDER
function getDifficulty() {
    if (document.getElementById("difficultyRange").value == "0") {
        difficultyName = "easy";
        difficultyNumber = "0";
    } else if (document.getElementById("difficultyRange").value == "1") {
        difficultyName = "manageable";
        difficultyNumber = "1";
    } else if (document.getElementById("difficultyRange").value == "2") {
        difficultyName = "medium";
        difficultyNumber = "2";
    } else if (document.getElementById("difficultyRange").value == "3") {
        difficultyName = "difficult";
        difficultyNumber = "3";
    } else if (document.getElementById("difficultyRange").value == "4") {
        difficultyName = "tough";
        difficultyNumber = "4";
    }
};


function buttonChange(button, question) {

    if (question == 1) {
        if (button == 0) {
            $('#rateSuccess').addClass("button-fill");
            $('#rateEnrolled').removeClass("button-fill");
            $('#rateDropped').removeClass("button-fill");
            courseStatus = "0";
            courseStatusName = "Successful";
            console.log(courseStatus);

        } else if (button == 1) {
            $('#rateSuccess').removeClass("button-fill");
            $('#rateEnrolled').addClass("button-fill");
            $('#rateDropped').removeClass("button-fill");
            courseStatus = "0";
            courseStatusName = "Enrolled";
            console.log(courseStatus);

        } else if (button == 2) {
            $('#rateSuccess').removeClass("button-fill");
            $('#rateEnrolled').removeClass("button-fill");
            $('#rateDropped').addClass("button-fill");
            courseStatus = "1";
            courseStatusName = "Dropped";
            console.log(courseStatus);
        };

    } else {
        if (button == 0) {
            $('#rateYes').addClass("button-fill");
            $('#rateUnsure').removeClass("button-fill");
            $('#rateNo').removeClass("button-fill");
            takeAgain = "1";
            console.log(takeAgain);

        } else if (button == 1) {
            $('#rateYes').removeClass("button-fill");
            $('#rateUnsure').addClass("button-fill");
            $('#rateNo').removeClass("button-fill");
            takeAgain = "0";
            console.log(takeAgain);

        } else if (button == 2) {
            $('#rateYes').removeClass("button-fill");
            $('#rateUnsure').removeClass("button-fill");
            $('#rateNo').addClass("button-fill");
            takeAgain = "-1";
            console.log(takeAgain);
        };

    }
}


//TAG SELECTED FUNCTION
function changeClass(id) {
    if ($('#' + id).hasClass('selected')) {
        {
            $('#' + id).removeClass('selected');
            var i = tags.indexOf(id)
            tags.splice(i, 1);
            console.log(tags);
        }
    } else {
        {
            $('#' + id).addClass('selected');
            tags.push(id);
            console.log(tags)
        }
    }
};

function voteUp(cardNumber) {
    $('#up' + cardNumber).addClass("disabled");
    var voteNumber = parseInt(document.getElementById("voteNumber" + cardNumber).innerHTML);
    voteNumber += 1;
    document.getElementById("voteNumber" + cardNumber).innerHTML = voteNumber;
}

function voteDown(cardNumber) {
    $('#down' + cardNumber).addClass("disabled");
    var voteNumber = parseInt(document.getElementById("voteNumber" + cardNumber).innerHTML);
    voteNumber -= 1;
    document.getElementById("voteNumber" + cardNumber).innerHTML = voteNumber;

}


//NOT NEEDED, BUT KEPT, IF THE NEED ARISES
/*
function createFeedbackCard() {
    
    return '<div class="card courseOverview"><div class="card-header"><a href="#" class="color-black">' + user.name + '</a><div>rated: ' + test[0].quality / 4 * 100 + '%</div></div><div class="card-content"><div class="card-content-inner"><div class="content-block"><div class="row no-gutter"><div class="col-90 "><div class="list-block"><ul><div class="item-content"><div class="item-input writtenFeedback"><textarea class="font-size">' + test[0].comment + '</textarea></div></div></ul></div></div><div class="col-5"><div class="upDownVote"><p class="buttons-row voting up"><a href="#" class="button button-raised color-green fa fa-chevron-up voting-up"></a></p><p class="buttons-row voting"><a href="#" class="button button-raised color-red fa fa-chevron-down voting-down"></a></p><p class="buttons-row number-margin count">0</p></div></div></div></div></div><div class="commentPadding">' + tagsAdd() + '</div></div><div class="card-footer"> <a href="#" class="color-gray">Report...</a>' + test[0].date + '</div></div>'
};


function tagsAdd() {
    for (var i = 0; i < test[0].exam.length; i++) {
        if (test[0].exam[i].status == true) {
            tagCollection = tagCollection + ('<div class="chip listView"><div class="chip-media bg-blue"><i class="fa fa-book"></i></div><div class="chip-label"><a href="#" class="link color-black">' + test[0].exam[i].name + '</a></div></div>');
        }
    };
    for (var i = 0; i < test[0].positive.length; i++) {
        if (test[0].positive[i].status == true) {
            tagCollection = tagCollection + ('<div class="chip listView"><div class="chip-media bg-green"><i class="fa fa-plus"></i></div><div class="chip-label"><a href="#" class="link color-black">' + test[0].positive[i].name + '</a></div></div>');
        }
    };
    for (var i = 0; i < test[0].negative.length; i++) {
        if (test[0].negative[i].status == true) {
            tagCollection = tagCollection + ('<div class="chip listView"><div class="chip-media bg-red"><i class="fa fa-minus"></i></div><div class="chip-label"><a href="#" class="link color-black">' + test[0].negative[i].name + '</a></div></div>');
        }
    }
    return tagCollection;
};

//COURSE STATUS: CHECKS, WHAT BUTTON IS CLICKED//
/*$('#rateSuccess').click(function () {
    $('#rateSuccess').addClass("button-fill");
    $('#rateEnrolled').removeClass("button-fill");
    $('#rateDropped').removeClass("button-fill");
    courseStatus = "0";
    courseStatusName = "Successful";
    console.log(courseStatus);
});
$('#rateEnrolled').click(function () {
    $('#rateSuccess').removeClass("button-fill");
    $('#rateEnrolled').addClass("button-fill");
    $('#rateDropped').removeClass("button-fill");
    courseStatus = "0";
    courseStatusName = "Enrolled";
    console.log(courseStatus);
});
$('#rateDropped').click(function () {
    $('#rateSuccess').removeClass("button-fill");
    $('#rateEnrolled').removeClass("button-fill");
    $('#rateDropped').addClass("button-fill");
    courseStatus = "1";
    courseStatusName = "Dropped";
    console.log(courseStatus);
});
//TAKE AGAIN LECTURE, CHECKS INPUT//
$('#rateYes').click(function () {
    $('#rateYes').addClass("button-fill");
    $('#rateUnsure').removeClass("button-fill");
    $('#rateNo').removeClass("button-fill");
    takeAgain = "1";
    console.log(takeAgain);
});
$('#rateUnsure').click(function () {
    $('#rateYes').removeClass("button-fill");
    $('#rateUnsure').addClass("button-fill");
    $('#rateNo').removeClass("button-fill");
    takeAgain = "0";
    console.log(takeAgain);
});
$('#rateNo').click(function () {
    $('#rateYes').removeClass("button-fill");
    $('#rateUnsure').removeClass("button-fill");
    $('#rateNo').addClass("button-fill");
    takeAgain = "-1";
    console.log(takeAgain);
});
//UP/DOWNVOTE FUNCTION
/*$(function () {
    $(".voting").click(function () {
        var count = parseInt($("~ .buttons-row.number-margin.count", this).text());
        
        if ($(this).hasClass("up")) {
            var count = count + 1;
            $("~ .count", this).text(count);
            $(this).addClass('disabled');
        } else {
            var count = count - 1;
            $("~ .count", this).text(count);
            $(this).addClass('disabled');
        }
    });
});
*/