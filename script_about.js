// ФИЛЬМЫ
// Получаем элементы
const container = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');

// Дублируем элементы для зацикленности
items.forEach((item) => {
    const clone = item.cloneNode(true);
    container.appendChild(clone); // Добавляем копию в конец
});

// Устанавливаем начальный индекс
let currentIndex = 0;

const windowWidth = window.innerWidth; // Ширина окна
const itemWidth = (items[0].offsetWidth / windowWidth) * 100 + 4.5; // Ширина элемента + отступы
const totalItems = container.children.length;

// Функция обновления карусели
function updateCarousel() {
    const offset = -currentIndex * itemWidth;
    container.style.transform = `translateX(${offset}%)`;

    // Обновляем активный элемент
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
    });
}

// Перемещение карусели
function moveCarousel() {
    currentIndex++;
    
    if (currentIndex >= totalItems / 2 ) {
        // Сбрасываем индекс для зацикливания
        currentIndex = -1;
        container.style.transition = 'none'; // Убираем анимацию при возврате
        updateCarousel();

        // Делаем паузу, чтобы пользователь не заметил резкого перехода
        setTimeout(() => {
            container.style.transition = 'transform 0.5s ease'; // Включаем анимацию
            moveCarousel(); // Двигаем дальше
        }, 0); // Небольшая пауза для сглаживания
    } else {
        updateCarousel();
    }
}

// Запуск карусели
window.onload = () => {
    updateCarousel();
};

//ПЕРСОНАЖИ
// Получаем элементы
const container_pers = document.querySelector('.carousel-container-pers');
const items_pers = document.querySelectorAll('.carousel-item-pers');

// Дублируем элементы для зацикленности
items_pers.forEach((item) => {
    const clone = item.cloneNode(true);
    container_pers.appendChild(clone); // Добавляем копию в конец
});

// Устанавливаем начальный индекс
let currentIndexPers = 0;
const itemWidthPers = (items_pers[0].offsetWidth / windowWidth) * 100 + 2.3; // Ширина элемента + отступы
const totalItemsPers = container_pers.children.length;

// Функция обновления карусели
function updateCarouselPers() {
    const offset_pers = -currentIndexPers * itemWidthPers;
    container_pers.style.transform = `translateX(${offset_pers}%)`;
}

// Перемещение карусели
function moveCarouselPers() {
    currentIndexPers++;
    
    if (currentIndexPers > totalItemsPers / 2 ) {
        // Сбрасываем индекс для зацикливания
        currentIndexPers = 0;
        updateCarouselPers();
        container_pers.style.transition = 'none'; // Убираем анимацию при возврате

        // Делаем паузу, чтобы пользователь не заметил резкого перехода
        setTimeout(() => {
            container_pers.style.transition = 'transform 0.5s ease'; // Включаем анимацию
            moveCarouselPers(); // Двигаем дальше
        }, 0.5); // Небольшая пауза для сглаживания
    } else {
        updateCarouselPers();
    }
}
