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
					lib: $("script[src$='" + libName + "']"),
					count: 0
				};
			}

			var	lib = this.reloads[libName].lib.clone(),
			    src = lib.attr('src');

			//NOTE append "cache breaker" to force reload
			lib.attr('src', src + "?" + this.reloads[libName].count++);
			$("body").append(lib);
		},

		rerunQunit: function(){
			var self = this;
			QUnit.init();
			$("script:not([src*='.\/'])").each(function(i, elem){
				var src = elem.src.split("/");
				self.reloadLib(src[src.length - 1]);
			});
			QUnit.start();
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
		},

		hideActivePageWhenComplete: function() {
			if( $('#qunit-testresult').length > 0 ) {
				$('.ui-page-active').css('display', 'none');
			} else {
				setTimeout($.testHelper.hideActivePageWhenComplete, 500);
			}
		},

		openPage: function(hash){
			location.href = location.href.split('#')[0] + hash;
		},

		sequence: function(fns, interval){
			$.each(fns, function(i, fn){
				setTimeout(fn, i * interval);
			});
		},

		pageSequence: function(fns, event){
			var fn = fns.shift(),
					self = this;

			if(fn === undefined) return;

			event = event || "changepage";

			// if a changepage or defined event is never triggered
			// continue in the sequence to alert possible failures
			var warnTimer = setTimeout(function(){
				self.pageSequence(fns, event);
			}, 2000);

			// bind the recursive call to the event
			$.mobile.pageContainer.one(event, function(){
				clearTimeout(warnTimer);

				// Let the current stack unwind before we fire off the next item in the sequence.
				setTimeout(function(){ self.pageSequence(fns, event); }, 0);
			});

			// invoke the function which should, in some fashion,
			// trigger the defined event
			fn();
		}
	};
})(jQuery);