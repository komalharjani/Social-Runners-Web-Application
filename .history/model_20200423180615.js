(function() {

    class User {
        constructor(name, type, year) {
            // These fields have to be given when creating an object
            this.name = name;
            this.type = type;
			this.year = year;
        }

        // Getters and setters
        get name() { return this._name; }
        set name(newName)   { 
            if ( typeof(newName) === 'string' && newName != "" ) this._name = newName; 
			else throw new Error("Invalid name");
        }

        get type() { return this._type; }
        set type(newType) { 
            if ( typeof(newType) === 'string' && newType != "" ) this._type = newType; 
			else throw new Error("Invalid type");
        } 
		
		get year() { return this._year; }
        set year(newYear) {
			let num = Number(newYear);
			if ( Number.isInteger(num) && num > 1900 && num <= new Date().getFullYear() ) {
				this._year = num;
			}
			else {
				throw new Error("Invalid year");
			}
        } 

		// convert to json 
        toJSON() {
            let result = {};
            result.name = this.name;
            result.type = this.type;
			result.year = this.year;
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

			return new User(json.name, json.type, json.year);	
        }
    }

    // We could use two different names here, but that would only make things more complicated
    var moduleExports = { Film : User };

    // Check if we are running in a browser. If so, attach the exported closure to the main window.
    // Otherwise, use the node.js module exporting functionality. This way we can use this module both 
    // in the browser and on the server
    if (typeof __dirname == 'undefined')
        window.exports = moduleExports;
    else
        module.exports = moduleExports

}());
