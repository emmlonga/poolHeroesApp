var U1 = {
    name: "Sarah",
    age: 5,
    pic: "Images/Sarah.jpeg",
    heart:90,
    oxygen:94,
    wet:0,
};

var U2 = {
    name: "John",
    age: 5,
    pic: "Images/pexels-photo-415798.jpeg",
    heart:90,
    oxygen:94,
    wet:0,
};

var U3 = {
    name: "Millie",
    age: 5,
    pic: "Images/pexels-photo-356192.jpeg",
    heart:90,
    oxygen:94,
    wet:0,
};


var CH = [U1,U2,U3];

var C ={
    id: "1000029402017",
    time: 1515351544226,
    transactions: CH,
}

//JQuery functions//

//Com//
function convDate_old (project) {
    var date = new Date(project);
    var nd =  ('0'+ date.getDate()).slice(-2) + '/' + ('0'+(date.getMonth() + 1)).slice(-2) + '/' + ('0'+ date.getFullYear()).slice(-2);
    return nd
}

function convDate (date){
    var nd = date.split("T")[0].split("-")[2]+'/'+date.split("T")[0].split("-")[1]+'/'+date.split("T")[0].split("-")[0]+" "+date.split("T")[1].split(":")[0]+":"+date.split("T")[1].split(":")[1];
    return nd;
}

function cutName (s) {
    return s.split('#')[1];
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}




//New Component 3//
function userElement (user){
    var uEle = '<li class="swipeout"><div class="swipeout-content"><a href="courseSummary.html" class="item-content item-link"><div class="item-inner" style="background: none; padding-right: 16px"><div class="kidPhoto shadow--2dp"><img src="'+user.pic+'"></div><div class="kidName">'+user.name+'</div><div style="display: flex"><div class="statusCircle wStatus shadow--2dp"> <img src="Images/raindropCut.png"> <i class="fa fa-check-circle"></i> </div><div class="statusCircle hStatus shadow--2dp" style="margin: 0px 8px;">   <img src="Images/cardiogram.png">  <i class="fa fa-check-circle"></i>   </div> <div class="statusCircle oStatus shadow--2dp">   <img src="Images/oxygen-symbol.png">  <i class="fa fa-check-circle"></i>    </div>  </div>  </div>  </a>  </div>    <div class="swipeout-actions-right">  <a href="rateCourseView.html" class="swipeout-overswipe bg-deeppurple">Rate</a>  </div> </li>'
    return uEle;
}


function listUser (type) {
    $("#userList").empty();
    for (i in type) {
        $(userElement(type[i])).appendTo("#userList")
    }
}


//Component2 - Maintenance//

function callbackOk () {
    demountComponent(engines[0].missingComponents[0],engines[0].engineId);
    console.log("okk");
    $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img style="height: 110px" src="Images/Ripple2.svg"></div></div>');
    setTimeout(function() {
    $("#removeMe").remove();
    $('.blueCard .accordion-list').remove();
    $('.mTask').html('No maintenance task available');
    $("#running").html(" Idle");
        setTimeout(function() {
                $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div class="cStatus maStatus" style="font-size:18px;margin-top: 17px"><i class="material-icons" style="font-size: 20px;position: relative;top:3px;">warning</i><b id="maAlert"> Missing Component Detected</b></div><div class="cStatus maStatus" id="maMessage" style="margin-bottom: 14px">Please install Air Filter<span></span></div></div>');
                c2status=1;
                setTimeout(function() {
                    mountCall();
                }, 4000); 
                }, 1000)
       }, 12000);
}

function callbackCancel () {
    c1status=0;
    console.log("no ok");
}


function componentRemoved (engine) {
    if (engine.missingComponents.length==2 && c1status==0){
        c1status=1;
        $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img style="height: 110px" src="Images/Ripple2.svg"></div></div>');
        setTimeout(function() {
            $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img class="attIcon" style="height: 110px" src="Images/minus.svg"></div></div>');
            setTimeout(function() {
            $('.attIcon').toggleClass('move');
                setTimeout(function() {
                $(".maintCard div").html(displayRemoveConfirm());
                $('.showMe').toggleClass('move');
                }, 500);
            }, 500);
        }, 1500);
    }
}

//Component2b - Adding a component//
function callbackOk2 () {
    mountComponent(engines[0].newComponents[0],engines[0].engineId);
    console.log("ok");
    $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img style="height: 110px" src="Images/Ripple2.svg"></div></div>');
     setTimeout(function() {
     $("#courseList").prepend(createOil());
    $("#running").html(" Running");
        setTimeout(function() {
                $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img class="attIcon" style="height: 110px" src="Images/check.svg"></div></div>');
                setTimeout(function() {
                    $('.attIcon').toggleClass('move');
                    $('.maintCard').toggleClass('move');
                    setTimeout(function() {
                        $(".maintCard div").html(displaySuccess());
                        $('.showMe').toggleClass('move');
                        }, 500);
                    }, 500);
                }, 1000)
       }, 12000);
    
}

function callbackCancel2 () {
    c2status=0;
    console.log("no ok");
}

function componentAdded (engine) {
    if (engine.newComponents.length==2 && c3status==0){
        c3status=1;
        $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img style="height: 110px" src="Images/Ripple2.svg"></div></div>');
        setTimeout(function() {
            $(".maintCard div").html('<div style="padding: 0px 8px; color: white;"><div style="text-align: center"><img class="attIcon" style="height: 110px" src="Images/plus.svg"></div></div>');
            setTimeout(function() {
            $('.attIcon').toggleClass('move');
                setTimeout(function() {
                $(".maintCard div").html(displayAddConfirm());
                $('.showMe').toggleClass('move');
                }, 500);
            }, 500);
        }, 1500);
    }
}



//Component3//
function createHis (offer) {
    var hisEle = '<li class="item-content" style="padding-left:0px;"><div class="item-inner" style="padding-right: 0px;"><div class="listItem">                                                <div>'+convDate_old(offer.date)+'</div><div class="listJus">'+offer.action+'</div><div>'+offer.name+'</div></div></div></li>'
    return hisEle;
}

function listHis (type) {
    $("#lUl").empty();
    for (i in type.transactions) {
        $(createHis(type.transactions[i])).appendTo("#lUl")
    }
}

//Engine 3//
function createHis (offer) {
    var hisEle = '<li class="item-content" style="padding-left:0px;"><div class="item-inner" style="padding-right: 0px;"><div class="listItem">                                                <div>'+convDate_old(offer.date)+'</div><div class="listJus">'+offer.action+'</div><div>'+offer.name+'</div></div></div></li>'
    return hisEle;
}

function listHis (type) {
    $("#eUl").empty();
    for (i in type.transactions) {
        $(createHis(type.transactions[i])).appendTo("#lUl")
    }
}


function createOil (){
    var Oil = '<li class="swipeout"><div class="swipeout-content"><a onclick="mainView.router.reloadPage(\'componentb_2.html\')" class="item-content item-link" style="background-image: none; padding-left: 0px"><div class="item-inner"  style="background-image: none; padding: 0px 8px"><div class="item-title-row"><div class="item-after" style="margin-left: 0px">26/01/18</div></div><div class="item-subtitle"><b>Oil Filter</b></div>  <div class="item-title-row"><div style="text-align: right; justify-content: flex-end" class="item-after">HRMW-580</div><div class="item-after">019624401FB2</div></div></div></a></div></li>'
    return Oil;
}

