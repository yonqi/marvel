// Функция для обработки появления элементов при скроллинге
function handleScroll() {
    const items = document.querySelectorAll('.gallery-item');
    const windowHeight = window.innerHeight;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();

      if (rect.top < windowHeight * 0.9) {
        item.classList.add('visible'); // Добавляем класс для анимации
      }
    });
  }

  // Добавляем обработчик скроллинга
  window.addEventListener('scroll', handleScroll);

  // Инициализация эффекта при загрузке страницы
  window.addEventListener('load', handleScroll);

  // Функция для загрузки и отображения данных
async function loadData() {
    try {
      // Загрузка данных из файла persons.json
      const response = await fetch('avengers_persons.json');
      
      // Проверка на успешный ответ от сервера
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      
      // Преобразуем полученные данные в JSON
      const persons = await response.json();
      
      // Вызываем функцию для отображения данных
      displayCards(persons);
    } catch (error) {
      console.error(error);
    }
  }

  // Функция для создания карточки с <a> тегом
  function createCard(cardData) {
    const card = document.createElement('a'); // Используем <a> вместо <div>
    card.classList.add('card');
    card.href = cardData.link; // Устанавливаем ссылку

    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.title;
    card.appendChild(img);

    const title = document.createElement('h2');
    title.textContent = cardData.title;
    title.classList.add("movie-title");
    card.appendChild(title);

    return card;
  }

  // Функция для отображения всех карточек
  function displayCards(cards) {
    const container = document.getElementById('movies-grid');
    cards.forEach(cardData => {
      const card = createCard(cardData);
      container.appendChild(card);
    });
  }

  // Загружаем данные и отображаем карточки
  loadData();

  // Дожидаемся загрузки DOM
  document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.getElementById('o');
    const dependentImage = document.getElementById('dependentImage');

    // Функция для обновления положения зависимого объекта
    function updatePosition() {
        // Получаем текущую высоту изображения
        const mainImageHeight = mainImage.offsetHeight;

        // Вычисляем половину высоты
        const halfHeight = mainImageHeight / 2;

        // Устанавливаем `top` для зависимого объекта
        dependentImage.style.top = `${halfHeight - 100}px`;
    }

    // Запускаем функцию после загрузки изображения
    mainImage.addEventListener('load', updatePosition);

    // Также обновляем позицию при изменении размера окна
    window.addEventListener('resize', updatePosition);
});