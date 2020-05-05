window.onload = function() {
    const getAllUsers = async function () {
        const getResponse = await fetch(`/getUsers/${id}`);
        console.log(getResponse);
        getUsers = await getResponse.json();
        let name = getUsers.name;
        let age = getUsers.age;
        let email = getUsers.email;
        document.getElementById("nameDisplay").innerHTML = name;
        document.getElementById("ageDisplay").append(age);
        console.log(getUsers.name, getUsers.age);
    }
    getAllUsers();
    }


function displayUser() {
    fetch (`getUsers/${id}`), {
        method: 'POST',
        headers: {}
    }
}