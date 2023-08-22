//файлик для переменных
const BASE_URL = "https://ajax.test-danit.com/api/v2/cards"; // url for Requests to cards
const LOGIN_URL = `${BASE_URL}/login`; // url for Requests to login
const CARD_CONTAINER = document.querySelector("#cards-container");
const searchForm = document.querySelector("#searchForm");

export { BASE_URL, LOGIN_URL, CARD_CONTAINER, searchForm };
