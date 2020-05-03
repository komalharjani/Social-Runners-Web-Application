(function() {

    class User {
        constructor(name, password, email, age) {
            // These fields have to be given when creating an object
            this.name = name;
            this.password = password;
            this.email = email;
            this.age = age;
        }

        // Getters and setters
        get name() { return this._name; }
        set name(newName)   { 
            if ( typeof(newName) === 'string' && newName != "" ) this._name = newName; 
			else throw new Error("Invalid name");
        }

        get password() { return this._password; }
        set password(newPassword) { 
            if ( typeof(newPassword) === 'string' && newPassword != "" ) this._password = newPassword; 
			else throw new Error("Invalid Password");
        } 

        get email() { return this._email; }
        set email(newEmail) { 
            if ( typeof(newEmail) === 'string' && newEmail != "" ) this._email = newEmail; 
			else throw new Error("Invalid Email");
        } 

        get age() { return this._age; }
        set age(newAge) { 
            if ( typeof(newAge) === 'number' && newAge != "" ) this._age = newAge; 
			else throw new Error("Invalid Age");
        } 
	
		// convert to json 
        toJSON() {
            let result = {};
            result.name = this.name;
            result.password = this.password;
            result.email = this.email;
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
            if (!json.hasOwnProperty('password')) {
				throw new Error("Missing password");
            }
            if (!json.hasOwnProperty('email')) {
				throw new Error("Missing email");
            }

			return new User(json.name, json.password, json.email);	
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
