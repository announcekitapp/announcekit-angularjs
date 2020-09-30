angular.module('ng-announcekit', []).provider('ngAnkit', function () {
	this.selector = `.ak-${Math.random()
		.toString(36)
		.substring(10)}`;

	this.conf = {}

	this.widgetInstance = null

	this.setConfig = function (conf) {
		var self = this
		var name = Math.random()
			.toString(36)
			.substring(10);

		Object.assign(this.conf, conf, {
			name: name,
			onInit: function (_widget) {
				if (_widget.conf.name !== name) {
					return _widget.destroy();
				}

				self.widgetInstance = _widget;
			}
		})
	}

	this.loadWidget = function loadWidget() {
		announcekit.push(Object.assign({}, self.conf))
	}

	this.isEquivalent = function isEquivalent(a, b) {
		if (!a) a = {}
		if (!b) b = {}
		// Create arrays of property names
		var aProps = Object.getOwnPropertyNames(a);
		var bProps = Object.getOwnPropertyNames(b);

		// If number of properties is different,
		// objects are not equivalent
		if (aProps.length != bProps.length) {
			return false;
		}

		for (var i = 0; i < aProps.length; i++) {
			var propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (a[propName] !== b[propName]) {
				return false;
			}
		}

		// If we made it this far, objects
		// are considered equivalent
		return true;
	}

	this.loadScript = function () {
		if (!window["announcekit"]) {
			window["announcekit"] = window["announcekit"] || {
				queue: [],
				push: function (x) {
					window["announcekit"].queue.push(x);
				},
				on: function (n, x) {
					window["announcekit"].queue.push([n, x]);
				}
			};

			var scripttag = document.createElement("script")

			scripttag["async"] = true;
			scripttag["src"] = `https://cdn.announcekit.app/widget-v2.js`;
			var scr = document.getElementsByTagName("script")[0];
			scr.parentNode.insertBefore(scripttag, scr);
		}
	}

	this.$get = function () {
		this.loadScript()
		return this;
	}
})
	.directive('announcekit', ['ngAnkit', function (ngAnkit, $scope) {
		var className = ngAnkit.selector ? ngAnkit.selector.slice(1) : ""
		return {
			scope: {user: "=", data: "=", lang: "=", widgetstyle: '='},
			transclude: true,
			link: function (scope, element, attrs) {
				var isFloat = attrs.floatwidget
				var isEmbed = attrs.embedwidget
				var widgetStyle = scope.widgetstyle

				var style = widgetStyle;

				var styleParams = {
					badge: {
						style: style
					},
					line: {
						style: style
					},
					float: {
						style: style
					}
				};

				scope.$watch('user', function (newVal, oldVal) {
					if (ngAnkit.isEquivalent(newVal, oldVal)) return;

					if (ngAnkit.widgetInstance) {
						ngAnkit.widgetInstance.destroy();
						ngAnkit.setConfig({user: newVal});
						ngAnkit.loadWidget()
					}
				}, true);

				scope.$watch('data', function (newVal, oldVal) {
					if (ngAnkit.isEquivalent(newVal, oldVal)) return;

					if (ngAnkit.widgetInstance) {
						ngAnkit.widgetInstance.destroy();
						ngAnkit.setConfig({data: newVal});
						ngAnkit.loadWidget()
					}
				}, true)

				scope.$watch('lang', function (newVal, oldVal) {
					if (ngAnkit.isEquivalent(newVal, oldVal)) return;
					if (ngAnkit.widgetInstance) {
						ngAnkit.widgetInstance.destroy();

						ngAnkit.setConfig({lang: newVal});
						ngAnkit.loadWidget()
					}

				})

				var conf = {
					widget: attrs.widget,
					selector: ngAnkit.selector
				}

				if (scope.user) {
					conf.user = scope.user
				}

				if (scope.lang) {
					conf.lang = scope.lang
				}

				if (isFloat) {
					conf.selector = null
					delete styleParams.badge;
					delete styleParams.line;
				}

				if (widgetStyle) {
					conf.badge = styleParams.badge
					conf.line = styleParams.line
					conf.float = styleParams.float
				}

				if (isEmbed) {
					conf.embed = true
				}

				ngAnkit.setConfig(conf)
				ngAnkit.loadWidget()
			},
			template: function () {
				return '<div ng-transclude style="display: inline" class="' + className + '"></div>'
			}
		};
	}])
