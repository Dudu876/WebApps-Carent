carentApp.controller('branchesManager', [
    '$scope', '$http', '$location', '$window', '$compile', 'branchService',
    function ($scope, $http, $location, $window, $compile, branchService)
    {
        $scope.defaultBranch = {
            _id: '0',
            title: '',
            long: 33,
            lat: 33
        };

        $scope.currentBranch = $scope.defaultBranch;

        $scope.isCollapsed = true;
        $scope.buttonText = 'הוסף סניף';


        $scope.resetForm = function()
        {
            $scope.isCollapsed = !$scope.isCollapsed;
            $scope.currentBranch = $scope.defaultBranch;
            $scope.setCurrentMode(false);
        };

        $scope.setCurrentMode = function (isEdit){
            if (isEdit)
            {
                $scope.buttonText = 'ערוך סניף';
            }
            else
            {
                $scope.buttonText = 'הוסף סניף';
            }
        };

        $scope.removeBranchById = function (id) {
            var indexSaver;

            for (var index = 0; index < $scope.branches.length; index++) {
                if ($scope.branches[index]._id == id) {
                    indexSaver = index;
                    break;
                }
            }

            $scope.branches.splice(indexSaver, 1);
        };

        var promise = branchService.get();
        promise.success(function (response)
        {
            $scope.branches = response;
            var mapOptions = {
                zoom: 4,
                center: new google.maps.LatLng(33, 33),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

            $scope.markers = [];
            $scope.infoWindows = [];

            $scope.removeInfoWindowFromMap = function (id) {
                var indexSaver;

                for (var index = 0; index < $scope.infoWindows.length; index++) {
                    if ($scope.infoWindows[index] != null && $scope.infoWindows[index].id == id) {
                        $scope.infoWindows[index].close();
                        $scope.infoWindows[index].setMap(null);
                        indexSaver = index;
                        break;
                    }
                }

                $scope.infoWindows.splice(indexSaver, 1);
            };

            $scope.removeMarkerFromMap = function(id) {
                $scope.removeInfoWindowFromMap(id);
                var indexSaver;

                for (var index = 0; index < $scope.markers.length; index++) {
                    if ($scope.markers[index] != null && $scope.markers[index].id == id) {
                        $scope.markers[index].infoWindow = null;
                        $scope.markers[index].setMap(null);
                        indexSaver = index;
                        break;
                    }
                }

                $scope.markers.splice(indexSaver, 1);
            };

            $scope.upsertMarker = function (info, exists){
                if (!exists) {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.long),
                        title: info.title,
                        id: info._id
                    });

                    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';


                    var htmlElement = '<div id=infowin><h2>' + marker.title + '</h2>' +
                        '<br/>' +
                        '<button id=edit ng-click=editBranch("' + info._id + '")> Edit </button>' +
                        '<button id=delete ng-click=deleteBranch("' + info._id + '")> Delete </button></div>';
                    var compiled = $compile(htmlElement)($scope);
                    var infoWindow = new google.maps.InfoWindow({
                        map: map,
                        content: compiled[0],
                        id: info._id
                    });

                    marker.infoWindow = infoWindow;

                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);
                    $scope.infoWindows.push(infoWindow);
                }
                else
                {
                    var existingMarker = $.grep($scope.markers, function(e)
                    {
                            return e != null && e.id == info._id;
                    })[0];
                    existingMarker.setPosition(new google.maps.LatLng(info.lat, info.long));
                    existingMarker.title = info.title;
                    google.maps.event.clearInstanceListeners(existingMarker);

                    var htmlElement = '<div id=infowin><h2>' + existingMarker.title + '</h2>' +
                        '<br/>' +
                        '<button id=edit ng-click=editBranch("' + info._id + '")> Edit </button>' +
                        '<button id=delete ng-click=deleteBranch("' + info._id + '")> Delete </button></div>';
                    var compiled = $compile(htmlElement)($scope);
                    var infoWindow = new google.maps.InfoWindow({
                        map: map,
                        content: compiled[0],
                        id: info._id
                    });

                    $scope.removeInfoWindowFromMap(info._id);

                    existingMarker.infoWindow = infoWindow;
                    google.maps.event.addListener(existingMarker, 'click', function () {
                        infoWindow.open($scope.map, existingMarker);
                    });

                    $scope.infoWindows.push(infoWindow);
                }
            };

            for (i = 0; i < $scope.branches.length; i++){
                $scope.upsertMarker($scope.branches[i], false);
            }

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }
        });

        $scope.upsertBranch = function() {
            var upsertPromise = branchService.upsert($scope.currentBranch);
            upsertPromise.success(function (data) {
                if (!data.success) {
                    alert('error');
                } else {
                    $scope.upsertMarker(data.branch, !data.isNew);
                    $scope.setCurrentMode(false);
                    $scope.isCollapsed = true;
                }
            });
        };

        $scope.editBranch = function(id){
            for (var index = 0; index < $scope.branches.length; index++)
            {
                if ($scope.branches[index]._id == id)
                {
                    $scope.currentBranch = $scope.branches[index];
                    break;
                }
            }

            $scope.isCollapsed = false;
            $scope.setCurrentMode(true);
        };

        $scope.deleteBranch = function(id){
            var existingMarker = $.grep($scope.markers, function(e){ return e.id == id; })[0];
            var toDelete = confirm("Are you sure you want to delete " + existingMarker.title + "?");

            if (toDelete == true)
            {
                var deletePromise = branchService.delete(id);

                deletePromise.success(function (data) {
                    if (!data.success) {
                        alert('error');
                    } else {
                        $scope.removeMarkerFromMap(id);
                        $scope.removeBranchById(id);
                    }
                });
            }
        };
}]);

