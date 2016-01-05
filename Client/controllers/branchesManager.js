carentApp.controller('branchesManager', [
    '$scope', '$http', '$location', '$window', '$compile', 'branchService',
    function ($scope, $http, $location, $window, $compile, branchService)
    {

        $scope.currentBranch = {
            id: '0',
            title: '',
            long: 33,
            lat: 33
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

            var createMarker = function (info){
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.title
                });

                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';


                var htmlElement = '<div id=infowin><h2>' + marker.title + '</h2>' +
                    '<br/>' +
                    '<button id=edit ng-click=editBranch(' + info.id + ')> Edit </button>' +
                    '<button id=delete ng-click=deleteBranch(' + info.id + ')> Delete </button></div>';
                var compiled = $compile(htmlElement)($scope);
                var infoWindow = new google.maps.InfoWindow({
                    map: map,
                    content: compiled[0]
                });

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);
            };

            for (i = 0; i < $scope.branches.length; i++){
                createMarker($scope.branches[i]);
            }

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }
        });

        $scope.upsertBranch = function() {
            $http({
                method: 'POST',
                url: '/api/branch/' + $scope.currentBranch.id,
                data: $.param($scope.currentBranch),  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function (data) {
                    console.log(data);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.errorName = data.errors.name;
                        $scope.errorSuperhero = data.errors.superheroAlias;
                    } else {
                        // if successful, bind success message to message
                        $scope.message = data.message;
                    }
                });
        };

        $scope.editBranch = function(id){

        };

        $scope.deleteBranch = function(id){
            var toDelete = confirm("Are you sure you want to delete " + arrMarkers[id].title + "?");

            if (toDelete == true)
            {
                branchService.delete(id);
            }
        };
}]);

