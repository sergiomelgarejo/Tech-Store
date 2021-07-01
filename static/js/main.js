// Functions
function headerColorAsigner(color) {
    document.getElementById('Header').style.backgroundColor = color;
}

function colorSelector(element) {
    // condition that pass a color for the bg relying on the "state" of the "element"
    if (element) {
        headerColorAsigner("#fff"); 
    } else {
        headerColorAsigner("#181818");
    }
}

function imageZoom(imgID) {
    let img = document.getElementById(imgID);
    let lens = document.getElementById('lens');

    lens.style.backgroundImage = `url( ${img.src} )`;

    let ratio = 3;

    lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('touchmove', moveLens);

    function moveLens() {
        let pos = getCursor();

        let positionLeft = pos.x - (lens.offsetWidth / 2); 
        let positionTop = pos.y - (lens.offsetHeight / 2); 

        if (positionLeft < 0) {
            positionLeft = 0;
        }
        if (positionTop < 0) {
            positionTop = 0;
        }
        if (positionLeft > (img.width - lens.offsetWidth / 1)) {
            positionLeft =  img.width - lens.offsetWidth / 1;
        }
        if (positionTop > (img.height - lens.offsetHeight / 1)) {
            positionTop =  img.height - lens.offsetHeight / 1;
        }

        lens.style.left = positionLeft + 'px';
        lens.style.top = positionTop + 'px';

        lens.style.backgroundPosition = '-' + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px';
    }

    function getCursor() {
        let e = window.event;
        let bounds = img.getBoundingClientRect();

        let x = e.pageX - bounds.left;
        let y = e.pageY - bounds.top;

        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return {'x':x, 'y':y};
    }
}

// classes variables
let header = document.querySelector('.header');
let navList = document.querySelector('nav');
let mobileSearch = document.querySelector('.is_mobile');
let searchIcon = document.querySelector('.search-icons');

// element selector
const selectElement = (element) => document.querySelector(element);

// Nav List
// open and close mobile nav
selectElement('.menu-icons').addEventListener('click', () => {
    selectElement('nav').classList.toggle('active'); // se active el Nav
    nav = navList.classList.contains('active');

    colorSelector(nav);

    if (mobileSearch.classList.contains('active')) {
        mobileSearch.classList.remove('active'); // se desactiva el mobile search
        searchIcon.classList.remove('active'); // se resetea el icono de busqueda
        header.classList.remove('active'); // se desactiva el header
    }
});

// let dotsWrapper = document.querySelector('#dots-wrapper');

// window.addEventListener('load', function() {
//     dotsWrapper.parentElement.removeChild(dotsWrapper);
// });

// Mobile Search.
// open and close mobile search 
selectElement('.search-icons').addEventListener('click', () => {
    selectElement('.is_mobile').classList.toggle('active'); // se activa el mobile search
    search = mobileSearch.classList.contains('active');
    header.classList.toggle('active'); // se activa el header
    colorSelector(search);
});

// Search and Close icons.
// change dinamically the search icon and the close icon.
selectElement('.search-icons').addEventListener('click', () => {
    selectElement('.search-icons').classList.toggle('active'); // in order to change the search icon for the close icon.
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
    };
});

// cash selector
const contentSelect = selectElement('#select .content-select');
const hiddenInput = selectElement('#input-select');

selectElement('#select').addEventListener('click', () => {
    selectElement('#select').classList.toggle('active');
    selectElement('#options').classList.toggle('active');
});

document.querySelectorAll('#options > .option').forEach((option) => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        contentSelect.innerHTML = e.currentTarget.innerHTML;
        selectElement('#select').classList.toggle('active');
        selectElement('#options').classList.toggle('active');
        hiddenInput.value = e.currentTarget.querySelector('.option-title').innerText;
    });
});

// Footer
selectElement('.footer-support-title').addEventListener('click', () =>{
    selectElement('.footer-support').classList.toggle('active');
    if (selectElement('.footer-support').classList.contains('active')) {
        document.getElementById('footer-about').style.bottom = 0;
    }
});

// # product details

let thumbnails = document.getElementsByClassName('product-image-item');
let activeImages = document.getElementsByClassName('active');

for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('mouseover', function() {
        if (activeImages.length > 0) {
            activeImages[0].classList.remove('active');
        }

        this.classList.add('active');
        document.getElementById('featured').src = this.src;
    });
}

// product title ellipsis
titleEllipsis('.accesssory-name');
function titleEllipsis(element) {
    document.querySelectorAll(element).forEach(function (elem) {
        if (parseFloat(window.getComputedStyle(elem).width) === parseFloat(window.getComputedStyle(elem.parentElement).width)) {
          elem.setAttribute('title', elem.textContent);
        }
    });
}


// image slider
let btn_left = document.getElementById('slide-left');
let btn_right = document.getElementById('slide-right');

// btn_left.addEventListener('click', function() {
//     document.getElementById('product-d-slider').scrollLeft -= 180;
// });

// btn_right.addEventListener('click', function(){
//     document.getElementById('product-d-slider').scrollLeft += 180;
// });

// // #image zoom
// document.getElementById('f-img-container').addEventListener('mouseover', function(){
//     imageZoom('featured');
// });

// imageZoom('featured');

// FORM VALIDATION
var form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-\@\.\+]{1,150}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, 
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/, 
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cedula: /^((\d([.])|)\d{3}([.])\d{3})|(\d{6,7})|$/, // not required
    direccion: /^[a-zA-ZÀ-ÿ\s\/\.]+(?:[\s-][a-zA-ZÀ-ÿ\s\/\.]+)*$/, 
    ruc: /^(\d{8}([-])\d{1})|$/, // not required
    telefono_py: /^((595[\s-]|595)|0)(96[123]|97[123456]|98[123456]|99[12345])([\s-]|)\d{6}$/
}

const fields = {
    username: false,
    first_name: false,
    last_name: false,
    password: false,
    email: false,
    c_i: false,
    dpto: false,
    city: false,
    address: false,
    ruc: false,
    phone_number: false,
}

const validateForm = (e) => {
    switch (e.target.name) {
        case 'username':
            validateField(expresiones.usuario, e.target, 'username');
        break;
        case 'first_name':
            validateField(expresiones.nombre, e.target, 'first_name');
        break;
        case 'last_name':
            validateField(expresiones.nombre, e.target, 'last_name');
        break;
        case 'password1':
            validateField(expresiones.password, e.target, 'password1');
            validatePassword();
        break;
        case 'password2':
            validatePassword();
        break;
        case 'city':
            validateField(expresiones.direccion, e.target, 'city');
        break;
        case 'dpto':
            validateField(expresiones.direccion, e.target, 'dpto');
        break;
        case 'address':
            validateField(expresiones.direccion, e.target, 'address');
        break;
        case 'email':
            validateField(expresiones.correo, e.target, 'email');
        break;
        case 'phone_number':
            validateField(expresiones.telefono_py, e.target, 'phone_number');
        break;
        case 'c_i':
            validateField(expresiones.cedula, e.target, 'c_i');
        break;
        case 'ruc':
            validateField(expresiones.ruc, e.target, 'ruc');
        break;
    }
}

const validateField = (expression, input, field) => {
    if (expression.test(input.value)) {
        document.getElementById(`group__${field}`).classList.remove('incorrect');
        document.getElementById(`group__${field}`).classList.add('correct');
        document.querySelector(`#group__${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${field} .form__input-error`).classList.remove('active');
        fields[field] = true;

    } else {
        document.getElementById(`group__${field}`).classList.add('incorrect');
        document.getElementById(`group__${field}`).classList.remove('correct');
        document.querySelector(`#group__${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${field} .form__input-error`).classList.add('active');
        fields[field] = false;
    }
}

const validatePassword = () => {
    const inputPassword1 = document.getElementById('id_password1');
    const inputPassword2 = document.getElementById('id_password2');

    if (inputPassword1.value != inputPassword2.value) {
        document.getElementById(`group__password2`).classList.add('incorrect');
        document.getElementById(`group__password2`).classList.remove('correct');
        document.querySelector(`#group__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#group__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__password2 .form__input-error`).classList.add('active');
        fields['password'] = false;
    } else {
        document.getElementById(`group__password2`).classList.remove('incorrect');
        document.getElementById(`group__password2`).classList.add('correct');
        document.querySelector(`#group__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#group__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__password2 .form__input-error`).classList.remove('active');
        fields['password'] = true;
    }
}

// const validateCity = (input) => {
//     options = {
//         asunción
//     }
// }

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});



// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const terms = document.getElementById('terms')
//     if (fields.username && fields.first_name && fields.last_name && fields.password && fields.email &&terms.checked) {
//         form.reset();

//         document.getElementById('form__message-success').classList.add('active');
//         setTimeout(() => {
//             document.getElementById('form__message-success').classList.remove('active');
//         }, 3600);

//         document.querySelectorAll('.form__group.correct').forEach((icono) => {
//             icono.classList.remove('correct');
//         })
//     } else {
//         document.getElementById('form__message').classList.add('active');
//     }
// });