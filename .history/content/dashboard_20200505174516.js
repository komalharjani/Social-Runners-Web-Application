window.onload = function() {
    const getAllUsers = async function (res) {
        const getResponse = await fetch(`/getUsers/${res.email}`);
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