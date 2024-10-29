let token = null;
let fullname = null;
let email = null;
let phone = null;

if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
    console.log("token: ", token);
} else {
    location.replace("/");
}

async function userData(accessToken) {
    const res = await axios.get("/user", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    const user = res.data;
    console.log(user);
    return res.data
}

async function createElements() {
    let response = await userData(token);

    const mainDiv = document.getElementById('mainContainer');

    const mb5Div = document.createElement('div');
    mb5Div.className = 'mb-5';

    const divName = document.createElement('div')
    divName.textContent = `${response.fullname}`;

    const divEmail = document.createElement('div');
    divEmail.textContent = `${response.email}`;

    const divPhone = document.createElement('div');
    divPhone.textContent = `${response.phone}`;

    mb5Div.appendChild(divName);
    mb5Div.appendChild(divPhone);
    mb5Div.appendChild(divEmail);

    mainDiv.appendChild(mb5Div);
}

createElements();
