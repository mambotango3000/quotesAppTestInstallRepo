'use strict';

quotesApp.factory('$exceptionHandler', function() {
   return function (exception) {
       console.log("exception handled: " + exception.message);
   };
});