/**
 * jQuery.deparam - The oposite of jQuery param. Creates an object of query string parameters.
 * 
 * NOTE: refactored to be used without jQuery
 *
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
*/
var deparam = deparam || function(uri) {
  if(uri === undefined){
    uri = window.location.search;
  }
  var queryString = {};
  uri.replace(
    /([^?=&]+)(=([^&#]*))?/g,
    function($0, $1, $2, $3) {
      queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
    }
  );
  return queryString;
};