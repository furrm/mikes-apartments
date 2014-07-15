angular.module('mikes-controllers', [])
    .controller('AppCtrl', ['$scope', '$location', '$ionicModal', '$ionicSideMenuDelegate', '$state',
        function ($scope, $location, $ionicModal, $ionicSideMenuDelegate, $state) {
            $scope.name = 'AppCtrl';

        }])

    .controller('SettingsCtrl', ['$scope', function ($scope) {
        $scope.name = 'SettingsCtrl';

        $scope.settingsMenu =
            [
                {"title": "Device", "link": "app.device"},
                {"title": "File", "link": "app.file"}
            ]


    }])

    .controller('DeviceCtrl', ['$scope', 'DeviceService', '$cordovaDevice', function ($scope, DeviceService, $cordovaDevice) {
        $scope.name = 'DeviceCtrl';

        $scope.deviceVersion = DeviceService.getVersion();
        $scope.deviceCordova = DeviceService.getCordova();
        $scope.deviceModel = DeviceService.getModel();
        $scope.deviceName = $cordovaDevice.getVersion();
        $scope.devicePlatform = DeviceService.getPlatform();
//        $scope.deviceUUID = DeviceService.getUUID();
        $scope.deviceUUID = $cordovaDevice.getUUID();


//            $scope.deviceVersion = DeviceService.getDeviceVersion();
    }])

    .controller('FileCtrl', ['$scope', '$ionicPlatform', '$cordovaFile', function ($scope, $ionicPlatform, $cordovaFile) {

        var dirName = "MyDirectory";

        $scope.name = 'FileCtrl';

        $scope.status = "waiting...";

        $ionicPlatform.ready(function(){
            $scope.status = "READY!!!";



            try {
                $scope.status = cordova.file.dataDirectory
            } catch (e) {
                $scope.status = "Can't get directory!!"
            }

        });



        $scope.createDir = function(){
            $scope.status = "attempting to crete directory...";

            try {
                $cordovaFile.createDir("Mikes", false).then(function (result) {
                    $scope.status = "It worked!!";
                }, function (err) {
                    $scope.status = "It didn't work!";

                });
            } catch (e) {
                console.log(e); // todo: delete me
            } finally {
                $scope.status = "EXCEPTION!!!";

            }


        }

        $scope.getDir = function(){

            var dir;

            try {
//                $scope.status = cordova.file.dataDirectory
                $scope.status = cordova.file.applicationStorageDirectory
            } catch (e) {
                $scope.status = "Can't get directory!!"
            }


        }




    }])

    .controller('PageCtrl', ['$scope', function ($scope) {
        $scope.name = 'PageCtrl';



        $scope.screenWidth = screen.width;

        $scope.pageTopStyle = "height:" + screen.width + "px; width:" + screen.width + "px;";



    }])
;