/**
 * Simple Blog AngularJS Web Application
 * Author: Brandon Burciaga
 * Single page application contains a blog, photo gallery and comment sections for blog posts.
 * Users are required to log in upon page loading, with authentication logic being
 * the user password is simply the user name + "123".
 */
var app = angular.module('simpleblog', [
    'ngRoute'
]);

/**
 * Route configuration for views and controllers
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // Home
        .when("/", { templateUrl: "views/welcome.html", controller: "PageCtrl" })

        // Blog
        .when("/blog", { templateUrl: "views/blog.html", controller: "PageCtrl" })

        // Photos
        .when("/photos", { templateUrl: "views/photos.html", controller: "PhotoCtrl" })

        // Comments
        // TODO: comments page. decide best design for best user experience
        .when("/comments", { templateUrl: "views/comments.html", controller: "PageCtrl" })


    // else 404
        // TODO: 404 page
    .otherwise("/404", { templateUrl: "views/404.html", controller: "PageCtrl" });
}]);

/**
 * Controls blog, comments supplied by JSONPlaceHolder API
 */
app.controller('BlogCtrl', function($scope, $http) {
    console.log("Blog Controller hit.");
    $http.get('http://jsonplaceholder.typicode.com/posts')
        .then(function(response) {
            $scope.blog = response.data.slice(0, 15);
        }, function errorCallBack(response) {
            console.log(response);
        });
});

/**
 * Controls welcome, 404
 */
app.controller('PageCtrl', function() {
    console.log("Page Controller hit.");
});

/**
 * Controls photos supplied by JSONPlaceHolder API.
 * User can select number of images to display on the page
 */
app.controller('PhotoCtrl', function($scope, $http) {
    console.log("hit photocontroller");
    // TODO: POST image display count and set it in slice below
    $http.get('http://jsonplaceholder.typicode.com/photos')
        .then(function(response) {
            $scope.images = response.data.slice(0, 15);
        }, function errorCallBack(response) {
            console.log(response);
        });
});
