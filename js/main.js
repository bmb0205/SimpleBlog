/**
 * Simple Blog AngularJS Web Application
 * Author: Brandon Burciaga
 * Single page application contains a blog, photo gallery and comment sections for blog posts.
 * Users are required to log in upon page loading, with authentication logic being
 * the user password is simply the user name + "123".
 */
var app = angular.module('simpleblog', [
    'ngRoute',
    'bootstrapLightbox'
]);

/**
 * Route configuration for views and controllers
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // Home
        .when("/", { templateUrl: "views/login.html", controller: "FormCtrl" })

        // Blog
        .when("/blog", { templateUrl: "views/blog.html", controller: "BlogCtrl" })

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
 * Controls log-in welcome screen
 * TODO: make this a modal, hide password characters, send user name to header template for welcome display in top corner
 */
app.controller('FormCtrl', function ($scope, $location) {
  console.log("Form controller hit");
  this.username = "Guest";

  $scope.login = function() {
    if($scope.password === $scope.username + "123") {
      alert("Thanks for logging in!");
      $location.path('/blog');
    } else {
      alert("Sorry, your password is incorrect!")
    }
    console.log($scope.username);
    console.log($scope.password);
  };
});

/**
 * Controls blog, comments supplied by JSONPlaceHolder API
 */
app.controller('BlogCtrl', function($scope, $http) {
    console.log("Blog Controller hit.");
    $http.get('http://jsonplaceholder.typicode.com/posts')
        .then(function(response) {

          // Placeholder number of blog posts
          // TODO: add pagination
          $scope.blog = response.data.slice(0, 50);

          // TODO: put in method, get all comments for specific blog posts on "view comments" click
          // $http.get('http://jsonplaceholder.typicode.com/comments')
          //   .then(function(response) {
          //     $scope.comments = response.data;
          //   });

        }, function errorCallBack(response) {
            console.log(response);
        });

    // TODO: fix to create fake POST request to retrieve specific blog post and comments
    function viewComments($scope, id) {
      alert(id);
      $http.get('http://jsonplaceholder.typicode.com/posts?userId=' + id)
        .then(function(response) {
          alert(response.data);
        });
    }
});

/**
 * Controls photos supplied by JSONPlaceHolder API.
 * User can select number of images to display on the page.
 * CLicking on an image displays a responsive modal you can click or keypress through
 * TODO: add image specific details to modal content, add pagination to page
 */
app.controller('PhotoCtrl', function($scope, $http, Lightbox) {
    console.log("hit photocontroller");

    // TODO: POST image display count and set it in slice below
    $http.get('http://jsonplaceholder.typicode.com/photos')
        .then(function(response) {
            $scope.images = response.data.slice(0, 50);
        }, function errorCallBack(response) {
            console.log(response);
        });

    $scope.openLightboxModal = function (index, title) {
        Lightbox.openModal($scope.images, index);
    };
});

/**
 * Controls welcome, 404
 */
app.controller('PageCtrl', function() {
  console.log("Page Controller hit.");
});
