carentApp.controller('branchesManager', function($scope) {

    $scope.branches = [{
        id:1,
        title: "Tel Aviv",
        lat: 33,
        long: 33
    },{
        id:2,
        title: "Ramat Gan",
        lat: 33.5,
        long: 33.5
    }]

    $scope.currentBranch = {
        id:0,
        title: "",
        lat: 33,
        long: 33
    };

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(33, 33),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.title
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < $scope.branches.length; i++){
        createMarker($scope.branches[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});

