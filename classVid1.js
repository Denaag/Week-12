//Completed House service(s)

class House { //this is the structure of our house
    constructor(name) {
        this.name = name; //the name
        this.rooms = []; //empty array of rooms
    }

    addRoom(name, area) { //method needed to add a room to the empty array this.rooms
        this.rooms.push(new Room(name, area)); // this.rooms gets pushed an instance of new room by activating the class Room (new Room(name, area))
    }
}

class Room { //structure of the room
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}

//how we are going to send the service - send the HTTP request
//we are using return below in our methods because we will use the methods; and wherever used we need that promised info to be returned - allow things to be reusable
class HouseService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/houses'; //root url for the endpoints we will use

    static getAllHouses() { //method - no parameter needed since we want all houses returned
        return $.get(this.url); //this is where it will return the jquery - this returns all the houses from that URL above ($.get(this.url))
    }

    static getHouse(id) { //this will give us the specific house we want to retrieve based on the ID from the API
        return $.get(this.url + `/${id}`);
    }

    static createHouse(house) { // this is going to take a house (an instance of our house class): it will take something that has a name and array from that class.
        return $.post(this.url, house); //using $.post will create house and post to API
    }

    //takes a house that will be updated - using ajax method on this one with jquery start. 
    static updateHouse(house) { //ajax here takes a few different parameters - 1st is an object (we will only use one for the example) which has multiple fields that make up the data needed to send this request.
        return $.ajax({
            url: this.url + `/${house._id}`, //this grabs ID from the house we want to update - have to use _id because that is the value the database used to automatically create our house
            dataType: 'json', //
            data: JSON.stringify(house), //this will take an object and convert it into a JSON string for sending it to the HTTP request - and that object we want to convert into JSON is the house that is passed in as the parameter
            contentType: 'application/json', //define content type
            type: 'PUT' //defining the type of HTTP verb this request is - this one is a put request
        });
    }

    static deleteHouse(id) { //all we need is the ID here; we don't need the actual HOUSE, we just need the ID used to be able to delete the house itself (the API reads info as an ID rather than house details)
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

//NOW creating the area for the DOM MANAGER class - hardwork done here

class DOMManager {
    static houses; //giving it a variable called houses - which will be used to represent all the houses in this class

    static getAllHouses() { // this will call the method getAllHouses in our House service above and then render it to the DOM
        HouseService.getAllHouses().then(houses => this.render(houses)); //we are calling on method getAllHouses (which makes that RETURN promise happen) and then .then uses that promise and what we get back we will call it houses - render doesn't exist yet
    }

    static render(houses) { //takes a list of houses and renders it to the DOM
        this.houses = houses; //this sets the static houses above - equal to whatever houses were passed into our render method
        $('#app').empty(); //grabs reference to app via its ID in the HTML file - the div we created - also the empty will clear it out every time we render it.
        for (let house of houses) { //using prepend so each new entry popups at the top
            $('app').prepend( //this is where we build the HTML for every house - we are doing this in our JS by using backticks below
                `<div id="${house._id}" class="card">
                    <div class="card-header">
                        <h2>${house.name}</h2>
                    </div>
                </div>
                `
            );
        }
    }
}

DOMManager.getAllHouses();