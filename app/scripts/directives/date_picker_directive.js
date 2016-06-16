angular.module("usersApp.directives").directive("datePicker", function ($timeout) {
	var message = {};

	message.restrict = "A";

	message.scope = {
		date: '='
	};

	message.link = function(scope,elem) {
	  $( "#datepicker" ).datepicker({
	    dateFormat: 'dd/mm/yy',
	    onSelect: function (dateText) {
	      $timeout(function () {
	      	scope.date = dateText;
	      }, 0)
	    }
	  });
	};
	return message;	
});