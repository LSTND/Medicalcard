import CreateCards from "./cards.js";
import Form from "./Form.js";
import Modal from "./Modal.js";

export default class FormVisit extends Form {
    constructor(submitTitle, formHandler) {
        super(submitTitle, formHandler);
    }
    renderFormVisit() {
        const obj = {};
        const selectDoctor = document.createElement("select");
        const eqipDoctor = document.createElement("option");
        const optionCardiolog = document.createElement("option");
        const optionDantist = document.createElement("option");
        const optionTerapevt = document.createElement("option");
        eqipDoctor.textContent = "Выберите врача";
        eqipDoctor.selected;
        eqipDoctor.value = "0";
        optionCardiolog.textContent = "Кардиолог";
        optionCardiolog.value = "1";
        optionDantist.textContent = "Стоматолог";
        optionDantist.value = "2";
        optionTerapevt.textContent = "Терапевт";
        optionTerapevt.value = "3";
        selectDoctor.prepend(optionCardiolog);
        selectDoctor.prepend(optionDantist);
        selectDoctor.prepend(optionTerapevt);
        selectDoctor.prepend(eqipDoctor);
        this.btn.remove();
        this.form.prepend(selectDoctor);
        selectDoctor.addEventListener("change", (item) => {
            this.form.innerHTML = "";
            this.form.prepend(selectDoctor);
            if (selectDoctor.value === "1") {
                this.cardiologMod(obj);
                console.log("cardiolog");
            } else if (selectDoctor.value === "2") {
                this.dantisMode(obj);
            } else if (selectDoctor.value === "3") {
                this.teraphevtMod(obj);
                console.log("Work Terapheft");
            }
        });
    }
    cardiologMod(obj) {
        const inputTitle = document.createElement("input");
        const inputBody = document.createElement("input");
        const selectPriority = document.createElement("select");
        const eqipPrior = document.createElement("option");
        const normal = document.createElement("option");
        const priority = document.createElement("option");
        const fullpriority = document.createElement("option");
        const fullName = document.createElement("input");
        const searchStatus = document.createElement("select");
        const eqipStatus = document.createElement("option");
        const open = document.createElement("option");
        const done = document.createElement("option");
        eqipStatus.textContent = "Поиск по статусу";
        eqipStatus.selected;
        open.textContent = "Open";
        done.textContent = "Done";
        eqipStatus.value = "0";
        open.value = "Open";
        done.value = "Done";
        searchStatus.prepend(open);
        searchStatus.prepend(done);
        searchStatus.prepend(eqipStatus);
        inputTitle.type = "text";
        inputTitle.name = "title";
        inputTitle.placeholder = "Цель Визита";
        fullName.placeholder = "ФИО";
        inputBody.placeholder = "Краткое описание визита";
        inputBody.type = "text";
        eqipPrior.textContent = "Срочность";
        eqipPrior.selected;
        normal.textContent = "Обычная";
        priority.textContent = "Приоритетная";
        fullpriority.textContent = "Неотложная";
        selectPriority.prepend(normal);
        selectPriority.prepend(priority);
        selectPriority.prepend(fullpriority);
        selectPriority.prepend(eqipPrior);
        this.form.prepend(searchStatus);
        this.form.prepend(selectPriority);
        this.form.prepend(inputBody);
        this.form.prepend(inputTitle);
        this.form.prepend(fullName);
        this.form.append(this.btn);
        this.form.classList.add("d-flex", "flex-column");
        this.form.style.gap = "30px";
        const cardiolog = "Кардиолог";
        const pressure = document.createElement("input");
        const bmi = document.createElement("input");
        const viruses = document.createElement("input");
        const age = document.createElement("input");
        this.form.prepend(pressure);
        this.form.prepend(bmi);
        this.form.prepend(viruses);
        this.form.prepend(age);
        pressure.placeholder = "Обычное давление";
        bmi.placeholder = "Индекс массы тела";
        viruses.placeholder =
            "Перенесенные заболевания сердечно-сосудистой системы";
        age.placeholder = "Возраст";
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            obj.purpose = inputTitle.value;
            obj.describe = inputBody.value;
            obj.priority = selectPriority.value;
            obj.fio = fullName.value;
            obj.normPressure = pressure.value;
            obj.bodyMass = bmi.value;
            obj.prevDiseases = viruses.value;
            obj.age = age.value;
            obj.doctor = cardiolog;
            obj.searchStatus = searchStatus.value;

            this.formHandler(obj, this.clouseModul.bind(this));
        });
    }
    teraphevtMod(obj) {
        const teraphevt = "Терапевт";
        const inputTitle = document.createElement("input");
        const inputBody = document.createElement("input");
        const selectPriority = document.createElement("select");
        const eqipPrior = document.createElement("option");
        const normal = document.createElement("option");
        const priority = document.createElement("option");
        const fullpriority = document.createElement("option");
        const fullName = document.createElement("input");
        const age = document.createElement("input");
        const searchStatus = document.createElement("select");
        const eqipStatus = document.createElement("option");
        const open = document.createElement("option");
        const done = document.createElement("option");
        eqipStatus.textContent = "Поиск по статусу";
        eqipStatus.selected;
        open.textContent = "Open";
        done.textContent = "Done";
        eqipStatus.value = "0";
        open.value = "Open";
        done.value = "Done";
        searchStatus.prepend(open);
        searchStatus.prepend(done);
        searchStatus.prepend(eqipStatus);
        age.placeholder = "Возраст";
        inputTitle.type = "text";
        inputTitle.name = "title";
        inputTitle.placeholder = "Цель Визита";
        fullName.placeholder = "ФИО";
        inputBody.placeholder = "Краткое описание визита";
        inputBody.type = "text";
        eqipPrior.textContent = "Срочность";
        eqipPrior.selected;
        normal.textContent = "Обычная";
        priority.textContent = "Приоритетная";
        fullpriority.textContent = "Неотложная";
        selectPriority.prepend(normal);
        selectPriority.prepend(priority);
        selectPriority.prepend(fullpriority);
        selectPriority.prepend(eqipPrior);
        this.form.prepend(searchStatus);
        this.form.prepend(selectPriority);
        this.form.prepend(inputBody);
        this.form.prepend(inputTitle);
        this.form.prepend(fullName);
        this.form.prepend(age);

        this.form.append(this.btn);
        this.form.classList.add("d-flex", "flex-column");
        this.form.style.gap = "30px";
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            obj.age = age.value;
            obj.purpose = inputTitle.value;
            obj.describe = inputBody.value;
            obj.priority = selectPriority.value;
            obj.fio = fullName.value;
            obj.doctor = teraphevt;
            obj.searchStatus = searchStatus.value;

            this.formHandler(obj, this.clouseModul.bind(this));
        });
    }
    dantisMode(obj) {
        const dantist = "Стоматолог";
        const inputTitle = document.createElement("input");
        const inputBody = document.createElement("input");
        const selectPriority = document.createElement("select");
        const eqipPrior = document.createElement("option");
        const normal = document.createElement("option");
        const priority = document.createElement("option");
        const fullpriority = document.createElement("option");
        const fullName = document.createElement("input");
        const lable = document.createElement("label");
        const data = document.createElement("input");
        const searchStatus = document.createElement("select");
        const eqipStatus = document.createElement("option");
        const open = document.createElement("option");
        const done = document.createElement("option");
        eqipStatus.textContent = "Поиск по статусу";
        eqipStatus.selected;
        open.textContent = "Open";
        done.textContent = "Done";
        eqipStatus.value = "0";
        open.value = "Open";
        done.value = "Done";
        searchStatus.prepend(open);
        searchStatus.prepend(done);
        searchStatus.prepend(eqipStatus);
        data.type = "date";
        lable.textContent = "Дата последнего посещения";
        inputTitle.type = "text";
        inputTitle.name = "title";
        inputTitle.placeholder = "Цель Визита";
        fullName.placeholder = "ФИО";
        inputBody.placeholder = "Краткое описание визита";
        inputBody.type = "text";
        eqipPrior.textContent = "Срочность";
        eqipPrior.selected;
        normal.textContent = "Обычная";
        priority.textContent = "Приоритетная";
        fullpriority.textContent = "Неотложная";
        selectPriority.prepend(normal);
        selectPriority.prepend(priority);
        selectPriority.prepend(fullpriority);
        selectPriority.prepend(eqipPrior);
        this.form.prepend(selectPriority);
        this.form.prepend(searchStatus);
        this.form.prepend(inputBody);
        this.form.prepend(inputTitle);
        this.form.prepend(fullName);
        this.form.prepend(data);
        this.form.prepend(lable);
        this.form.append(this.btn);
        this.form.classList.add("d-flex", "flex-column");
        this.form.style.gap = "30px";
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            obj.lastVisit = data.value;
            obj.purpose = inputTitle.value;
            obj.describe = inputBody.value;
            obj.priority = selectPriority.value;
            obj.fio = fullName.value;
            obj.doctor = dantist;
            obj.searchStatus = searchStatus.value;

            this.formHandler(obj, this.clouseModul.bind(this));
        });
    }
    clouseModul() {
        const modal = this.form.closest(".modal");
        modal.remove();
    }
}
//класс для создания формы для визитов
