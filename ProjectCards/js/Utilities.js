import request from "./request.js";
import { LOGIN_URL, BASE_URL, CARD_CONTAINER } from "./constants.js";
import CreateCards from "./cards.js";

/*
Функция getToken делает запрос на токен
*/
export function getToken({ email, password }) {
    return request(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then((response) => response.text());
}

/*
Функция loginFormSubmitHandler получает токен по данным из формы логина. 
Функция в качестве параметра принимает обьект
{ email: 'your@email.com', password: 'password' }
куда с формы передается введенная почта и пароль

closeForm - метод, который закрывает форму

*/

export function loginFormSubmitHandler({ email, password }, closeForm) {
    getToken({ email, password })
        .then((data) => {
            closeForm();
            localStorage.setItem("token", data);

            document.querySelector("#buttonLogin").setAttribute("hidden", "");

            document
                .querySelector("#buttonCreateCard")
                .removeAttribute("hidden");
        })
        .catch((e) => {
            alert(e.message);
        });
}

/*
Функция для запроса всех карточек
*/
export function getAllCards() {
    const token = localStorage.getItem("token");
    return request(BASE_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => response.json());
}

/*
Функция для вывода карточек
*/
export function checkToken() {
    if (localStorage.getItem("token")) {
        document.querySelector("#buttonLogin").setAttribute("hidden", "");
        document.querySelector("#buttonCreateCard").removeAttribute("hidden");
        return true;
    }
    return false;
}

/*
Запрос для создания карточки
*/
export function createCard(card) {
    const token = localStorage.getItem("token");
    return request(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(card),
    }).then((response) => response.json());
}

/*
Функция formVisitHandler получает данные из формы карточки визита. 
Функция в качестве параметра принимает обьект
с данными карточки

closeForm - метод, который закрывает форму

*/
export function formVisitHandler(card, closeForm) {
    createCard(card)
        .then((data) => {
            closeForm();
            const card = new CreateCards(data);
            const cards = JSON.parse(localStorage.getItem("cards"));

            cards.push(data);
            localStorage.setItem("cards", JSON.stringify(cards));
            if (CARD_CONTAINER.querySelector("#placeholder")) {
                CARD_CONTAINER.innerHTML = "";
            }
            CARD_CONTAINER.append(card.createCard());
            card.showHideInfo();
            card.deleteCard(deleteCards);
            card.editCard();
        })
        .catch((e) => {
            alert(e.message);
        });
}

/*
Запрос для удаления карточки
*/
export function deleteCards(id) {
    const token = localStorage.getItem("token");
    return request(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

/*
Изменение данных карточки(редактирование)
*/
export function editingCard(id, cardObj) {
    const token = localStorage.getItem("token");
    return request(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cardObj),
    }).then((response) => response.json());
}

export function getEmptyTemplate() {
    return ` <section class="images pt-3" id="placeholder">
    <div class="images-container mx-auto " style="width: 25rem;">
        <img src="https://www.englishdom.com/dynamicus/blog-post/000/002/383/1637751298_content_700x455.jpg"
            class="card-img-top mb-4 " alt="">
        <p class="images-text text-center fs-3 text-light"> No items have been added</p>
    </div>
</section>`;
}
