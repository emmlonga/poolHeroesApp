//var root = 'https://jsonplaceholder.typicode.com';

//var root = 'https://jsonplaceholder.typicode.com/posts/';


function saveData (data){
    dummy = data;
}

function saveData2 (data){
    hey = data;
}

dummy2 = [
  {
    "$class": "org.brix.Component",
    "componentId": "129244889",
    "name": "Oil Filter",
    "owner": "resource:org.brix.Owner#andre",
    "batchNumber":"029304839",
    "date": "2018-01-16T20:47:01.756Z",
    "status": "CREATED"
  },
    {
    "$class": "org.brix.Component",
    "componentId": "129244889",
    "name": "Camshaft",
    "owner": "resource:org.brix.Owner#andre",
    "batchNumber":"029304839",
    "date": "2018-01-16T20:46:01.756Z",
    "status": "CREATED"
  }
]

var H1 = {
    id: "dunno",
    name: "CDTM",
    date: 1493060404000,
    action: "Installed",
};

var H2 = {
    id: "dunno",
    name: "MTU",
    date: 1493060404000,
    action: "Technician",
};

var H3 = {
    id: "dunno",
    name: "K&W",
    date: 1492110004000,
    action: "Distribution",
};

var H4 = {
    id: "dunno",
    name: "MTU",
    date: 1486062004000,
    action: "Manufacturing",
};

var CH = [H1,H2,H3,H4];

var C ={
    id: "1000029402017",
    time: 1515351544226,
    transactions: CH,
}


//Component B//

var H2b = {
    id: "dunno",
    name: "MTU",
    date: 1515610804000,
    action: "Technician",
};

var H3b = {
    id: "dunno",
    name: "K&W",
    date: 1513623604000,
    action: "Distribution",
};

var H4b = {
    id: "dunno",
    name: "MTU",
    date: 1511204404000,
    action: "Manufacturing",
};
var CHb = [H2b,H3b,H4b];

var Cb ={
    id: "1000029402017",
    time: 1515351544226,
    transactions: CHb,
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
function cHis (offer) {
    var hisEle = '<li class="item-content" style="padding-left:0px;"><div class="item-inner" style="padding-right: 0px;"><div class="listItem">                                                <div>'+offer.timestamp+'</div><div class="listJus">'+offer.action+'</div><div>'+toTitleCase(offer.toOwner)+'</div></div></div></li>'
    return hisEle;
}

function lHis (type) {
    $("#lUl").empty();
    for (i in type) {
        $(cHis(type[i])).appendTo("#lUl")
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

