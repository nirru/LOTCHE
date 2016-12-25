(function () {

	'use strict';

	angular.module('common').factory('iframePost', iframePost);

	iframePost.$inject = ['$q'];

	function iframePost($q) {
		return {
			post: post
		};

		function post(url, data) {

			var deferred = $q.defer();

			// create form and an iframe
			
			var form = document.createElement('form'),				
				iframe = document.createElement('iframe'),				
				input;


			iframe.name = 'postIframe';
			iframe.src = url;

			for(var key in data) {
				if (data.hasOwnProperty(key)) {
					input = document.createElement('input');
					input.type = 'hidden';
					input.name = key;
					input.value = data[key];

					form.appendChild(input);
				}
			}

			form.target = 'postIframe';
			form.action = url;
			form.method = 'post';

			document.body.appendChild(iframe);
			document.body.appendChild(form);

			iframe.onload = function () {
				var url = this.contentWindow.location.href;

				if (/^https:\/\//.exec(url)) {
					deferred.resolve(this.contentWindow.location.href);				
				}
				else {
					deferred.reject();
				}

				document.body.removeChild(iframe);
				document.body.removeChild(form);				
			};

			form.submit();

			return deferred.promise;
		}
	}

})();