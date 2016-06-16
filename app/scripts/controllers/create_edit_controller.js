angular.module("usersApp.controllers").controller("createEditController", function  ($scope, $state, dataService) {

	$scope.validations = {
		user: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			zip_code: ""
		}
	};
	$scope.validationsMessage = function () {
		var message = "";
		_.forEach($scope.validations.user, function (field) {
			if(!message) message = field;
		});
		return message;
	};

	$scope.validationsCheck = function (user, key) {
		if(!user) user = {};
		if(!user[key]) {
			$scope.validations.user[key] = key + " is required";
			return true;
		}
		return false;
	};

	$scope.rmValidations = function (key) {
		$scope.validations.user[key] = "";
	};

	$scope.existingEmail = function (user_email, user_id) {
		var same_email_user = _.find(dataService.users, {email: user_email})
		var existing = !_.isEmpty(same_email_user) && same_email_user.id !== user_id;

		if (existing) {
			$scope.validations.user.email = "Email already exist";
		}

		return existing; 
	};

	$scope.submitCreateEdit = function (user) {
		var problem = false;
		_.forEach($scope.validations.user, function (val, key) {
			if (!problem) {
				problem = $scope.validationsCheck(user, key);
				if(!problem && key === "email") problem = $scope.existingEmail(user.email, user.id);
			}
		});

		if (problem) return;

		var text = type = ""
		$scope.updatedUser(user);

		if (user.id) {
			selected_user = _.find(dataService.users, {id: user.id});
			selected_user.email = user.email;
			selected_user.first_name = user.first_name;
			selected_user.last_name = user.last_name;
			selected_user.phone = user.phone;
			selected_user.city_id = user.city_id;
			selected_user.birthday = user.birthday;
			
			$scope.updatedUser(selected_user);
			text = selected_user.first_name + " " + selected_user.last_name + " updated succesfully!";
			type = "info";
		} else {
			var maxId = _.maxBy(dataService.users, "id").id;
			user.id = maxId + 1;
			$scope.updatedUser(user);
			dataService.users.push(user);
			text = user.first_name + " " + user.last_name + " added succesfully!";
			type = "success";	
		}

		$scope.showMessage(text, type);
		$state.go("home");
	};

});