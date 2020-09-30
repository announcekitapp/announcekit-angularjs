![](https://announcekit.app/images/logo@2x.png)

Angular.js (1.x) wrapper for AnnounceKit widgets

**Visit [https://announcekit.app](https://announcekit.app) to get started with AnnounceKit.**

## Installation

just include `lib/ng-announcekit.js` 


## Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.min.js"></script>
  <script src="lib/ng-announcekit.js"></script>
  <script>
    angular.module('test', ['ng-announcekit'])
      .controller('testController', ['$scope',
        function ($scope) {
          $scope.widgetstyle = {
            margin: '10px'
          }

          $scope.user = {
            id: Date.now(),
            name: "test_user_name"
          }

          $scope.data = {
            member_type: "paid"
          }

        }
      ])
  </script>
</head>
<body ng-app="test" ng-controller="testController">
<announcekit widgetstyle="widgetstyle" data="data" widget="https://announcekit.app/widgets/v2/19zWjC" user="user">What's new</announcekit>
</body>
</html>

```

## Props

- **`widget`** - The url of the widget. You can obtain it while creating or editing widget in AnnounceKit Dashboard.
- `widgetstyle` - You can apply CSS rules to modify / tune the position of the widget launcher.
- `floatwidget` - Set true if the widget is a Float widget.
- `embedwidget` - Set true if the widget is a Embed widget.
- `lang` - Language selector
- `user` - User properties (for [user tracking](https://announcekit.app/docs#user-tracking))
- `data` - [Segmentation data](https://announcekit.app/docs#segmentation)


# License
[MIT](https://github.com/announcekitapp/announcekit-angularjs/blob/master/LICENSE)
