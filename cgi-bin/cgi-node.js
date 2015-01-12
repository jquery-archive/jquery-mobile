#!/usr/local/bin/node

/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com

 This is the global configuration object for CgiNode. 
 
 NOTE: It is not in a JSON file because we want to compile it directly within the final cig-node.js file to optimize load time.
*/
var CgiNodeConfig = 
{
	Version: '0.2',

	StartTag: '<?',
	EndTag: '<?',

	ScriptExtensions: ['.js'],

	EmbededScriptExtensions: ['.jss'],


	SessionCookie: 'CGI-NODE-SESSIONID',
	SessionTimeOut: 15*60, // 15 minutes
	SessionPath: '/usr/local/node/sessions/'
};

/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com

 This is the VM context that will be used to run the requested scripts. 
 The CGI Context defines the global methods and variables that will be available for the executing scripts.
*/
function CgiHttpContext(onFinished)
{
	var self = this;

	/*
	 This array contains all the scripts that have been included within the session.
	 The script structure is: {id: <integer>, path: <string>, code: <string>, content: [<string>]};
	*/
	this.__scripts = [];
	
	/*
	 This is the VM context/sandbox used for every included script.
	*/
	this.__vmContext = null;

	/*
	 This object is created before the requested script is executed. It represents the HTTP request
	 and contains all the request information. This includes the headers, URL, query string, post data
	 and server information.
	 
	 See CgiHttpRequest for more details.
	*/
	this.request = new CgiHttpRequest(onFinished);

	/*
	 This object is created by the initially that implements header and write methods to send data back to the 
	 client.
	 
	 See CgiHttpResponse for more details.
	*/
	this.response = new CgiHttpResponse();

	/*
	 This is the current user session object. It is automatically saved and loaded for each request.
	 The session is sent through Cookies to the client which is automatically sent back and forth for every request.
	 
	 NOTE: this must be created after the request has been parsed.
	*/
	this.session = new CgiHttpSession(this.request, this.response);

	/*
	 This is an alias to the response.write method.
	 Can be used directly within CGI script, example: write('Hello World')
	*/
	this.write = this.response.write;

	/*
	 The node process object is made available to the scripts for any additional information they may require.
	 See http://nodejs.org/documentation/api/ under "process" for more information.
	*/
	this.process = process;
	this.require = require;
	writer = this.write;

	/*
	 Resolve the file path relative to the root of the website as defined within the configuration,
	 or if not specified then the base script path.
	 
	 TODO: implement this method, use the current script as a relative point, ie module.filename
	*/
	this.mapPath = function(path) {

		var root = Path.dirname(self.request.server.path_translated);
		return Path.resolve(root, path);
	};

	/*
	 Executes the given file within the current context. 
	 If the given file path is is a '.js' file, it is executed as is, otherwise it is assumed to be an ASP page and is parsed first.
	*/
	this.include = function(filePath, options)
	{
		// If options is not defined then assume UTF8 as including.
		if (options === undefined) options = {encoding: 'utf8'};
		// Resolve the script path.
		var path = self.mapPath(filePath);

		// Get the script file content.
		var content = FS.readFileSync(path, options);

		// If the file extension is not '.js' then parse out the different code and content sections.
		// TODO: use the configuration object to check if it is a script file or not.
		if (Path.extname(filePath) != '.js') script = CgiParser.script(self.__scripts.length, path, content.toString());

		// Otherwise just create a new script object
		else script = {id: self.__scripts.length, path: path, script: null, code: content, content: []};

		// Push the script onto the global script array.
		self.__scripts.push(script);

		// If the VM context has not yet been created then create it.
		if (self.__vmContext === null) self.__vmContext = VM.createContext(self);

		// Execute the script within the context.
		VM.runInContext(script.code, self.__vmContext, script.path);
	};
	
	/*
	 This method is similar to PhpInfo(). It outputs all the HTTP request and server information and variables
	 to the stream in HTML format.
	*/
	this.CgiNodeInfo = function()
	{
		var drawObject = function(title, object)
		{
			self.response.write('<tr><th colspan="2">' + title + '</th></tr>');
			for (var name in object)
			{
				var value = object[name];
				if (typeof(value) === 'function') continue;
				else if (typeof(value) === 'object')
				{
					var htmlValue = '<table class="NodeASPTable" border="0" style="margin: 0px">'
					for (var subName in value) htmlValue += '<tr><td>' + subName +'</td><td>' + value[subName] +'</td></tr>';
					value = htmlValue + '</table>';
				}

				process.stdout.write('<tr><td>' + name +'</td><td>' + value +'</td></tr>');
			}
		};

		self.response.write('<style>.NodeASPTable{ font-family: arial; font-size: 12px; margin: auto; border-collapse: collapse; width: 600px} .NodeASPTable TH{ background-color: #303030; color: white; font-size: 14px; padding: 10px} .NodeASPTable TD{ padding: 5px; } .NodeASPTable TR TD:nth-child(1){ background: #d9ebb3; }</style>');
		self.response.write('<table class="NodeASPTable" border="1">');
		
		var session = {id: self.session.id, path: self.session.path, ipAddress: self.session.ipAddress};

		drawObject('CGI Command Line Arguments', process.argv);
		drawObject('Server Variables', self.request.server);
		drawObject('HTTP Request Headers', self.request.headers);
		drawObject('HTTP Request Cookies', self.request.cookies);
		drawObject('Session', session);
		drawObject('Session Cookies', self.session.cookies);
		drawObject('Session Data', self.session.data);
		drawObject('URL Query String', self.request.query);
		drawObject('Post Form', self.request.post.form);
		drawObject('Post Files', self.request.post.files);
		drawObject('Post Parts', self.request.post.parts);

		self.response.write('</table>');
	};
}

/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com
 
 This is a session manager that automatically creates a new session when a user first hits the site. 
 This class will also automatically loads the same session for every required form the same user and provides
 a clean up method to clean expired session files.
*/
function CgiHttpSession(request, response)
{
	var self = this;
	
	/*
	 The unique session ID for the current user.
	*/
	this.id = null;
	
	/*
	 The full file path of the session file where the data will saved and restored.
	*/
	this.path = null;
	
	/*
	 The IP address of the user, this is used as a simple check to ensure the request is coming from the original IP addresses
	 that created this session. If the IP address changed then the session will no longer be accessible.
	*/
	this.ipAddress = null;
	
	/*
	 Server side cookies that are saved and loaded with the session.
	 This is an object of name:  {name: <string>, value: <string>, expires: <date>, domain: <string>, path: <string>, httpOnly: <boolean>, secure: <boolean>}
	*/
	this.cookies = {};
	
	/*
	 This is the suer stored session data. Users can store anything they want there and accesses it at every request.
	 For example: session.data.userId = 10;
	*/
	this.data = {};

	/*
	 Performs the session operations of loading the session or creating a new if it does not exist.
	*/
	this.init = function()
	{
		// Set the session within the request object and response object, these objects need access to the session.
		request.session = this;
		response.session = this;
	
		// Get the session ID from the cookies. If there is no session ID stored then create a new ID and create a new file.
		this.id = (request.cookies.hasOwnProperty(CgiNodeConfig.SessionCookie) ? request.cookies[CgiNodeConfig.SessionCookie] : this.create());
		var path = Path.join(CgiNodeConfig.SessionPath, this.id);

		// If the file does not exist then create another ID.
		if (!FS.existsSync(path)) this.id = this.create();

		// Load the session information.
		// TODO: handle exceptions, if occurs create new session.
		var session = JSON.parse( FS.readFileSync( Path.join(CgiNodeConfig.SessionPath, this.id) ) );
		
		// Ensure the session is actually the requester's session. 
		// TODO: create new session if this occurs. Don't throw exception.
		if (session.ipAddress != request.server.remote_addr) throw "Invalid session ID!";

		// Copy the session object data into this object.
		for (name in session) this[name] = session[name];

		// TODO: At this point the client has already sent it's cookies as well. We can merge the client cookies into the session cookies. 
	};

	/*
	 Saves the session data back to the file.
	*/
	this.save = function()
	{
		// Copy the data into a new object.
		var session = {id: self.id, path: self.path, ipAddress: self.ipAddress, cookies: self.cookies, data: self.data};
	
		// Write the session back to the 
		FS.writeFileSync( self.path, JSON.stringify( session ) );
	};

	/*
	 Creates a new session with a new ID and saves the empty session to file.
	 Uses the client's IP address, port and current time + random number to generate a new session ID.
	 Stores the current client IP address within the session ID. This is used as extra check.
	*/
	this.create = function()
	{
		// Generate a new ID based on some fixed and random factors.
		var date = new Date();
		var idString = request.server.remote_addr + request.server.remote_port + request.server.unique_id + date.value + Math.random();
		var id = Crypto.createHash('md5').update( idString ).digest('hex');
		
		// TODO: should check if this already exists, if so then generate a new random number session. **** IMPORTANT ****
	
		// Create the session object.
		var session = { id: id, path: Path.join(CgiNodeConfig.SessionPath, id), ipAddress: request.server.remote_addr, cookies: {}, data: {} };
 
		// Add the session ID cookie to it. {name: <string>, value: <string or array>, expires: <date>, domain: <string>, path: <string>, httpOnly: <boolean>, secure: <boolean>}
		session.cookies[CgiNodeConfig.SessionCookie] = {name: CgiNodeConfig.SessionCookie, value: id, httpOnly: true, notSent: true, server: true };

		// Save the session to file.
		FS.writeFileSync( session.path, JSON.stringify( session ) );

		// Return the session ID.
		return session.id;
	};


	/*
	 Deletes all expired sessions from the server. This should occur at the end of a request after everything is done and
	 the process is about to exist.
	 
	 TODO: handle exceptions.
	*/
	this.cleanUp = function()
	{
		// Current time used to check if a session has expired.
		var time = (new Date).value;
		
		// Get the time out in milliseconds.
		var timeOut = (CgiNodeConfig.SessionTimeOut * 1000);
	
		// Get the list of files within the sessions folder.
		var sessions = FS.readdirSync(CgiNodeConfig.SessionPath);
		for (var index = 0; index < sessions.length; index++)
		{
			// Build the path and the file information.
			var path = Path.join(CgiNodeConfig.SessionPath, sessions[index]);
			var stats = FS.statSync(path);
			
			// If the session has expired then delete the session file.
			if ( (stats.mtime.value + timeOut) < time ) FS.unlinkSync( path );
		}
	};

	// Call the constructor.
	this.init();
}


/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com

 The HTTP response is an object that contains response header and content methods to 
 return valid HTTP response to the client.
*/
function CgiHttpResponse() 
{
	var self = this;
	
	/*
	 This is the session object, it is set by the session when it is created.
	 This is used to write the cookies to the client when the header is sent.
	*/
	this.session = null;

	/*
	 Defines if the HTTP headers have already been sent or not. The user can choose to send the 
	 headers manually by calling sendHeaders, or it is done automatically the first time the 'write' method
	 is called.
	*/
	this.isHeaderSent = false;

	/*
	 This object defines the list of name/value header of the HTTP headers. These can be manipulated directly
	 by the caller. Set, get, remove methods are not required send the caller can access the header object directly.

	 For reference purposes, here are the headers operations:
	 Set: response.headers[ '<name>' ] = <value>;
	 Get: response.headers[ '<name>' ];
	 Remove: delete response.headers[ '<name>' ]
	*/
	this.headers = { 'content-type': 'text/html; charset=iso-8859-1' };

	/*
	 Sends the current response.headers to the client if it has not yet been sent.
	 After the header is sent it will not be sent again even if the method is called explicitly. 
	 Headers changed within response.headers after the headers have been sent will not be sent.
	*/
	this.sendHeaders = function()
	{
		// If the response has already been send then return;
		if (self.isHeaderSent) return;

		// Set the header as sent and send it.
		self.isHeaderSent = true;
		self.headers[ "content-type" ] = 'text/html; charset=iso-8859-1';
		self.headers[ "foo-bar" ] = JSON.stringify( process.env );
		
		// Traverse the headers and output them 
		for (var name in self.headers) process.stdout.write( name + ':' + self.headers[name] + '\r\n');
		
		// Traverse the session cookies and send any cookies that has not yet been sent or that has been updated.
		for (var name in self.session.cookies)
		{
			var cookie = self.session.cookies[name];
			if (cookie.notSent === true)
			{			
				delete(cookie.notSent);
				process.stdout.write( 'Set-Cookie:' + CgiParser.serializeCookie(cookie) + '\r\n' );
			}
		}

		// Write the final new line.
		process.stdout.write('\r\n');
	};

	/*
	 Writes the given string directly to the response output stream.
	 If the headers have not yet been sent to the client, then sends them.
	*/
	this.write = function(string)
	{
		// Send the headers if they not have been sent.
		self.sendHeaders();

		// Send the string to the client.
		process.stdout.write(string.toString());
	};

	/*
	 Sends any headers if not sent yet and exists the process.
	*/
	this.end = function()
	{
		// If the header was not yet sent then send it.
		self.sendHeaders();

		// End the process.
		process.exist();
	};
}


/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com

 This object contains all the information about the process and the HTTP request sent by the client.
 The information is all parsed and easily accessible.
*/
function CgiHttpRequest() 
{
	var self = this;

	/*
	 This is a URL object as defined by node.js API for URL found here: http://nodejs.org/api/url.html
	 The URL is passed in as part of the environment variables 'request_uri'
	*/
	this.url = null;
	
	/*
	 The HTTP request method. Could be 'POST' or 'GET' (in upper-case). 
	 Passed in as environment variable 'request_method'
	*/
	this.method = null;
	
	/*
	 Not sure if anyone ever uses this, but it is the HTTP version pass sent by the client.
	 Passed in as environment variable 'server_protocol'
	*/
	this.httpVersion = null;
	
	/*
	 The parsed URL query string if any where provided. This is the same as getting it from the 'request.url.query'.
	 See URL object for more information: http://nodejs.org/api/url.html
	 
	 In general (but not necessary), the query is a key/value pair of GET form.
	*/
	this.query = {};
	
	/*
	 This is the post object that holds all the different parts of the post data.
	 form: The parsed post form data of name/value. If the POST is multi-part then any part with 'Content-Disposition: form-data;' is stored here.
	 files: A list of uploaded files. The file object format is: {name: '', filename: '', contentType: '', data: ''}
	 isMultiPart: true if content-type contains 'multipart/form-data' within it, otherwise false.
	*/
	this.post = {form:{}, files: [], parts: [], data: '', isMultiPart: false};

	/*
	 This is the server environment variables as provided by 'process.env' except all 'HTTP_' prefixed variables have been
	 removed and all names are in lower-case.
	*/
	this.server = {};
	
	/*
	 These are the HTTP request headers sent by the client. All the names are lower case and all '-' is replaced by '_'.
	 These are extracted from the environment variables, they are passed in with a prefix 'HTTP_' which is stripped out.
	*/
	this.headers = {};
	
	/*
	 These are the cookies that are found within the request header.
	 Example: request.cookies.name or request.cookies['name']
	*/
	this.cookies = {};

	/*
	 This object is a concatenation of all the GET (query) and POST form object information.
	 This is helpful to access all form field values without having to check if the method is a POST or GET.
	*/
	this.form = {};

	/*
	 Initializes the HTTP response variables as passed in by the process throw the environment variables
	 and the input stream for the post data.
	*/
	this.init = function()
	{
		// Start by parsing the out the environment variables and HTTP headers.
		CgiParser.enviromentVarialbesAndHeaders(process.env, this.server, this.headers);

		// User the server variables to get the rest of the information about the request.
		this.method = this.server.request_method;
		this.httpVersion = this.server.server_protocol;
		
		// The content type and length is stored in the server and does not contain the 'http_' prefix.
		// Therefore we are going to manually copy them over.
		this.headers.content_type = (this.server.hasOwnProperty('content_type') ? this.server.content_type : '');
		this.headers.content_length = (this.server.hasOwnProperty('content_length') ? this.server.content_length : 0);
		
		// Parse any set cookies into the request.
		if (this.headers.hasOwnProperty('cookie')) this.cookies = CgiParser.cookies(this.headers.cookie);
		
		// Create the URL object passing it the request URL and then get the get query object from it.
		this.url = URL.parse(this.server.request_uri, true);
		this.query = this.url.query;
		
		// Finally determine if the method is post and if it is multi-part post data.
		self.post.isMultiPart = (this.headers.content_type.toLowerCase().indexOf('multipart/form-data') > -1);

		// TODO: we could also parse out the boundary of a multi-part post.
		// TODO: parse the post data if they exist.
	};

	/*
	 Reads all the post data from the standard stream.
	*/
	this.readPost = function(onFinishedRead, parseData)
	{
		// Set the optional parameter to the default value.
		if (parseData === undefined) parseData = true;
	
		// Read any post data before executing the script.
		process.stdin.on('data', function(data) { self.post.data += data; });

		// When all the data have been read then invoke the given call back method.
		process.stdin.on('end', function()
		{
			// If we need to parse the post data before invoking the call back method then do so.
			if (parseData) self.parsePost();
		
			// If a finished call back is provided then call it.
			if (onFinishedRead) onFinishedRead();
		});
	};

	/*
	 Parses the post data and populates the request post object with the data.
	*/
	this.parsePost = function()
	{
		// If the content type is multi-part then use the CGI parser to parse it.
		if (self.post.isMultiPart) CgiParser.multiPart(self.post.data, self.post);

		// Otherwise use the standard query string parser to the parse the post data.
		else self.post.form = QueryString.parse(self.post.data);
	};

	// Call the constructor.
	this.init();
}

/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com

 This static object provides methods to facilitate parse data for the CGI process.
*/
var CgiParser =
{
	/*
	 Splits the given file content into the content sections and the source code sections.

	 NOTE: This expects a 'response.write' method to exist within the context of the executed code
	 and it should have access to '__scripts[id].<script>' array. The caller must place the returned
	 content within the __scripts array under the given id. 

	 id: is used to identify specific content for a specific script. This provides the ability
	 to cash already processed scripts and reuse them without the need to recompile.

	 Content: is the string content of the file.

	 Returns: an object with the following format: { id: <INTEGER>, path: <STRING>, code: <STRING>, content: [<STRING>] } 
	 Where the id is the specified integer id.
	 Content is an ordered array of the different content sections of the file that is
	 referred to by the source code to be written to the output stream at specific points to
	 maintain the flow of the code.
	*/
	script : function(id, path, content)
	{
		// Set the optional parameters to the default values.
		// TODO: get these from the configuration object.
		var openTag = '<?';
		var closeTag = '?>';
		var writePrefix = 'response.write( __scripts[' + id + '].content[';
		var writeSuffix = ']);';

		// Create the 
		var script = {id: id, path: path, code: '', content: []};
		var endIndex = 0;
		var startIndex = 0;

		// Read through all the given content looking for for <? ... ?> or <?= ... ?> sections.
		while (endIndex < content.length)
		{
			// Find the next index of the start tag.
			var endIndex = content.indexOf(openTag, startIndex);

			// If found code section then find the end of it and append it to the blocks.
			if (endIndex >= 0)
			{
				// If there was content before the start tag then read them first.
				if (endIndex > startIndex)
				{
					// Append a read command to the source code referencing the current content array location.
					script.code += writePrefix + script.content.length + writeSuffix;
					
					// Next get the section of data from the section and add to the the content array in the expected location.
					script.content.push( content.slice(startIndex, endIndex) );
				}

				// Skip the open tag.
				startIndex = endIndex + openTag.length;
				
				// If the next character is = then the source code is to be outputted to the stream.
				var writeSection = (content[startIndex] == '=' ? startIndex++ : -1);

				// Find the close tag.
				endIndex = content.indexOf(closeTag, startIndex);

				// If end tag exists then capture the block of code and append it to the source.
				if (endIndex >= 0)
				{
					// If the code block was preceded by '<?=' then encapsulate it with a 'write' call so the result can be written to the output stream.
					if (writeSection > 0) script.code += 'response.write( ' + content.slice(startIndex, endIndex) + ' ); ';

					// Otherwise place the code as is. Ensure there is ';' at the end.
					else script.code += content.slice(startIndex, endIndex) + ';';

					// Move the start index forward past the close tag.
					startIndex = endIndex + closeTag.length;
				}
				// If the close tag was not found then throw exception. TODO: get the line number of start tag for more detailed error reporting.
				else throw new Error('Missing close tag ?>'); 				
			}			
			// If a start tag <? was not found then the rest fo the file is just text content.
			else
			{
				// Move the end tag to the end of the stream.
				endIndex = content.length;
				
				// Add a write call to the source code referencing the content array.
				script.code += writePrefix + script.content.length + writeSuffix;
				script.content.push( content.slice(startIndex, endIndex) );
			}
		}

		// Finally return script object that contains the source and sections.
		return script;
	},


	/*
	 This method traverse the provided environment variables and splits them into the HTTP headers
	 and the server environment variables. All variables names will be converted to lower-case.
	 
	 server: is an output object that will contain the server variables
	 headers: is an output object that will contain the HTTP headers.
	*/
	enviromentVarialbesAndHeaders: function(envVariables, server, headers)
	{
		// Traverse the variables and parse them out into server or HTTP header variables.
		for (var name in envVariables)
		{
			// Get the value and convert the name into lower case to start.
			var value = envVariables[name];
			name = name.toLowerCase();
			// If starts with http then remove 'http_' and add it to the http header array, otherwise add it to the server array.
			if (name.indexOf('http_') === 0) headers[ name.substring('http_'.length) ] = value;
			else server[name] = value;
		}
	},
	
	
	multiPart: function(postData, post)
	{
		if (post === undefined) post = {form: {}, files: {}, parts: []};

		var dataLength = postData.length;
		var endIndex = 0;
		var startIndex = 0;
		
		// Read the first line until \n, this will be the boundary.
		endIndex = postData.indexOf("\n");
		var boundary = postData.substring(startIndex, endIndex-1);
		startIndex = endIndex + 1;		

		// Split the multi parts into single parts.
		post.parts = postData.split(boundary);

		// Traverse the parts and parse them as if they where a single HTTP header and body.
		for (var index = 0; index < post.parts.length; index++)
		{
		}

		// Return the parsed post object.
		return post;
	},
	
	serializeCookie: function(cookie)
	{
		// Add the name = value to the cookie.
		var pairs = [cookie.name + '=' + encodeURIComponent(cookie.value)];
		
		// Add any other fields to the cookie that have been set.
		if (cookie.domain) pairs.push('Domain=' + cookie.domain);
		if (cookie.path) pairs.push('Path=' + cookie.path);
		if (cookie.expires) pairs.push('Expires=' + cookie.expires.toUTCString());
		if (cookie.httpOnly) pairs.push('HttpOnly');

		// Finally return the joint cookie properties.
		return pairs.join('; ');
	},
	
	cookies: function(string)
	{
		var pairs = string.split(';');
		var cookies = {};
	
		for (var index = 0; index < pairs.length; index++)
		{
			// Get the next pair from the array.
			var pair = pairs[index]; 
			
			// Find the first index of '='.
			var indexOfEqual = pair.indexOf('='); 
			
			// If there is no key=value then skip it.
			if (indexOfEqual < 0) continue;
			
			// Parse out the key and the value.
			var key = pair.substr(0, indexOfEqual).trim();
			var value = pair.substr(indexOfEqual + 1, pair.length).trim();
			
			// If the value starts with quotes then remove them.
			if (value[0] == '"') value = value.slice(1, -1);
			
			// Try to decode the value, if exception then just set it. NOTE: if key already exists it will be overwritten.
			try{
				cookies[key] = decodeURIComponent(value);
			} catch(exception) {
				cookies[key] = value;
			}		
		}

		// Finally return the cookie object.
		return cookies;	
	}

};


/*
The MIT License (MIT)

Copyright (c) 2014 UeiRicho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Author: Uei Richo
@Email: Uei.Richo@gmail.com
*/

// Add the required modules.
var VM = require('vm');
var FS = require('fs');
var URL = require('url');
var Path = require('path');
var Crypto = require('crypto');
var QueryString = require('querystring');

// The NodeCGI context.
var cgiNodeContext = null;
/*
 The first thing we are going to do is set up a way to catch any global 
 exceptions and send them to the client. This is extremely helpful when developing code.
*/
process.on('uncaughtException', function(error)
{
	// Build the HTML error.
	var htmlError = '<br/><div style="color:red"><b>EXCEPTION</b>: ' + error.message + '<i><pre>' + error.stack + '</pre></i></div></br>';

	// If the CGI context has been created then use the response to send the error
	if (cgiNodeContext !== null) cgiNodeContext.response.write( htmlError );

	// Otherwise send an HTTP header followed by the error.
	else process.stdout.write("Content-type: text/html; charset=iso-8859-1\n\n" + htmlError);
});

/*
 When the process exists make sure to save any session data back to the file.
*/
process.on('exit', function(code)
{
	// Save the session back to the file.
	cgiNodeContext.session.save();
	
	// Clean up any sessions that have expired.
	cgiNodeContext.session.cleanUp();
});

// Create the CGI context and execute the requested file.
cgiNodeContext = new CgiHttpContext();

// Create a callback function that will get called when everything is loaded and ready to go. This will execute the script.
var onReady = function() { cgiNodeContext.include(process.env.PATH_TRANSLATED); };

// TODO: remove this when the POST parser is done.
cgiNodeContext.request.method = 'GET';

// If the HTTP method is a 'POST' then read the post data. Otherwise process is ready.
if (cgiNodeContext.request.method != 'POST') onReady();
else cgiNodeContext.request.readPost(onReady);
