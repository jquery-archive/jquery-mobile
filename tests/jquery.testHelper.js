/*
 * mobile support unit tests
 */

(function( $ ) {
	$.testHelper = {
		excludeFileProtocol: function(callback){
			var message = "Tests require script reload and cannot be run via file: protocol";

			if (location.protocol == "file:") {
				test(message, function(){
					ok(false, message);
				});
			} else {
				callback();
			}
		},

		reloads: {},

		reloadLib: function(libName){
			if(this.reloads[libName] === undefined) {
				this.reloads[libName] = {
					lib: $("script[src$=" + libName + "]"),
					count: 0
				};
			}

			var	lib = this.reloads[libName].lib.clone(),
			    src = lib.attr('src');

			//NOTE append "cache breaker" to force reload
			lib.attr('src', src + "?" + this.reloads[libName].count++);
			$("body").append(lib);
		},

		alterExtend: function(extraExtension){
			var extendFn = $.extend;

			$.extend = function(object, extension){
				// NOTE extend the object as normal
				var result = extendFn.apply(this, arguments);

				// NOTE add custom extensions
				result = extendFn(result, extraExtension);
				return result;
			};
		}
	};
})(jQuery);