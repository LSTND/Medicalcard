import {
    deleteCards,
    getAllCards,
    checkToken,
    loginFormSubmitHandler,
    formVisitHandler,
} from "./Utilities.js";
import FormLogin from "./FormLogin.js";
import Modal from "./Modal.js";
import CreateCards from "./cards.js";
import { CARD_CONTAINER, searchForm } from "./constants.js";
import Filter from "./Filter.js";
import FormVisit from "./FormVisit.js";

if (checkToken()) {
    getAllCards().then((data) => {
        console.log(data);
        if (data.length > 0) {
            localStorage.setItem("cards", JSON.stringify(data));
            CARD_CONTAINER.innerHTML = "";
            data.forEach((el) => {
                const card = new CreateCards(el);
                CARD_CONTAINER.append(card.createCard());
                card.showHideInfo();
                card.deleteCard(deleteCards);
                card.editCard();
            });
            searchForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const cards = JSON.parse(localStorage.getItem("cards"));
                Filter.use(cards);
            });
        }
    });
} else {
    const btn = document.querySelector("#buttonLogin");
    btn.addEventListener("click", () => {
        const formLogin = new FormLogin("login", loginFormSubmitHandler);
        const newLoginModal = new Modal({
            headerTitle: "Login",
            body: formLogin.render(),
            user: formLogin.renderLoginForm(),
            closeOutside: true,
        });
        document.body.append(newLoginModal.render());
    });
}
const btnCreate = document.querySelector("#buttonCreateCard");
btnCreate.addEventListener("click", () => {
    const formCreate = new FormVisit("Create", formVisitHandler);
    const formVisit = new Modal({
        headerTitle: "Login",
        body: formCreate.render(),
        user: formCreate.renderFormVisit(),
        closeOutside: true,
    });
    document.body.append(formVisit.render());
});
