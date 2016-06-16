angular.module("usersApp.controllers").controller("deleteConfirmController", function  ($scope, $state, $stateParams, dataService) {
	
	var selectedUsers = _.filter(dataService.users, {is_selected: true});
	$scope.delete_user = _.find(dataService.users, {id: parseInt($stateParams.id)});

	if ((!$stateParams.id || !$scope.delete_user) && _.size(selectedUsers) === 0) {
		$state.go("home");
	}

	$scope.userFullName = function () {
		return $scope.delete_user ? $scope.delete_user.first_name + " " + $scope.delete_user.last_name : " " + _.size(selectedUsers) + " selected users";
	};

	$scope.deleteUsers = function () {
		var text = "";
		if ($scope.delete_user) {
			_.remove(dataService.users, function(user) {
			  return user.id === $scope.delete_user.id;
			})
			text = $scope.delete_user.first_name + " " + $scope.delete_user.last_name + " removed succesfully!";
	
		} else {
			_.remove(dataService.users, function(user) {
			  return !_.isEmpty(_.find(selectedUsers, {id: user.id}));
			});
			text = _.size(selectedUsers) + " selected users removed succesfully!";
		}
		if($scope.pagination.calcPageNumber() < $scope.pagination.page) {
			$scope.pagination.page = 1;
		}
		$scope.showMessage(text, "danger");
		$state.go("home");
	};

});

