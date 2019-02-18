window.addEventListener('DOMContentLoaded', () => { //Работа JS до ПОЛНОЙ загрузки страницы 
    const cartWrapper = document.querySelector('.cart__wrapper'), // Добавление ВСЕХ переменных для работы со Скриптом; Оболочка товара
      cart = document.querySelector('.cart'), // Карточка товара
      close = document.querySelector('.cart__close'), // Закрыть карточку товара
      open = document.querySelector('#cart'), // Открыть карточку товара
      goodsBtn = document.querySelectorAll('.goods__btn'), // 
      products = document.querySelectorAll('.goods__item'), //
      confirm = document.querySelector('.confirm'),
      badge = document.querySelector('.nav__bagde'),
      totalCost = document.querySelector('.cart__total > span'),
      titles = document.querySelectorAll('.goods__title');

  function openCart () { // Функция открытия Корзины
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeCart () {  // Функция закрытия Корзины
    cart.style.display = 'none';
    document.body.style.overflow = '';
  }

  open.addEventListener('click', openCart); // Событие: открытие корзины по клику
  close.addEventListener('click', closeCart); // Собатие: закрытие корзины по клику

  goodsBtn.forEach(function(btn, i) { // Массив для работы с КАЖДЫМ товаром (элементом) в массиве
    btn.addEventListener('click', () => {
      let item = products[i].cloneNode(true), // Создание "клона" товара
        trigger = item.querySelector('button'), // Кнопка добавления товара в корзину
        removeBtn = document.createElement('div'), // УДаление кропки добавления товара 
        empty = cartWrapper.querySelector('.empty'); //
        
      trigger.remove();

      removeBtn.classList.add('goods__item-remove'); // Удаление товара из корзины
      removeBtn.innerHTML = '&times';
      item.appendChild(removeBtn);

      cartWrapper.appendChild(item);

      if (empty) {  // Удаление надписи "Ваша корзина пуста" после добавления товара в Корзину
        empty.remove();
      }
    })
  })
})

