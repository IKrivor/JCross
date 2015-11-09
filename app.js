var App = angular.module('PaperGenerator', ['ngRoute', 'ngMaterial']);

App.config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/generator.html',
            controller: 'apps/GeneratorCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

     $mdThemingProvider.theme('default').accentPalette('green', {
     	default: '400'
    });
});

angular.module('whiteFrameBasicUsage', ['ngMaterial']);

