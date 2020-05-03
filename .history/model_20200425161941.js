(function() {

    class User {
        constructor(name, password, email, age) {
            //These fields have to be given when creating an object
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
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if ($email.val() == '' || !re.test($email.val())) {
                this._email = newEmail
            }
			else throw new Error("Invalid Email");
        } 

        get age() { return this._age; }
        set age(newAge) { 
            let num = Number(newAge)
            if ( Number.isInteger(num) ) this._age = newAge; 
			else throw new Error("Invalid Age");
        } 
	
		// convert to json 
        toJSON() {
            let result = {};
            result.name = this.name;
            result.password = this.password;
            result.email = this.email;
            result.age = this.age;
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
            if (!json.hasOwnProperty('age')) {
				throw new Error("Missing age");
            }
			return new User(json.name, json.password, json.email, json.age);	
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
