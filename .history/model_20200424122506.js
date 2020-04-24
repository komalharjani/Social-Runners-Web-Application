(function() {

    class User {
        constructor(name, email, password) {
            // These fields have to be given when creating an object
            this.name = name;
            this.email = email;
			this.password = password;
        }

        // Getters and setters
        get name() { return this._name; }
        set name(newName)   { 
            if ( typeof(newName) === 'string' && newName != "" ) this._name = newName; 
			else throw new Error("Invalid name");
        }

        get email() { return this._email; }
        set email(newEmail) { 
            if ( typeof(newEmail) === 'string' && newEmail != "" ) this._email = newEmail; 
			else throw new Error("Invalid type");
        } 
		
		get password() { return this._password; }
        set password(newPassword) {
			let num = Number(newPassword);
			if ( typeof(newEmail) === 'string' && newEmail != "" ) this._email = newEmail; 
			else throw new Error("Invalid type");
        } 

		// convert to json 
        toJSON() {
            let result = {};
            result.name = this.name;
            result.type = this.email;
			result.year = this.password;
            return result;
        }

		// convert to string
        toJSONString() {
            return JSON.stringify(this.toJSON());
        }
		
		//build Film from json
		static fromJSON(json) {
			if (!json.hasOwnProperty('name')) {
				throw new Error("Missing name");
			}
            if (!json.hasOwnProperty('type')) {
				throw new Error("Missing type");
			}
			if (!json.hasOwnProperty('year')) {
              	throw new Error("Missing year");
			}

			return new Film(json.name, json.type, json.year);	
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