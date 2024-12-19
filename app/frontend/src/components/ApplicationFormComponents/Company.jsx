import {useState} from "react";


const Company = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    const requestApplicationForm = async () => {

        const payload = {
            fullname: fullname,
            email: email
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        };

        const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/application_form/company", requestOptions);
        if (!response.ok){
            console.log("Плохой запрос");
        } else {
            const data = await response.json()
            console.log(data.message)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        requestApplicationForm();
    };

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">ФИО</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Как вас зовут?"
                        value={fullname}
                        onChange={(e) => {setFullname(e.target.value)}}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Электронная почта</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        autoComplete="off"
                        required
                    />
                </div>
                <button className="button is-primary" type="sumbit">Отправить</button>
            </form>
        </div>
    );
}

export default Company;