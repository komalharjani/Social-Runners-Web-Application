(function() {

    class User {
        constructor(name, password) {
            // These fields have to be given when creating an object
            this.name = name;
            this.password = password;
        }

        // Getters and setters
        get name() { return this._name; }
        set name(newName)   { 
            if ( typeof(newName) === 'string' && newName != "" ) this._name = newName; 
			else throw new Error("Invalid name");
        }

        get password() { return this._password; }
        set password(newPassword)   { 
            if ( typeof(newPassword) === 'string' && newPassword != "" ) this._password= newPassword; 
			else throw new Error("Invalid email");
        }

		// convert to json 
        toJSON() {
            let result = {};
            result.name = this.name;
            result.password = this.password;
            return result;
        }

		// convert to string
        toJSONString() {
            return JSON.stringify(this.toJSON());
        }
		
		//build User from json
		static fromJSON(json) {
			if (!json.hasOwnProperty('name')) {
				throw new Error("Missing name");
            }

			return new User(json.name, json.password);	
        }
    }

    // We could use two different names here, but that would only make things more complicated
    var moduleExports = { User : User };

    // Check if we are running in a browser. If so, attach the exported closure to the main window.
    // Otherwise, use the node.js module exporting functionality. This way we can use this module both 
    // in the browser and on the server
    if (typeof __dirname == 'undefined')
        window.exports = moduleExports;
    else
        module.exports = moduleExports

}());
