$(function() {
	var symbols = {
		"USD": "$",
		"EUR": "&euro;",
		"GBP": "&pound;",
		"Miles": "m",
		"Kilometer": "km",
		"inch": "\"",
		"centimeter": "cm"
	};
	
	function list() {
		var ul = $( "#conversions" ).empty(),
			ulEdit = $( "#edit-conversions" ).empty();
		$.each( all, function( index, conversion ) {
			// if last update was less then a minute ago, don't update
			if ( conversion.type === "currency" && !conversion.rate || conversion.updated && conversion.updated + 60000 < +new Date) {
				var self = conversion;
				var url = "http://query.yahooapis.com/v1/public/yql?q=select%20rate%2Cname%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes%3Fs%3D" + conversion.from + conversion.to + "%253DX%26f%3Dl1n'%20and%20columns%3D'rate%2Cname'&format=json&diagnostics=true&callback=?";
				$.getJSON( url, function( result ) {
					self.rate = parseFloat( result.query.results.row.rate );
					$( "#term" ).keyup();
					self.updated = +new Date;
					conversions.store();
				});
			}
			$( "#conversion-field" ).tmpl( conversion, {
				symbols: symbols
			}).appendTo( ul );
			$( "#conversion-edit-field" ).tmpl( conversion, {
				symbols: symbols
			}).appendTo( ulEdit );
		});
		ul.add(ulEdit).listview("refresh");
		$( "#term" ).keyup();
	}
	var all = conversions.all();
	$( "#term" ).keyup(function() {
		var value = this.value;
		$.each( all, function( index, conversion ) {
			$( "#" + conversion.from + conversion.to ).text( conversion.rate
				? Math.ceil( value * conversion.rate * 100 ) / 100
				: "Rate not available, yet."
			);
		});
	}).focus();
	list();
	$( "form" ).submit(function() {
		$( "#term" ).blur();
		return false;
	});
	$( "#add" ).click(function() {
		all.push({
			type: "currency",
			from: $( "#currency-options-from" ).val(),
			to: $( "#currency-options-to" ).val()
		});
		conversions.store();
		list();
	});
	$( "#clear" ).click(function() {
		conversions.clear();
		list();
		return false;
	});
	$( "#restore" ).click(function() {
		conversions.restore();
		list();
		return false;
	});
	
	$( "#edit-conversions" ).click(function( event ) {
		var target = $( event.target ).closest( ".deletebutton" );
		if ( target.length ) {
			conversions.remove( target.prev( "label" ).attr( "for" ) );
			list();
		}
		return false;
	});
});
