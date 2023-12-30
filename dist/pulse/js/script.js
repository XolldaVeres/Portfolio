// сликслайдер вроде

$(document).ready(function(){
    $('.carousel__inner').slick({
      dots: false,
      speed: 1000,
      adaptiveHeight: false,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/icon/left.png"></img></button>',
      nextArrow:'<button type="button" class="slick-next"><img src="img/icon/right.png"></img></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows:false
          }
        }

      ]
    });

    // для табов и переключения между вкладками
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {

      $(item).each(function(i){
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
      })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // Modal

    $('[data-modal=consultation]').on('click' , function() {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click' , function() {
      $('.overlay , #consultation, #thanks , #order').fadeOut('slow');
    });

    // $('.button_mini').on('click', function() {
    //   $('.overlay, #order').fadeIn('slow');
    // });


    // тут скрипт для того, чтобы при нажатии на карточку каталога менялась модель, которую покупаютв
    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });


    // функция валидации, чтобы пользователь вводил все верно
    function valideForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
          messages: {
            name: {
              required: "Пожалуйста введите свое имя",
              minlength: jQuery.validator.format("Введите {0} символов!")
            }
            ,
            phone: "Пожалуйста введите свой телефон",
            email: {
              required: "Пожалуйста введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
      });
    };

    // если хочешь изменить цвет текста, что-то добавить от себя, то используй эти классы
    //     .error
    // label.error
    // читай документацию

    valideForms('#consultation-form')
    valideForms('#consultation form')
    valideForms('#order form')

    $('input[name=phone]').mask("+7 (999) 999-99-99");





    // ОТПРАВКА ФОРМЫ НА СЕРВЕР
    // ШАБЛОН
    // ДЕЛАЕМ ЭТО ПОСЛЕ ТОГО,КАК ДОБАВИЛИ ПАПКУ mailer


    $('form').submit(function(e) {

      // позволяет отвенить стандартное поведение браузера*
      // мы отменяем стандартное поведение сабмит - перезагрузки страницы не будет
      e.preventDefault();
      // технология обновления и подгрузки страницы, как в гугл картах


      // добавляем маленькую функцию валидатора, чтобы пустые строчки не отправлялись на сервер
      if (!$(this).valid()) {
        return;
      }
      // если форма не прошла валидацию мы ничего не делаем 



      $.ajax({

      
        // я данные хочу получить с сервера или отдать серверу?
        // так как отдаем пишем POST
        type: "POST", 

        // куда отправляем данные 
        url: "mailer/smart.php",

        // данные которые хотим отправить на сервер 
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
      // ВЫШЕ ОПИСАНО done мы находим форму и меняем ее после отправки - обратная связь
      // найти input и очистить от текста - val - 
    });
    // submit когда формы будут сабмитится - подтверждаться, тогда и будет работать функция 
    // технология эджекс стабильное обновление информации, такое поведение можно и отменить
  
  // сбросить кеш виндовс + f5

    // Smooth scroll and pageup

    // виндов это все наше окно, браузер будет следит за функцией скрола
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });



    // ПЛАВНЫЙ СКРОЛ - ТОЛЬКО Я ЕГО ВЫКЛЮЧИЛ, ПОТОМУ ЧТО У БРАУЗЕРА СТАНДАРТНОЕ ПОВЕДЕНИЕ УЖЕ ЕСТЬ
  //   $("a[href^='#']").click(function(){
  //     const _href = $(this).attr("href");
  //     $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  //     return false;
  // });

// для поддержки анимаций
// классы из документации пишем вместо animate
  new WOW().init();


  });
