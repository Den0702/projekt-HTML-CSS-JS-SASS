'use strict'
//alert('Skrypt podpiety!')

let mobMenuBtn = document.querySelectorAll('.mobile-hamburger')[0];
let dropMenuHolder = document.querySelector('.open-menu-holder');
let closeMenuCross = document.querySelector('.mobile-close');
let appointmentForm = document.querySelector('#appointment-form');
let appointmentMessage = document.querySelector('.appointment-message');

mobMenuBtn.addEventListener('click', () => dropMenuHolder.classList.toggle('open'));
closeMenuCross.addEventListener('click', () => dropMenuHolder.classList.toggle('open'));

appointmentForm.addEventListener('submit', function (event) {

    event.preventDefault();

    clearFields(appointmentMessage);

    let requiredFormFields = appointmentForm.getElementsByTagName('input');
    let allFilled;

    for (const field of requiredFormFields) {

        if (field.value.trim() === '') {
            allFilled = false;
            field.classList.add('error');

            let messageItem = document.createElement('li');
            appointmentMessage.appendChild(messageItem);
            messageItem.textContent += `The field ${field.name} must not be empty`;

        } else if (field.classList.contains('error')) {
            field.classList.remove('error');
            //appointmentMessage.removeChild(appointmentMessage.firstElementChild);
            allFilled = true;
        }
    }

      /* if (allFilled) {
        appointmentMessage.textContent = 'The data has been successfully sent';
        
    } */

    if(appointmentMessage.childElementCount === 0) {
        let user = {
            name: requiredFormFields.name.value,
            email: requiredFormFields.email.value,
            service: document.querySelector('#appointment-service').value,
            phone: requiredFormFields.phone.value,
            date: requiredFormFields.date.value,
            time: requiredFormFields.time.value,
            message: document.querySelector('#appointment-message').value,
        };
    
        fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(user)
            }
        )
        .then(function (response) {
            console.log(response.headers.get('Content-Type'));
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            appointmentMessage.textContent = `Thank you, ${result.appointment.name}, you have been appointed!`;
        })
        .catch(function (error) {
            console.log('Fetch problem: ' + error.message);
        })
    }
});

function clearFields(appointmentMessage) {
    appointmentMessage.innerText = '';
}