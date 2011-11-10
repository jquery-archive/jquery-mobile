(function($) {
	$(function() {
		var searchMap = (function() {
			var searchSplit, searchMap = {};

			if ( !location.search ){
				return searchMap;
			}

			searchSplit = location.search.replace(/^\?/, "").split( /&|;/ );

			for( var i = 0; i < searchSplit.length; i++ ) {
				var kv = searchSplit[i].split(/=/);
				searchMap[ kv[0] ] = kv[1];
			}

			return searchMap;
		})();

		$.get("../", searchMap, function(data) {
			$.each(data, function( i, avg ) {
				var tablename = avg.point + " " + avg.agent + " " + avg.pathname,
          $table = $( "table > caption:contains(" + tablename + ")");

				if( !$table.length ) {
					$table = $( "<table>", {
						id: avg.point,
						"data-pathname": avg.pathname
					});

					$table.append( "<caption>" + tablename + "</caption>");
					$table.append( "<thead><tr></tr></thead>" );
					$table.append( "<tbody><tr></tr></tbody>" );
				}

				// TODO assume time ordering in the data set
				var $heading = $table.find("thead > tr > th:contains(" + avg.day + ")");

				if( !$heading.length ) {
					$heading = $("<th>", {
						text: avg.day,
						scope: "column"
					});

					$table.find("thead > tr").append($heading);
				}

				var $rowHeading = $table.find("tbody > tr > th:contains(" + avg.point + ")" ),
					$row = $table.find( "tbody > tr" );

				if( !$rowHeading.length ) {
					$rowHeading = $("<th>", {
						text: avg.point,
						scope: "row"
					});

					$row.append( $rowHeading );
				}

				$row.append( "<td>" + avg.avg_value + "</td>" );

        $("#tables").append($table);
			});

			$("#tables table").visualize({ type: "line", width: 400, height: 400 }).appendTo("#graphs");
		});
	});
})(jQuery);