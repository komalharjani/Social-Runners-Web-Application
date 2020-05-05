window.onload = function() {
    const getAllUsers = async function () {
        getUsers = await getResponse.json();
        let name = getUsers.name;
        let age = getUsers.age;
        const getResponse = await fetch(`/getUsers/${id}`);
        document.getElementById("nameDisplay").innerHTML = name;
        document.getElementById("ageDisplay").append(age);
        console.log(getUsers.name, getUsers.age);
    }
    getAllUsers();
    
    }