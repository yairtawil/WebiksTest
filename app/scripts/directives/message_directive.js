angular.module("usersApp.directives").directive("message", function ($timeout) {
	var message = {};

	message.restrict = "E";

	message.scope = {
		data: '='
	};

	message.template = "<div class=\"alert alert-{{data.type}} message_directive\">" +
						  "<strong>Success!</strong> {{data.text}}" +
						"</div>";

	message.link = function(scope,elem) {
		$(elem).hide();
		scope.$watch('data.show', function (newVal, oldVal) {
			if (newVal) {
				scope.data.show = false;
				$(elem).fadeIn();
				$timeout(function () {
					$(elem).fadeOut(1000);
				}, 4000);
			}
		});
	};
	return message;	
});