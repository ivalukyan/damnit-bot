import {useState} from "react";


const Person = () => {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    const requestApplicationForm = async () => {

        const payload = {
            fullname: fullname,
            phone: phone,
            contact: contact,
            email: email || ""
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        };

        const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/application_form/person", requestOptions);
        if (!response.ok) {
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
                        onChange={(e) => {
                            setFullname(e.target.value)
                        }}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Номер телефона</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="+7 9ХХ ХХХ ХХ ХХ"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="control">
                    <label className="label">Где удобнее связаться?</label>
                    <label className="label-radio">
                        <input
                            className="radio-input"
                            type="radio"
                            name="radio"
                            value="telegram"
                            checked={contact === "telegram"}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <span className="text-radio">Telegram</span>
                    </label>
                    <label className="label-radio">
                        <input
                            className="radio-input"
                            type="radio"
                            name="radio"
                            value="whatsapp"
                            checked={contact === "whatsapp"}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <span className="text-radio">WhatsApp</span>
                    </label>
                </div>
                <div className="field">
                    <label className="label">Электронная почта(необязательно)</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        autoComplete="off"
                        required
                    />
                </div>
                <button className="button is-primary" type="sumbit">Отправить</button>
            </form>
        </div>
    );
}

export default Person