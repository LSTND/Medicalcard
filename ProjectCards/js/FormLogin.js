import Form from "./Form.js";
import Modal from "./Modal.js";
import { loginFormSubmitHandler } from "./Utilities.js";

export default class FormLogin extends Form {
    constructor(submitTitle, formHandler) {
        super(submitTitle, formHandler);
        this.formHandler = formHandler;
    }
    renderLoginForm() {
        const inputEmail = document.createElement("input");
        const inputPassword = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.placeholder = "Your Email";
        inputPassword.type = "password";
        inputPassword.placeholder = "Your Password";
        this.form.append(inputEmail);
        this.form.append(inputPassword);
        this.btn.addEventListener("click", (event) => {
            event.preventDefault();

            this.formHandler(
                { email: inputEmail.value, password: inputPassword.value },
                this.clouseModul.bind(this)
            );
        });
    }
    clouseModul() {
        console.log(this);
        console.log(this.form);
        const modal = this.form.closest(".modal");
        modal.remove();
    }
}

//класс для создания формы логина
