angular.module("usersApp.controllers").controller("dataController", function  ($scope, $state, dataService, $filter) {
  $scope.user = {};

  $scope.show_menu = {
  	action: false
  };

  $scope.message = {
  	text: "",
  	show: false
  };

  $scope.sort_vars = {
  	col_name: "id",
  	direction: ""
  };

  
  $scope.allFavorite = function () {
    var selectedUsers = _.filter(dataService.users, {is_selected: true});
    return _.size(_.filter(selectedUsers, {favorite: true})) === _.size(selectedUsers);
  };

  $scope.favoriteSelected = function () {
   var favorite_var = !$scope.allFavorite();
   var selectedUsers = _.filter(dataService.users, {is_selected: true});
   _.forEach(selectedUsers, function (user) {
     user.favorite = favorite_var;
   });
  };

  $scope.pagination = {
    page: 1,
    page_count: 10,
    
    calcPageNumber: function () {
      var users_count = _.size($filter('filter')(dataService.users, $scope.search.search_input));
      var page_number = users_count % this.page_count === 0 ? users_count / this.page_count : (users_count / this.page_count) + 1;
      return parseInt(page_number);
    },
    
    paginationArray: function () {
      var array = [];
      for (var i = 1; i <= this.calcPageNumber(); i++) {
        array.push(i);
      }
      return array;
    },

    goLeft: function () {
      this.page = this.page === 1 ? this.page : this.page - 1; 
    },

    goRight: function () {
      this.page = this.page === this.calcPageNumber() ? this.page : this.page + 1; 
    }
  }


  $scope.search = {
    input: "",
    search_input: ""
  };

  $scope.filterUsers = function (users) {
    return $filter("limitTo") ($filter("filter")($filter('orderBy')(users, $scope.sort_vars.direction + $scope.sort_vars.col_name), $scope.search.search_input), $scope.pagination.page_count ,$scope.pagination.page_count * ($scope.pagination.page - 1));
  };

  $scope.noDate = function () {
    return _.isEmpty($scope.filterUsers(dataService.users));
  };


  $scope.getCityNameById =function (id) {
    var city = _.find(dataService.cities, {id: id});
    return city ? city.engName : "Not available"
  };

  $scope.updatedUser = function (user) {
    user.last_updated = new Date();
  };

  $scope.searchSubmit = function () {
    $scope.pagination.page = 1;
    $scope.search.search_input = $scope.search.input;
  };

  $scope.showMessage = function (text, type) {
  	$scope.message.show = true;
  	$scope.message.text = text;
  	$scope.message.type = type;
  };

  $scope.sort = function (key) {
  	if($scope.sort_vars.col_name === key) {
  		$scope.sort_vars.direction = $scope.sort_vars.direction === "" ? "-" : "";
  	} else {
  		$scope.sort_vars.col_name = key;
  		$scope.sort_vars.direction = "";
  	}
  };
  $scope.openCreatedit = function (user) {
    $state.go("home.create_edit");
    $scope.user = user ? _.cloneDeep(user) : null;
  };

  $scope.deleteConfirm = function (id) {
  	 $state.go("home.delete_confirm", {id: id});	
  };

  $scope.anySelected = function () {
  	return ! _.isEmpty(_.find(dataService.users, {is_selected: true}));
  };

  $scope.deleteSelectedUsers = function () {
  	var selected_user = _.filter(dataService.users, {is_selected: true});
  };
  $scope.closeMenu = function () {
		$scope.show_menu.action = false;
  };
  $(function () {
	$(document).click(function (e) {
		if ($(e.target).prop("id") !== "menu") {
			$scope.$apply($scope.closeMenu);
		}
	})
  })
});

