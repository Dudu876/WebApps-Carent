/**
 * Created by Dudu on 30/12/2015.
 */
var carentApp = angular.module('carentApp', ['ngRoute', 'appRoutes', 'tien.clndr', 'daypilot', 'ngMaterial', 'ui.bootstrap', 'toggle-switch'])
    .constant('FORMAT', "DD/MM/YYYY HH:mm")
    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };
    });

