
window.onload = function() {
    const getAllUsers = async function () {
        const getResponse = await fetch(`/getUsers`);
        getUsers = await getResponse.json();
        let name = getUsers.name;
        let age = getUsers.age;
        console.log(getUsers);
        document.getElementById("nameDisplay").innerHTML = name;
        document.getElementById("ageDisplay").append(age);
        console.log(getUsers.name, getUsers.age);
    }
    getAllUsers();
    
    }