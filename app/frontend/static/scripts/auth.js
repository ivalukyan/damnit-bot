let name = null;
let phone = null;
let email = null;

const signInButton = document.getElementById('signinButtonId') || null;
const signUpButton = document.getElementById('signupButtonId') || null;

const authButton = document.getElementById('AuthButtonId') || null;
const registrationButton = document.getElementById('RegistrationButtonId') || null;


async function login() {
    const phoneInput = document.getElementById('phone-input').value || "";

    if (phoneInput) {
        const payload = new URLSearchParams({
            username: phoneInput,
            password: "pass"
        });

        try {
            const response = await axios.post('/auth/token', payload, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            if (response.status === 200) {
                const token = response.data.access_token;
                localStorage.setItem("token", token);
                location.replace("/user/profile")
            } else {
                console.log("Phone input is uncorrect");
            }

        } catch (e) {
            console.log(e);
        }


    }
}

async function user(accessToken){
    await axios.get("/user", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
}

async function signUp() {
    const nameInput = document.getElementById('name-input').value || "";
    const phoneInput = document.getElementById('phone-input').value;
    const emailInput = document.getElementById('email-input').value || "";

    const payload = {
        fullname: nameInput,
        phone: phoneInput,
        email: emailInput
    }

    try {
        await axios.post('/auth/sign_up', payload).then(
            async function (response) {
                console.log(response);
            })
    } catch (e) {
        console.log(e);
    }

    //location.replace('/profile/');
}


async function activeSignInButton() {
    const registerContainer = document.getElementById('registrationContainer') || null;
    await removeElement(registerContainer);

    signInButton.style.backgroundColor = '#303131'
    signUpButton.style.backgroundColor = 'transparent';
    await createAuthElements();


}

async function activeSignUpButton() {
    const authContainer = document.getElementById('authContainer') || null;
    await removeElement(authContainer);

    signUpButton.style.backgroundColor = '#303131';
    signInButton.style.backgroundColor = 'transparent';
    await createRegistrationElement();
}


async function createAuthElements() {
    const mainContainer = document.getElementById('mainContainer');

    const divElem = document.createElement('div');
    divElem.className = 'mb-5';
    divElem.id = 'authContainer';

    const labelElem = document.createElement('label');
    labelElem.className = 'form-label';
    labelElem.htmlFor = 'phone-input';
    labelElem.textContent = 'Номер телефона';

    const inputPhoneElem = document.createElement('input');
    inputPhoneElem.className = 'input-form';
    inputPhoneElem.placeholder = '+7 (9XX) XXX XX XX';
    inputPhoneElem.type = 'text';
    inputPhoneElem.id = 'phone-input';
    inputPhoneElem.name = 'phone'
    inputPhoneElem.autocomplete = 'off';
    inputPhoneElem.required = true;

    const but = document.createElement('button');
    but.id = 'AuthButtonId';
    but.type = 'button';
    but.textContent = 'Войти';
    but.onclick = login;

    divElem.appendChild(labelElem);
    divElem.appendChild(inputPhoneElem);
    divElem.appendChild(but);

    mainContainer.appendChild(divElem);
}

async function createRegistrationElement() {
    const mainContainer = document.getElementById('mainContainer');

    const divElem = document.createElement('div');
    divElem.className = 'mb-5';
    divElem.id = 'registrationContainer';

    const divName = document.createElement('div');
    divName.className = 'mb-3';

    const divPhone = document.createElement('div');
    divPhone.className = 'mb-3';

    const divEmail = document.createElement('div');
    divEmail.className = 'mb-3';

    const labelNameElem = document.createElement('label');
    labelNameElem.className = 'form-label';
    labelNameElem.htmlFor = 'name-input';
    labelNameElem.textContent = 'ФИО';

    const inputNameElem = document.createElement('input');
    inputNameElem.className = 'input-form';
    inputNameElem.placeholder = 'Как вас зовут?';
    inputNameElem.type = 'text';
    inputNameElem.id = 'name-input';
    inputNameElem.name = 'name'
    inputNameElem.autocomplete = 'off';
    inputNameElem.required = true;

    divName.appendChild(labelNameElem);
    divName.appendChild(inputNameElem);

    const labelPhoneElem = document.createElement('label');
    labelPhoneElem.className = 'form-label';
    labelPhoneElem.htmlFor = 'phone-input';
    labelPhoneElem.textContent = 'Номер телефона';

    const inputPhoneElem = document.createElement('input');
    inputPhoneElem.className = 'input-form';
    inputPhoneElem.placeholder = '+7 (9XX) XXX XX XX';
    inputPhoneElem.type = 'text';
    inputPhoneElem.id = 'phone-input';
    inputPhoneElem.name = 'phone'
    inputPhoneElem.autocomplete = 'off';
    inputPhoneElem.required = true;

    divPhone.appendChild(labelPhoneElem);
    divPhone.appendChild(inputPhoneElem);

    const labelEmailElem = document.createElement('label');
    labelEmailElem.className = 'form-label';
    labelEmailElem.htmlFor = 'email-input';
    labelEmailElem.textContent = 'Электронная почта (необязательно)';

    const inputEmailElem = document.createElement('input');
    inputEmailElem.className = 'input-form';
    inputEmailElem.placeholder = 'E-mail';
    inputEmailElem.type = 'text';
    inputEmailElem.id = 'email-input';
    inputEmailElem.name = 'email'
    inputEmailElem.autocomplete = 'off';

    divEmail.appendChild(labelEmailElem);
    divEmail.appendChild(inputEmailElem);

    const but = document.createElement('button');
    but.id = 'RegistrationButtonId';
    but.type = 'button';
    but.textContent = 'Зарегистрироваться';
    but.onclick = signUp;

    divElem.appendChild(divName);
    divElem.appendChild(divPhone);
    divElem.appendChild(divEmail);
    divElem.appendChild(but);

    mainContainer.appendChild(divElem);
}

async function removeElement(element) {
    if (element) {
        element.remove();
    }
}

signInButton.style.transition = 'background-color 0.6s ease-in';
signUpButton.style.transition = 'background-color 0.6s ease-in';

signInButton.style.backgroundColor = '#303131';
signUpButton.style.backgroundColor = 'transparent';

signInButton.onclick = activeSignInButton;
signUpButton.onclick = activeSignUpButton;

authButton.onclick = login;
