window.addEventListener('DOMContentLoaded', () => { //Работа JS до ПОЛНОЙ загрузки страницы 
  const cartWrapper = document.querySelector('.cart__wrapper'), // Добавление ВСЕХ переменных для работы со Скриптом; Оболочка товара
    cart = document.querySelector('.cart'), // Карточка товара
    close = document.querySelector('.cart__close'), // Закрыть карточку товара
    open = document.querySelector('#cart'), // Открыть карточку товара
    goodsBtn = document.querySelectorAll('.goods__btn'), 
    products = document.querySelectorAll('.goods__item'), 
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'),
    totalCost = document.querySelector('.cart__total > span'),
    titles = document.querySelectorAll('.goods__title'), // Заголовки товаров
    empty = cartWrapper.querySelector('.empty');

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
      removeBtn = document.createElement('div'); // Удаление кнопки добавления товара 
      // empty = cartWrapper.querySelector('.empty');
      
    trigger.remove();

    showConfirm();
    calcGoods(1);

    removeBtn.classList.add('goods__item-remove'); // Кнопка Удаления товара из корзины
    removeBtn.innerHTML = '&times';
    item.appendChild(removeBtn);

    cartWrapper.appendChild(item);

    calcTotal();
    removeFromCart();
    // Вызов функции чистой корзины
  });
});

titles.forEach(function(item) { //Функция сокращения описания товара в превью
  if (item.textContent.length < 70) {
    return;
  } else {
      const str = item.textContent.slice(0, 71) + '...';
      item.textContent = str;
  }
});

function showConfirm() {
  confirm.style.display = 'block';
  let counter = 100;
  const id = setInterval(frame, 10);
  function frame() {
    if (counter == 10) {
      clearInterval(id);
      confirm.style.display = 'none';
    } else {
      counter--;
      confirm.style.transform = `translateY(-${counter}px)`;
      confirm.style.opacity = '.' + counter;
    }    
  }
};

function calcGoods(i) {
  const items = cartWrapper.querySelectorAll('.goods__item');
  badge.textContent = i + items.length;
  if (badge.textContent > 0) {
    empty.style.display = 'none';
  } else {
    empty.style.display = 'block';
  }
};

function calcTotal() {
  const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
  let total = 0;
  prices.forEach(function(item) {
    total += +item.textContent;
  });
  totalCost.textContent = total;
};

function removeFromCart() {
  const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
  removeBtn.forEach(function(btn) {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();
      calcGoods(0);
      calcTotal();
    });
  });
};

});