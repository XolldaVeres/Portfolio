const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});



// маленький скрипт для подсчета процентов: 
// сколько пишешь процентов в строке - столько будет и на линии
const counters = document.querySelectorAll('.skills__text'),
    lines = document.querySelectorAll('.skills__divider div');
// lines = document.querySelectorAll(''),

// .forEach это метод который проходит по всем элементам и что-то делает
counters.forEach((item, i) => {
    // i - мы обращаемся к каждому отдельному элементу
    lines[i].style.width = item.innerHTML;
});


$(document).ready(function () {
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                checkbox: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                checkbox: {
                    required: "Пожалуйста, поставьте галочку",
                    checkbox: "Неправильно введен адрес почты",
                },
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#contacts__form');

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('form').trigger('reset');
        });
        return false;
    });
});

