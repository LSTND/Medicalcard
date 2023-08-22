import { editingCard, getEmptyTemplate } from "./Utilities.js";
import { CARD_CONTAINER } from "./constants.js";

export default class CreateCards {
    constructor({
        fio,
        doctor,
        purpose,
        describe,
        priority,
        normPressure,
        bodyMass,
        prevDiseases,
        age,
        lastVisit,
        id,
    }) {
        this.fio = fio;
        this.doctor = doctor;
        this.purpose = purpose;
        this.describe = describe;
        this.priority = priority;
        this.normPressure = normPressure;
        this.bodyMass = bodyMass;
        this.prevDiseases = prevDiseases;
        this.age = age;
        this.lastVisit = lastVisit;
        this.id = id;
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "col-sm-3";
    }
    createCard() {
        let addInfo = "";
        if (this.doctor === "Кардиолог") {
            addInfo = ` <li class="card-text mb-4"><span class="text-info fw-bold" >Обычное давление:</span> <span id="normPressure"> ${this.normPressure}</span></li>
            <li class="card-text mb-4"><span class="text-info fw-bold" >Индекс массы тела:</span> <span id="bodyMass"> ${this.bodyMass}</span></li>
            <li class="card-text mb-4"><span class="text-info fw-bold" >Перенесенные заболевания сердечно-сосудистой системы:</span> <span id="prevDiseases"> ${this.prevDiseases}</span></li>
            <li class="card-text mb-4"><span class="text-info fw-bold" >Возраст:</span> <span id="age"> ${this.age}</span></li>`;
        } else if (this.doctor === "Стоматолог") {
            addInfo = ` <li class="card-text mb-4"><span class="text-info fw-bold" >Дата последнего посещения:</span> <span id="lastVisit"> ${this.lastVisit}</span></li>`;
        } else if (this.doctor === "Терапевт") {
            addInfo = `<li class="card-text mb-4"><span class="text-info fw-bold">Возраст:</span> <span id="age"> ${this.age}</span></li>`;
        }
        this.cardDiv.innerHTML = `
                <div class ="bg-light border rounded" id="${this.id}" >
                <div class="position-relative">
                <button class="btn btn-outline-info position-absolute top-0 end-0 border-0 fw-bold" data-id="delete-btn">x</button>
              </div>
                  <div class="card-body ">
                    <h5 class="card-title ml-2" id="fio">${this.fio}</h5>     
                    <p class="card-text  fw-bold" id="doctor">${this.doctor}</p>
                    <btn class="btn btn-info text-light d-flex justify-content-center" data-id="show-more-btn">Show more</btn>
                    <button class="btn btn-outline-info mr-0 border-0 fw-bold d-none" data-id="editCard"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
              </svg></button>
                  </div>
                  <ul class="d-none position-relative" data-id="hide-info">
                <li class="card-text mb-4" ><span class="text-info fw-bold">Цель визита:</span> <span id="purpose"> ${this.purpose}</span></li>
                  <li class="card-text mb-4"><span class="text-info fw-bold" >Описание визита:</span> <br> <span id="describe"> ${this.describe}</span> </li>
                  <li class="card-text mb-4"><span class="text-info fw-bold" >Срочность:</span> <span id="priority"> ${this.priority}</span></li>
                  ${addInfo}
                </ul> 
              <button class="btn btn-outline-info  border-0 fw-bold d-none" data-id="saveCard"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg></button>
            <btn class="btn btn-info text-light d-flex justify-content-center d-none" data-id="hide-btn">Hide</btn>
            </div>  `;
        return this.cardDiv;
    }
    showHideInfo() {
        const parent = this.cardDiv;
        const showMoreBtn = parent.querySelector(`[data-id = 'show-more-btn']`);
        const editBtn = parent.querySelector("[data-id = 'editCard']");
        const hideBtn = parent.querySelector("[data-id = 'hide-btn']");
        const hideInfo = parent.querySelector("[data-id = 'hide-info']");

        showMoreBtn.onclick = () => {
            showMoreBtn.classList.toggle("d-none");
            hideBtn.classList.toggle("d-none");
            hideInfo.classList.remove("d-none");
            editBtn.classList.remove("d-none");
        };

        hideBtn.onclick = () => {
            showMoreBtn.classList.toggle("d-none");
            hideBtn.classList.toggle("d-none");
            hideInfo.classList.add("d-none");
            editBtn.classList.add("d-none");
        };
    }
    deleteCard(deleteRequest) {
        const parent = this.cardDiv;
        const deleteBtn = parent.querySelector("[data-id = delete-btn]");
        deleteBtn.onclick = (e) => {
            deleteRequest(this.id)
                .then((data) => {
                    let cards = JSON.parse(localStorage.getItem("cards"));
                    cards = cards.filter((card) => card.id !== this.id);
                    localStorage.setItem("cards", JSON.stringify(cards));
                    if (cards.length === 0) {
                        CARD_CONTAINER.innerHTML = getEmptyTemplate();
                    }
                    deleteBtn.classList.add("d-none");
                    this.cardDiv.remove();
                })
                .catch((e) => {
                    alert(e.message);
                });
        };
    }
    editCard() {
        const parent = this.cardDiv;
        const editBtn = parent.querySelector(`[data-id = editCard]`);
        const saveBtn = parent.querySelector(`[data-id = saveCard]`);
        const hideBtn = parent.querySelector(`[data-id = hide-btn]`);
        let fio = parent.querySelector(`#fio`);
        let doctor = parent.querySelector(`#doctor`);
        let purpose = parent.querySelector(`#purpose`);
        let describe = parent.querySelector(`#describe`);
        let priority = parent.querySelector(`#priority`);
        let normPressure = parent.querySelector(`#normPressure`);
        let bodyMass = parent.querySelector(`#bodyMass`);
        let prevDiseases = parent.querySelector(`#prevDiseases`);
        let age = parent.querySelector(`#age`);
        let lastVisit = parent.querySelector(`#lastVisit`);

        editBtn.onclick = () => {
            console.log(this.id);
            editBtn.classList.toggle("d-none");
            saveBtn.classList.toggle("d-none");
            hideBtn.classList.toggle("d-none");
            const dataFio = fio.innerHTML;
            const dataDoctor = doctor.innerHTML;
            const dataPurpose = purpose.innerHTML;
            const dataDescribe = describe.innerHTML;
            const dataPriority = priority.innerHTML;

            fio.innerHTML = `<input type="text" value= "${dataFio}">`;
            doctor.innerHTML = `<input type="text" value= "${dataDoctor}">`;
            purpose.innerHTML = `<input type="text" value= "${dataPurpose}">`;
            describe.innerHTML = `<input type="text" value="${dataDescribe}">`;
            priority.innerHTML = `<input type="text" value="${dataPriority}">`;
            if (normPressure) {
                const dataNormPressure = normPressure.innerHTML;
                normPressure.innerHTML = `<input type="text" value="${dataNormPressure}">`;
            }
            if (bodyMass) {
                const dataBodyMass = bodyMass.innerHTML;
                bodyMass.innerHTML = `<input type="text" value="${dataBodyMass}">`;
            }
            if (prevDiseases) {
                const dataPrevDiseases = prevDiseases.innerHTML;
                prevDiseases.innerHTML = `<input type="text" value="${dataPrevDiseases}">`;
            }
            if (age) {
                const dataAge = age.innerHTML;
                age.innerHTML = `<input type="text" value="${dataAge}">`;
            }
            if (lastVisit) {
                const dataLastVisit = lastVisit.innerHTML;
                lastVisit.innerHTML = `<input type="text" value="${dataLastVisit}">`;
            }
        };
        saveBtn.onclick = () => {
            let editObj = {};
            saveBtn.classList.toggle("d-none");
            editBtn.classList.toggle("d-none");
            hideBtn.classList.remove("d-none");

            const saveFio = fio.querySelector("input").value;
            const saveDoctor = doctor.querySelector("input").value;
            const savePurpose = purpose.querySelector("input").value;
            const saveDescribe = describe.querySelector("input").value;
            const savePriority = priority.querySelector("input").value;
            editObj = {
                fio: saveFio,
                doctor: saveDoctor,
                purpose: savePurpose,
                describe: saveDescribe,
                priority: savePriority,
            };
            if (normPressure) {
                const saveNormPressure =
                    normPressure.querySelector("input").value;
                normPressure.innerHTML = saveNormPressure;
                editObj.normPressure = saveNormPressure;
            }
            if (bodyMass) {
                const saveBodyMass = bodyMass.querySelector("input").value;
                bodyMass.innerHTML = saveBodyMass;
                editObj.bodyMass = saveBodyMass;
            }
            if (prevDiseases) {
                const savePrevDiseases =
                    prevDiseases.querySelector("input").value;
                prevDiseases.innerHTML = savePrevDiseases;
                editObj.prevDiseases = savePrevDiseases;
            }
            if (age) {
                const saveAge = age.querySelector("input").value;
                age.innerHTML = saveAge;
                editObj.age = saveAge;
            }
            if (lastVisit) {
                const saveLastVisit = lastVisit.querySelector("input").value;
                lastVisit.innerHTML = saveLastVisit;
                editObj.lastVisit = saveLastVisit;
            }
            fio.innerHTML = saveFio;
            doctor.innerHTML = saveDoctor;
            purpose.innerHTML = savePurpose;
            describe.innerHTML = saveDescribe;
            priority.innerHTML = savePriority;
            editingCard(this.id, editObj);
        };
    }
}

// const newCard = new CreateCards({
//     id: "1",
//     fio: "Иванов Иван",
//     doctor: "Кардиолог",
//     purpose: "Обследование",
//     describe: "Обследование сердечной деятельности",
//     priority: "Обычная",
//     normPressure: "120/80",
//     bodyMass: "25",
//     prevDiseases: "Нет",
//     age: "40",
//     lastVisit: "01.01.2022",
// });

// const container = document.querySelector("#cards-container");
// const card = newCard.createCard();
// container.append(card);
// newCard.showHideInfo();
// newCard.deleteCard();
// newCard.editCard();

// const newCard1 = new CreateCards({
//   id: "2",
//   fio: "Иванов Иван",
//   doctor: "Кардиолог",
//   purpose: "Обследование",
//   describe: "Обследование сердечной деятельности",
//   priority: "Обычная",
//   normPressure: "120/80",
//   bodyMass: "25",
//   prevDiseases: "Нет",
//   age: "40",
//   lastVisit: "01.01.2022",
// });

// const card1 = newCard1.createCard();
// container.append(card1);
// newCard1.showHideInfo();
// newCard1.deleteCard()
// newCard1.editCard()
