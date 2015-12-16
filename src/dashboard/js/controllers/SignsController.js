angular.module('simple-sign').controller('SignsController',
    function($scope, WebPageService, pages, accountId, $log, $enplugDashboard, $location, $firebaseArray) {
        "use strict";

        $enplugDashboard.pageLoading(false);

        // If no assets/pages exist, create an asset 
        if (!pages.length) {

            // Initialize page object. This object will eventually be the asset
            var page = {
                Value: {
                    ShowContent: 'url',
                    Url: null,
                    _friendlyName: null
                }
            };

            var promise;

            // URL composed of base URL + the accountId
            page.Value.Url = "https://simplesign.firebaseapp.com/#/display/" + accountId;

            // Create the asset with the display URL (this will only happen the first time the app is initialized)
            promise = WebPageService.createWebPage(page);
            promise.then(function() {
                $enplugDashboard.successIndicator('Created new Simple Sign collection.').then(function() {
                    
                    // Routes to signs view
                    $location.path('/');
                });
            }, $enplugDashboard.errorIndicator);
        }

        // Give the Scope the accountId to create the URL with. See signs template for implementation
        $scope.accountId = accountId;
        
        // Firebase
        var signsRef = new Firebase("https://simplesign.firebaseio.com/accounts/" + accountId + "/slides");

        $scope.signs = $firebaseArray(signsRef);


        // Header buttons

        // Route to signs in response to click of My Signs header button
        function viewSigns() {
            $location.path('/');
        }

        // Route to create in response to click of Create header button
        function goToCreateSign() {
            $location.path('/create');
        }

        $enplugDashboard.setHeaderButtons([{
            text: 'My Signs',
            action: viewSigns,
            class: 'btn-default ion-android-list',
            disabled: true
        }, {
            text: 'Create',
            action: goToCreateSign,
            class: 'btn-default ion-android-color-palette'
        }]);
    });
