(function($, undefined) {
	$.mobile.clrlib = $.mobile.clrlib || {};
	$.extend ($.mobile.clrlib, {
		/*
		 * Converts html color string to rgb array.
		 *
		 * Input: string clr_str, where
		 * clr_str is of the form "#aabbcc"
		 *
		 * Returns: [ r, g, b ], where
		 * r is in [0, 1]
		 * g is in [0, 1]
		 * b is in [0, 1]
		 */
		HTMLToRGB: function(clr_str) {
			clr_str = (('#' == clr_str.charAt(0)) ? clr_str.substring(1) : clr_str);

			return ([clr_str.substring(0, 2),
			         clr_str.substring(2, 4),
			         clr_str.substring(4, 6)].map(function(val) {
    	           return parseInt(val, 16) / 255.0;
			         }));
		},

		/*
		 * Converts rgb array to html color string.
		 *
		 * Input: [ r, g, b ], where
		 * r is in [0, 1]
		 * g is in [0, 1]
		 * b is in [0, 1]
		 *
		 * Returns: string of the form "#aabbcc"
		 */
		RGBToHTML: function(rgb) {
			return ("#" + 
				rgb.map(function(val) {
				    	var ret = val * 255,
    		    	    theFloor = Math.floor(ret);

				    	ret = ((ret - theFloor > 0.5) ? (theFloor + 1) : theFloor);
				    	ret = (((ret < 16) ? "0" : "") + (ret & 0xff).toString(16));
				    	return ret;
  			    })
				   .join(""));
		},

		/*
		 * Converts hsl to rgb.
		 *
		 * From http://130.113.54.154/~monger/hsl-rgb.html
		 *
		 * Input: [ h, s, l ], where
		 * h is in [0, 360]
		 * s is in [0,   1]
		 * l is in [0,   1]
		 *
		 * Returns: [ r, g, b ], where
		 * r is in [0, 1]
		 * g is in [0, 1]
		 * b is in [0, 1]
		 */
		HSLToRGB: function(hsl) {
    	var h = hsl[0] / 360.0, s = hsl[1], l = hsl[2];

    	if (0 === s)
				return [ l, l, l ];

			var temp2 = ((l < 0.5)
          	? l * (1.0 + s)
          	: l + s - l * s),
			    temp1 = 2.0 * l - temp2,
			    temp3 = {
			    	r: h + 1.0 / 3.0,
			    	g: h,
			    	b: h - 1.0 / 3.0
			    };

			temp3.r = ((temp3.r < 0) ? (temp3.r + 1.0) : ((temp3.r > 1) ? (temp3.r - 1.0) : temp3.r));
			temp3.g = ((temp3.g < 0) ? (temp3.g + 1.0) : ((temp3.g > 1) ? (temp3.g - 1.0) : temp3.g));
			temp3.b = ((temp3.b < 0) ? (temp3.b + 1.0) : ((temp3.b > 1) ? (temp3.b - 1.0) : temp3.b));

			ret = [
				(((6.0 * temp3.r) < 1) ? (temp1 + (temp2 - temp1) * 6.0 * temp3.r) :
				(((2.0 * temp3.r) < 1) ? temp2 :
				(((3.0 * temp3.r) < 2) ? (temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp3.r) * 6.0) :
				 temp1))),
				(((6.0 * temp3.g) < 1) ? (temp1 + (temp2 - temp1) * 6.0 * temp3.g) :
				(((2.0 * temp3.g) < 1) ? temp2 :
				(((3.0 * temp3.g) < 2) ? (temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp3.g) * 6.0) :
				 temp1))),
				(((6.0 * temp3.b) < 1) ? (temp1 + (temp2 - temp1) * 6.0 * temp3.b) :
				(((2.0 * temp3.b) < 1) ? temp2 :
				(((3.0 * temp3.b) < 2) ? (temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp3.b) * 6.0) :
				 temp1)))]; 

			return ret;
		},

		/*
		 * Converts hsv to rgb.
		 *
		 * Input: [ h, s, v ], where
		 * h is in [0, 360]
		 * s is in [0,   1]
		 * v is in [0,   1]
		 *
		 * Returns: [ r, g, b ], where
		 * r is in [0, 1]
		 * g is in [0, 1]
		 * b is in [0, 1]
		 */
		HSVToRGB: function(hsv) {
			return $.mobile.clrlib.HSLToRGB($.mobile.clrlib.HSVToHSL(hsv));
		},

		/*
		 * Converts rgb to hsv.
		 *
		 * from http://coecsl.ece.illinois.edu/ge423/spring05/group8/FinalProject/HSV_writeup.pdf
		 *
		 * Input: [ r, g, b ], where
		 * r is in [0,   1]
		 * g is in [0,   1]
		 * b is in [0,   1]
		 *
		 * Returns: [ h, s, v ], where
		 * h is in [0, 360]
		 * s is in [0,   1]
		 * v is in [0,   1]
		 */
		RGBToHSV: function(rgb) {
			var min, max, delta, h, s, v, r = rgb[0], g = rgb[1], b = rgb[2];

			min = Math.min(r, Math.min(g, b));
			max = Math.max(r, Math.max(g, b));
			delta = max - min;

			h = 0;
			s = 0;
			v = max;

			if (delta > 0.00001) {
				s = delta / max;

				if (r === max)
					h = (g - b) / delta ;
				else
				if (g === max)
					h = 2 + (b - r) / delta ;
				else
					h = 4 + (r - g) / delta ;

				h *= 60 ;

				if (h < 0)
					h += 360 ;
			}

			return [h, s, v];
		},

		/*
		 * Converts hsv to hsl.
		 *
		 * Input: [ h, s, v ], where
		 * h is in [0, 360]
		 * s is in [0,   1]
		 * v is in [0,   1]
		 *
		 * Returns: [ h, s, l ], where
		 * h is in [0, 360]
		 * s is in [0,   1]
		 * l is in [0,   1]
		 */
		HSVToHSL: function(hsv) {
			var max = hsv[2],
			    delta = hsv[1] * max,
			    min = max - delta,
			    sum = max + min,
			    half_sum = sum / 2,
			    s_divisor = ((half_sum < 0.5) ? sum : (2 - max - min));

			return [ hsv[0], ((0 == s_divisor) ? 0 : (delta / s_divisor)), half_sum ];
		},

		/*
		 * Converts rgb to hsl
		 *
		 * Input: [ r, g, b ], where
		 * r is in [0,   1]
		 * g is in [0,   1]
		 * b is in [0,   1]
		 *
		 * Returns: [ h, s, l ], where
		 * h is in [0, 360]
		 * s is in [0,   1]
		 * l is in [0,   1]
		 */
		RGBToHSL: function(rgb) {
			return $.mobile.clrlib.HSVToHSL($.mobile.clrlib.RGBToHSV(rgb));
		}
	});
})(jQuery);
