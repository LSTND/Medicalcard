export default class Form {
  constructor(submitTitle, formHandler) {
    this.submitTitle = submitTitle
    this.formHandler = formHandler
  }
  render() {
    this.form = document.createElement('form')
    this.btn = document.createElement('input')
    this.form.append(this.btn)
    this.form.classList.add(`${this.submitTitle}`)
    this.btn.type = 'submit'
    this.btn.value = this.submitTitle
    return this.form
  }
}
