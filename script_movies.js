

  function filterCards() {
    // Получаем значение из поля ввода
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase(); // Преобразуем в нижний регистр

    // Получаем контейнер с карточками
    const moviesGrid = document.querySelector('.movies-grid');

    // Убедимся, что контейнер существует
    if (!moviesGrid) {
        console.error('Контейнер с классом .movies-grid не найден.');
        return;
    }

    // Получаем карточки только из этого контейнера
    const cards = moviesGrid.querySelectorAll('.card');

    // Проверяем каждую карточку
    cards.forEach(card => {
        // Извлекаем текст заголовка фильма
        const titleElement = card.querySelector('.movie-title');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';

        // Проверяем, начинается ли название с введенного текста
        if (title.includes(searchText)) {
            card.style.display = ''; // Показываем карточку
        } else {
            card.style.display = 'none'; // Скрываем карточку
        }
    });
    
}

// Функция для загрузки и отображения данных
async function loadData() {
  try {
    // Загрузка данных из файла persons.json
    const response = await fetch('movies.json');
    
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

  const year = document.createElement('p');
  year.textContent = cardData.year;
  year.classList.add("movie-year");
  card.appendChild(year);

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

//СОРТИРОВКА ФИЛЬМОВ
// Функция для выполнения сортировки
function sortMovies(criteria) {
  const movieGrid = document.querySelector('.movies-grid');
  const movies = Array.from(movieGrid.children);

  movies.sort((a, b) => {
      const dateA = parseDate(a.querySelector('p').textContent);
      const dateB = parseDate(b.querySelector('p').textContent);

      if (criteria.includes('убыванию')) return dateB - dateA;
      if (criteria.includes('возрастанию')) return dateA - dateB;
      if (criteria.includes('А-Я')) return a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent);
      if (criteria.includes('Я-А')) return b.querySelector('h2').textContent.localeCompare(a.querySelector('h2').textContent);
  });

  // Обновляем порядок фильмов
  movieGrid.innerHTML = '';
  movies.forEach(movie => movieGrid.appendChild(movie));
}

// Сортировка при клике на кнопки
document.querySelectorAll('.sort-btn').forEach(button => {
  button.addEventListener('click', () => {
      // Удаляем класс "active" у всех кнопок
      document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Выполняем сортировку
      sortMovies(button.textContent);
  });
});

window.onload = () => {
  const defaultCriteria = 'убыванию'; 
  sortMovies(defaultCriteria);
};


// Функция для преобразования даты
function parseDate(dateText) {
  // Предположим, что формат даты: "YYYY г."
  return parseInt(dateText.replace(/\D/g, ''), 10);
}

  
  // Функция для преобразования строки с датой в объект Date
  function parseDate(dateStr) {
    // Проверяем, содержит ли строка только год
    if (/^\d{4} г\.$/.test(dateStr)) {
      return new Date(dateStr.replace(' г.', '')); // Преобразуем в "2024"
    }
  
    // Обрабатываем строки с месяцами и днями
    const months = {
      'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
      'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
    };
  
    const match = dateStr.match(/(\d+)\s([а-яё]+)\s(\d{4})/i); // Ищем формат "2 мая 2025"
    if (match) {
      const day = parseInt(match[1], 10);
      const month = months[match[2].toLowerCase()];
      const year = parseInt(match[3], 10);
      return new Date(year, month, day);
    }
  
    return new Date(0); // Если дата не распознается, возвращаем минимальную дату
  }
