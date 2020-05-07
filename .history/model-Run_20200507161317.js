(function () {

    class Run {
        constructor(origin, destination, pace) {
            //These fields have to be given when creating an object
            this.origin = origin;
            this.destination = destination;
            this.pace = pace;
        }

        // Getters and setters
        get origin() { return this._origin; }
        set origin(newOrigin) {
            if (typeof (newOrigin) === 'string' && newOrigin != "") this._origin = newOrigin;
            else throw new Error("Invalid Origin");
        }

        get destination() { return this._destination; }
        set destination(newDestination) {
            if (typeof (newDestination) === 'string' && newDestination != "") this._destination = newDestination;
            else throw new Error("Invalid Destination");
        }

        get pace() { return this._pace; }
        set pace(newPace) {
            let num = Number(newPace)
            if (Number.isInteger(num)) this._pace = newPace;
            else throw new Error("Invalid Pace");
        }

        // convert to json 
        toJSON() {
            let result = {};
            result.origin = this.origin;
            result.destination = this.destination;
            result.pace = this.pace;
            return result;
        }

        // convert to string
        toJSONString() {
            return JSON.stringify(this.toJSON());
        }

        //build User from json
        static fromJSON(json) {
            if (!json.hasOwnProperty('origin')) {
                throw new Error("Missing origin");
            }
            if (!json.hasOwnProperty('destination')) {
                throw new Error("Missing destination");
            }
            if (!json.hasOwnProperty('pace')) {
                throw new Error("Missing pace");
            }
            return new User(json.origin, json.destination, json.pace);
        }
    }


    // class Runs {
    //     constructor(name, password, email, age) {
    //         //These fields have to be given when creating an object
    //         this.name = name;
    //         this.password = password;
    //         this.email = email;
    //         this.age = age;
    //     }

    // }

    // We could use two different names here, but that would only make things more complicated
    var moduleExports = { User: User };

    // Check if we are running in a browser. If so, attach the exported closure to the main window.
    // Otherwise, use the node.js module exporting functionality. This way we can use this module both 
    // in the browser and on the server
    if (typeof __dirname == 'undefined')
        window.exports = moduleExports;
    else
        module.exports = moduleExports

}());
