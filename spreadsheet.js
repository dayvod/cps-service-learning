var spreadsheetApp = angular.module('spreadsheetApp', ['angular.filter'])
    .controller('spreadsheetCtrl', function ($scope, $http) {
        /* the url of google spreadshehet json file */
        var url = "https://spreadsheets.google.com/feeds/list/1Z7QEIJKl_joc1Z96H1IlyJiRMGWOUiJz6iukb30pwrI/od6/public/values?alt=json";
        /* Grabs the JSON file from google */
        $http.get(url)
            .success(function (result, status) {
                var sheet1 = result.feed.entry;
                $scope.googleSpreadsheetJSON = [];

                for (var index = 0; index < sheet1.length; index++) {
                    $scope.googleSpreadsheetJSON[index] = {
                        item: sheet1[index].gsx$item.$t,
                        firstname: sheet1[index].gsx$firstname.$t,
                        lastname: sheet1[index].gsx$lastname.$t,
                        organization: sheet1[index].gsx$organization.$t,
                        address: sheet1[index].gsx$address.$t,
                        city: sheet1[index].gsx$city.$t,
                        state: sheet1[index].gsx$state.$t,
                        zip: sheet1[index].gsx$zipcode.$t,
                        phone: sheet1[index].gsx$phone.$t,
                        email: sheet1[index].gsx$email.$t
                    };
                }
                $scope.select = {
                    value: $scope.googleSpreadsheetJSON.length
                };
                $scope.filter = {};
                $scope.getCategories = function () {
                    return ($scope.googleSpreadsheetJSON || []).map(function (el) {
                        return el.organization;
                    }).filter(function (el, index, arr) {
                        return arr.indexOf(el) === index;
                    });
                };
                $scope.filterByCategory = function (el) {
                    // Displays the organization if the organization's category checkbox is checked or 
                    // no checkbox is checked
                    return $scope.filter[el.organization] || noFilter($scope.filter);
                };
            }).error(function (data, status, headers, config) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });

        // Returns a boolean value depending if there is any value is checked or not checked
        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    // There is at least  one checkbox checked
                    return false;
                }
            }
            return true;
        }
    });