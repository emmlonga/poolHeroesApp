// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    modalTitle: 'Attention!',
    calendar: {
    inputEl: '#demo-calendar-date-format',
    dateFormat: 'dd.mm.yyyy',
  }
, });
// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {});


//rawdata
var components = [];
var componentTransactions = [];
var engines = [];
var mountComponents = [];
var demountComponents = [];
var owners = [];

//Display stuff
var displayTransactionsArray = [];


// Now we need to run the code that will be executed only for About page.
// Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
        // Do something here for "about" page
    })
    /** App initialization**/
$(document).ready(function () {
    console.log("App is initialized");
    heartMin=88;
    o2Min=95;
    recovery=0;
    var seData = [0,0,90];
    
    setInterval(function() {
        a=fetchData();
        
        setTimeout(function(){
            if (a.length!=0){
            seData=a;
            saveData(a);
            }  
        },500);
        U1.wet=seData[0];
        if (seData[1]==1){
            mainView.router.loadPage('emergency.html');
        }
    },700);
    
     $(window).keypress(function(e) {
        if (e.which == 49) { //1Normalize
            recovery=1;
        } else if (e.which == 50) { //2Wet
            U1.wet=1;
            recovery=0;
        } 
          else if (e.which == 51) { //3Drown
            U1.wet=1;
            lowOx=0;
            recovery=0;
        } 
    });
    
});
// Using page callback for page (for "index" page in this case) (recommended way):
myApp.onPageInit('index', function (page) {
        // Do something here for "index" page
        console.log(page.name + ' initialized');
    })

myApp.onPageInit('emergency', function (page) {
        // Do something here for "index" page
        console.log(page.name + ' initialized');
    count = 60;
     setTimeout(function() {
        $(".icon-form-checkbox").click();
    },100);
    var refreshIntervalId = setInterval(function() {
        count=count-1;
        $("#countDown").html(count);
    },1000);
    $$('#countButton').on('click', function () {
        count=count+30;
    });
     $$('#pauseButton').on('click', function () {
        clearInterval(refreshIntervalId);
    });
    $(".iH > .emInfo").html(U1.heart+'<span style="font-size:14px"> bpm</span>');
    $(".iO > .emInfo").html(U1.oxygen+'<span style="font-size:14px"> %</span>');
    
    });


myApp.onPageInit('kidSummary', function (page) {
        // Do something here for "index" page
        console.log(page.name + ' initialized');
        lowHeart=1;
        lowOx=1;
     setInterval(function() {
         var randomnumber = Math.floor(Math.random() * (4)) + heartMin;
         U1.heart=randomnumber;
         $(".iH > .emInfo").html(randomnumber+'<span style="font-size:14px"> bpm</span>');
         isHeart(U1);
         if (heartMin>7 && lowHeart==0){
             heartMin=heartMin-7;
         } else if (heartMin<83 && lowHeart==2){
             heartMin=heartMin+7;
         };
        var randomnumber2 = Math.floor(Math.random() * (1)) + o2Min;
         U1.oxygen=randomnumber2;
         $(".iO > .emInfo").html(randomnumber2+'<span style="font-size:14px"> %</span>');
         isO2(U1);
         if (o2Min>50 && lowOx==0){
             o2Min=o2Min-2;
         } else if (o2Min<93 && lowOx==2){
             o2Min=o2Min+2;
         };
         isWet(U1);
         
         //Heart Failure low O2
         if (U1.oxygen<85 && recovery==0){
             lowHeart=0;
         }

         //Breathing Failure from Heart
         if (U1.heart<30 && recovery==0){
             lowOx=0;
         }
         
         if (recovery==1){
            lowHeart=2;
            lowOx=2;
            U1.wet=0;
         }
    },2000);
    })



function isWet(kid){
    if (kid.wet==1){
        $(".iW > .emInfo").html("Wet");
        $(".iW").attr("class", "infoBox shadow--4dp exclBox iW");  
        $(".wStatus > img").attr("src", "Images/raindrop.png");
        $(".wStatus > i").attr("class", "fa fa-exclamation-circle excl");
        $("#iWater .statusInfo").html(kid.name+" is in water");
        $("#iWater .statusInfo").attr("style","color:red");
    } else {
         $(".iW > .emInfo").html("Dry");
        $(".iW").attr("class", "infoBox shadow--2dp okBox iW");  
        $(".wStatus > img").attr("src", "Images/raindropCut.png");
        $(".wStatus > i").attr("class", "fa fa-check-circle ok");
        $("#iWater .statusInfo").html(kid.name+" is not in water");
        $("#iWater .statusInfo").attr("style","color:black");
    }
}


function isHeart(kid){
    if (kid.heart<60){
        $(".iH").attr("class", "infoBox shadow--4dp exclBox iH");  
        $(".hStatus > i").attr("class", "fa fa-exclamation-circle excl");
        $("#iHeart .statusInfo").html("Low heart rate");
        $("#iHeart .statusInfo").attr("style","color:red");
        if (kid.heart<50){
            mainView.router.loadPage('emergency.html');
        }
    } else if (kid.heart>110) {
        $("#iHeart .statusInfo").html("High heart rate");
    } else {
        $(".iH").attr("class", "infoBox shadow--2dp okBox iH");  
        $(".hStatus > i").attr("class", "fa fa-check-circle ok");
        $("#iHeart .statusInfo").html("Normal heart rate");
        $("#iHeart .statusInfo").attr("style","color:black");
    }
}

function isO2(kid){
    if (kid.oxygen<85){
        $(".iO").attr("class", "infoBox shadow--4dp exclBox iO");  
        $(".oStatus > i").attr("class", "fa fa-exclamation-circle excl");
        $("#iO2 .statusInfo").html("Low oxygen alert");
        $("#iO2 .statusInfo").attr("style","color:red");
    } else if (kid.oxygen<75) {
        $("#iO2 .statusInfo").html(kid.name+" is not breathing");
         $("#iO2 .statusInfo").attr("style","color:red");
        $(".iO").attr("class", "infoBox shadow--4dp exclBox iO");  
        $(".oStatus > i").attr("class", "fa fa-exclamation-circle excl");
    } else {
        $(".iO").attr("class", "infoBox shadow--2dp okBox iO");  
        $(".oStatus > i").attr("class", "fa fa-check-circle ok");
        $("#iO2 .statusInfo").html("Normal oxygen levels");
        $("#iO2 .statusInfo").attr("style","color:black");
    }
}

var Data = [];

$.ajax({
     url: "http://192.168.1.1",
     dataType: 'text',
     success: function(data) {
          var elements = $("<body>").html(data)[0].getElementsByTagName("a");
          for(var i = 0; i < elements.length; i++) {
               var theText = elements[i].firstChild.nodeValue;
              Data[i]=theText;
               // Do something here
          }
     }
});

function fetchData () {
    var Data2 = [];

    $.ajax({
         url: "/posted3.html",
         dataType: 'text',
         success: function(data) {
              var elements = $("<body>").html(data)[0].getElementsByTagName("a");
              for(var i = 0; i < elements.length; i++) {
                   var theText = elements[i].firstChild.nodeValue;
                  Data2[i]=parseInt(theText);
                   // Do something here
              }
         }
    });
    return Data2;
}

function saveData(inf){
    sData=inf;
}