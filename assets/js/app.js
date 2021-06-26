"use strict";

document.addEventListener('DOMContentLoaded', () => {

    class formValidator {
        constructor(form, fields) {
            this.form = form;
            this.fields = fields;
        }
    
        initialize() {
            this.validateOnSubmit();
            this.validateOnEntry();
        }
    
        validateOnSubmit() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.fields.forEach(field => {
                    const input = document.querySelector(`#${field}`);
                    console.log(input);
                    this.validateFields(input);
                });
            });
        }
    
        validateOnEntry() {
            this.fields.forEach(field => {
                const input = document.querySelector(`#${field}`);
                input.addEventListener('input', (e) => {
                    this.validateFields(input);
                });
            });
        }
    
        validateFields(field) { // value - получает значение с input; trim() - удаляет все пробельные символы со строки 
            if (field.value.trim() === ''){
                this.setStatus(field, `Поле не может быть пустым`, 'error');
            } else {
                this.setStatus(field, null, "success");
            }
    
            if(field.type == "email") {
                const re = /\S+@\S+.\S+/; // регулярные выражения, почитать!!
                if(re.test(field.value)) {
                    this.setStatus(field, null, "success");
                } else {
                    this.setStatus(field, "Пожалуйста, введите корректный e-mail адрес", "error");
                }
            }
    
            if(field.id === 'password_confirmation') {
                const passwordField = this.form.querySelector('#password');
    
                if (field.value.trim() === '') {
                    this.setStatus(field, 'Требуется подтверждение пароля', 'error');
                } else if (field.value != passwordField.value) {
                    this.setStatus(field, 'Пароль не совпадает', 'error');
                }   else {
                    this.setStatus(field, null, 'success')
                }
            }
        }
    
        setStatus(field, message, status) {
            const succesIcon = field.parentElement.querySelector('.icon-success');
            const erroeIcon = field.parentElement.querySelector('.icon-error');
            const erroeMassage = field.parentElement.querySelector('.error-message');
    
            if(status === "success") {
                if(erroeIcon) {
                    erroeIcon.classList.add('hidden');
                }
                if(erroeMassage) {
                    erroeMassage.innerText = "";
                }
                succesIcon.classList.remove('hidden');
                field.classList.remove('input-error');
            }
    
            if(status === 'error') {
                if(succesIcon) {
                    succesIcon.classList.add('hidden');
                }
                erroeMassage.innerText = message;
                erroeIcon.classList.remove('hidden');
                field.classList.add('input-error');
            }
        }
    
    }
    
    const form = document.querySelector('.form');
    const fields = ['username', 'email', 'password', 'password_confirmation'];
    
    const validator = new formValidator(form, fields);
    
    validator.initialize();

});