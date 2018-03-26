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
});
// Using page callback for page (for "index" page in this case) (recommended way):
myApp.onPageInit('index', function (page) {
        // Do something here for "index" page
        console.log(page.name + ' initialized');
    })

myApp.onPageInit('emergency', function (page) {
        // Do something here for "index" page
        console.log(page.name + ' initialized');
     setTimeout(function() {
        $(".icon-form-checkbox").click();
    },100);
    })
