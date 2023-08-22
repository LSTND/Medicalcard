import { deleteCards } from "./Utilities.js";
import CreateCards from "./cards.js";
import { CARD_CONTAINER, searchForm } from "./constants.js";

export default class Filter {
    static use(cards) {
        const byText = searchForm.querySelector("#inputText2");
        const byStatus = searchForm.querySelector("#status__filter");
        const byPriority = searchForm.querySelector("#priority__filter");

        let cardsFiltered = cards;
        if (byText.value.trim() !== "") {
            cardsFiltered = cardsFiltered.filter((card) => {
                if (
                    card.fio.includes(byText.value) ||
                    card.purpose.includes(byText.value) ||
                    card.describe.includes(byText.value)
                ) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        if (byStatus.options[byStatus.selectedIndex].value !== "0") {
            cardsFiltered = cardsFiltered.filter(
                (card) =>
                    card.searchStatus ===
                    byStatus.options[byStatus.selectedIndex].value
            );
        }

        if (byPriority.options[byPriority.selectedIndex].value !== "0") {
            cardsFiltered = cardsFiltered.filter(
                (card) =>
                    card.priority ===
                    byPriority.options[byPriority.selectedIndex].value
            );
        }

        CARD_CONTAINER.innerHTML = "";
        cardsFiltered.forEach((el) => {
            const card = new CreateCards(el);
            CARD_CONTAINER.append(card.createCard());
            card.showHideInfo();
            card.deleteCard(deleteCards);
            card.editCard();
        });
    }
}
