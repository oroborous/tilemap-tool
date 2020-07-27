function createCookie (cookieName, cookieValue, daysTillExpires, path) {
	// The expiration date for this cookie
	// If blank, cookie expires when browser is closed
	var expires = "";
	// Was an expiration specified?
	if (daysTillExpires) {
		// Get a new date object, which will be set to the current date/time
		var date = new Date();
		// Update the time to be in the future
		date.setTime(date.getTime() + (daysTillExpires * 24 * 60 * 60 * 1000));
		// Make a string to add to the cookie
		expires = ";expires=" + date.toUTCString();
	}
	// The path (URL) for which this cookie is valid
	// If not set, defaults to path that sets the cookie
	var path = "";
	if (path) {
		path = ";path=" + path;
	}
	// Set the cookie
	document.cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) + expires + path;
}

function readCookie (cookieName) {
	// Cookies are separated with semicolon
	var allCookiesArray = document.cookie.split(";");
	// Loop through all cookies
	for (var i = 0; i < allCookiesArray.length; i++) {
		// A cookie... just a string, really
		var cookie = allCookiesArray[i];
		// Strip off any leading spaces
		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1);
		}
		// Find the "=" character
		var indexOfEquals = cookie.indexOf("=");
		// The name is on the left side
		var left = cookie.substring(0, indexOfEquals);
		// The cookie starts with the pattern!
		if (left == cookieName) {
			// The value is on the right side
			var cookieValue = cookie.substring(indexOfEquals + 1);
			// Return the associate value
			return decodeURIComponent(cookieValue);
		}

	}
	// Cookie name not found
	return null;
}

function eraseCookie (cookieName) {
	/*
	 * Remove a cookie by creating a blank one with the same name
	 * and making it expire in the past.
	 */
	this.createCookie(cookieName, " ", -1);
}
