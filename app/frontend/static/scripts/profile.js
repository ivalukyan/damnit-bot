const token = localStorage.getItem('token') || null;


if (token) {
    console.log("token: ", token);
} else {
    location.replace("/");
}