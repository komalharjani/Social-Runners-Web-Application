(function () {

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
        set name(newName) {
            if (typeof (newName) === 'string' && newName != "") this._name = newName;
            else throw new Error("Invalid name");
        }

        get password() { return this._password; }
        set password(newPassword) {
            if (typeof (newPassword) === 'string' && newPassword != "") this._password = newPassword;
            else throw new Error("Invalid Password");
        }

        get email() { return this._email; }
        set email(newEmail) {
            var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (newEmail.match(validEmail)) {
                this._email = newEmail
            }
            else throw new Error("Invalid Email");
        }

        get age() { return this._age; }
        set age(newAge) {
            let num = Number(newAge)
            if (Number.isInteger(num)) this._age = newAge;
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

    class Run {
        //ID is automatic
        constructor(title, origin, destination, distance, pace, duration, date, startTime, description, meetingPointOne, meetingPointTwo, maxPeople, comments, email) {
            this.title = title;
            this.origin = origin;
            this.destination = destination;
            this.distance = distance;
            this.pace = pace;
            this.duration = duration;
            this.date = date;
            this.startTime = startTime;
            this.description = description;
            this.meetingPointOne = meetingPointOne;
            this.meetingPointTwo = meetingPointTwo;
            this.maxPeople = maxPeople;
            this.comments = comments;
            this.email = email;
        }

        toJSON() {
            let result = {};
            result.title = this.title;
            result.origin = this.origin;
            result.destination = this.destination;
            result.distance = this.distance;
            result.pace = this.pace;
            result.duration = this.duration;
            result.date = this.date;
            result.startTime = this.startTime;
            result.description = this.description;
            result.meetingPointOne = this.meetingPointOne;
            result.meetingPointTwo = this.meetingPointTwo;
            result.maxPeople = this.maxPeople;
            result.comments = this.comments
            result.email = this.email;
            return result;
        }

         // Getters and setters

         //Title - Validation done at client
         get title() { return this._title; }
         set title(newTitle) {
             this._title = newTitle;
         }

         //Origin - validation done at client
         get origin() { return this._origin; }
         set origin(newOrigin) {
             this._origin = newOrigin;
         }
 
         //Destination - validation done at client
         get destination() { return this._destination; }
         set destination(newDestination) {
             this._destination = newDestination;
         }

        //Distance - must be a number
        get distance() { return this._distance; }
        set distance(newDistance) {
            this._distance = newDistance;
        }
 
        //Pace - must be a number
        get pace() { return this._pace; }
        set pace(newPace) {
            this._pace = newPace;
        }

        //Duration can be String as It is hours and numbers - but doesn't require validation as it is a fixed value depending on
        //origin and destination input
         get duration() { return this._duration; }
         set duration(newDuration) {
             this._duration = newDuration;
         }

         //Date - required on client side
         get date() { return this._date; }
         set date(newDate) {
             this._date = newDate;
         }

         //Start time - validated on client side
         get startTime() { return this._startTime; }
         set startTime(newTime) {
             this._startTime = newTime;
         }
        
         //Description - no validation can be empty
         get description() { return this._description; }
         set description(newDescription) {
            this._description = newDescription;
         }

         //MP 1- Not Required
         get meetingPointOne() { return this._meetingPointOne; }
         set meetingPointOne(NewMeetingPointOne) {
             this._meetingPointOne = NewMeetingPointOne;
         }

         //MP 2- Not Required
         get meetingPointTwo() { return this._meetingPointTwo; }
         set meetingPointTwo(NewMeetingPointTwo) {
             this._meetingPointTwo = NewMeetingPointTwo;
         }

         //Max People - validated on client
         get maxPeople() { return this._maxPeople; }
         set maxPeople(newMaxPeople) {
             this._maxPeople = newMaxPeople;
         }

         //Comments
         get comments() { return this._comments; }
         set comments(NewComments) {
            this._comments = NewComments;
         }

         //Email 
         get email() { return this._email; }
         set email(NewEmail) {
            this._email = NewEmail;
         }

        // convert to string
        toJSONString() {
            return JSON.stringify(this.toJSON());
        }

        //build User from json
        static fromJSON(json) {
            return new Run(json.origin, json.destination, json.distance, json.pace, json.duration, json.date, json.startTime, json.description, json.meetingPointOne, json.meetingPointTwo, json.maxPeople, json.comments);
        }
    }

    class Comments {
        constructor(userId, info, date) {
            this.userId = userId;
            this.info = info;
            this.date = date;

    } 
}

    // We could use two different names here, but that would only make things more complicated
    var moduleExports = {
         User: User,
         Run: Run,
         Comments: Comments
         };

    // Check if we are running in a browser. If so, attach the exported closure to the main window.
    // Otherwise, use the node.js module exporting functionality. This way we can use this module both 
    // in the browser and on the server
    if (typeof __dirname == 'undefined')
        window.exports = moduleExports;
    else
        module.exports = moduleExports

}());
