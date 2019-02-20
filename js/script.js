window.addEventListener('DOMContentLoaded', () => { //Работа JS до ПОЛНОЙ загрузки страницы 
  const loadContent = async (url, callback) => {
    await fetch (url) // Обещание
      .then(response => response.json()) // Обещание
      .then(json => createElement(json.goods));
    callback();
  }

  function createElement(arr) {
    const goodsWrapper = document.querySelector('.goods__wrapper');

    arr.forEach(function(item) {
      let card = document.createElement('div');
      card.classList.add('goods__item');
      card.innerHTML = `
        <img class="goods__img" src="${item.url}" alt="phone">
        <div class="goods__colors">Доступно цветов: 4</div>
        <div class="goods__title">
            ${item.title}
        </div>
        <div class="goods__price">
            <span>${item.price}</span> руб/шт
        </div>
        <button class="goods__btn">Добавить в корзину</button>
      `;
      goodsWrapper.appendChild(card);
    });
  }

  loadContent('js/db.json', () => {
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
      
      removeBtn.classList.add('goods__item-remove'); // Кнопка Удаления товара из корзины
      removeBtn.innerHTML = '&times';
      item.appendChild(removeBtn);

      cartWrapper.appendChild(item);

      calcGoods();
      calcTotal();
      removeFromCart();
    });
    });

    titles.forEach(function(item) { //Функция сокращения описания товара в превью
    if (item.textContent.length < 60) {
      return;
    } else {
        const str = item.textContent.slice(0, 60) + '...';
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

    function calcGoods() {
    const items = cartWrapper.querySelectorAll('.goods__item');
    badge.textContent = items.length;
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
        calcGoods();
        calcTotal();
      });
    });
    };
  });
});



/* const example = {username: "Ivan"};

fetch('https://jsonplaceholder.typicode.com/posts',
    {
      method: "POST",
      body: JSON.stringify(example)
    }) // Обещание
  .then(response => response.json()) // Обещание
  .then(json => console.log(json)) */