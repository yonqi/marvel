const questions = [
    {
        question: "Как бы вы описали себя?",
        options: [
            { answer: "Я лидер", character: "КАПИТАН АМЕРИКА" },
            { answer: "Я стратег", character: "ДОКТОР СТРЭНДЖ" },
            { answer: "Я одиночка", character: "ЧЕРНАЯ ВДОВА" },
            { answer: "Я эксцентричный гений", character: "ЖЕЛЕЗНЫЙ ЧЕЛОВЕК" }
        ]
    },
    {
        question: "Какую суперсилу вы бы выбрали?",
        options: [
            { answer: "Сверхсила", character: "ХАЛК" },
            { answer: "Невидимость", character: "ЧЕЛОВЕК-НЕВИДИМКА" },
            { answer: "Манипуляция временем", character: "ДОКТОР СТРЭНДЖ" },
            { answer: "Умение летать", character: "ЖЕЛЕЗНЫЙ ЧЕЛОВЕК" }
        ]
    },
    {
        question: "Какую роль вам ближе?",
        options: [
            { answer: "Защитник", character: "КАПИТАН АМЕРИКА" },
            { answer: "Силовой лидер", character: "ТОР" },
            { answer: "Необычный гений", character: "ЖЕЛЕЗНЫЙ ЧЕЛОВЕК" },
            { answer: "Один против всех", character: "ЧЕРНАЯ ВДОВА" }
        ]
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = [];

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answerOptions = document.getElementById("answer-options");

    questionText.textContent = question.question;
    answerOptions.innerHTML = "";

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "answer";
        optionInput.id = `option${index}`;
        optionInput.value = option.character;

        const optionLabel = document.createElement("label");
        optionLabel.setAttribute("for", `option${index}`);
        optionLabel.textContent = option.answer;

        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionLabel);
        answerOptions.appendChild(optionDiv);
    });
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        selectedAnswers.push(selectedOption.value);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }
}

function showResult() {
    const resultContainer = document.getElementById("result-container");
    const resultName = document.getElementById("result-name");
    const resultDescription = document.getElementById("result-description");

    // Подсчитываем, какой персонаж встречается чаще всего в ответах
    const characterCounts = {};
    selectedAnswers.forEach((character) => {
        characterCounts[character] = (characterCounts[character] || 0) + 1;
    });

    let mostFrequentCharacter = "";
    let maxCount = 0;
    for (const character in characterCounts) {
        if (characterCounts[character] > maxCount) {
            mostFrequentCharacter = character;
            maxCount = characterCounts[character];
        }
    }

    resultName.textContent = mostFrequentCharacter;

    // В этом блоке можно добавить описание для каждого персонажа
    switch (mostFrequentCharacter) {
        case "КАПИТАН АМЕРИКА":
            resultDescription.textContent = "Вы — Капитан Америка, символ чести и лидерства.";
            break;
        case "ДОКТОР СТРЭНДЖ":
            resultDescription.textContent = "Вы — Доктор Стрэндж, мастер магии и манипулятор временем.";
            break;
        case "ХАЛК":
            resultDescription.textContent = "Вы — Халк, воплощение силы и ярости.";
            break;
        case "ЖЕЛЕЗНЫЙ ЧЕЛОВЕК":
            resultDescription.textContent = "Вы — Тони Старк, гениальный изобретатель и миллиардер.";
            break;
        // Добавьте остальные персонажи...
        default:
            resultDescription.textContent = "Вы — уникальный персонаж с огромным потенциалом!";
    }

    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
}

document.getElementById("next-button").addEventListener("click", nextQuestion);

displayQuestion();

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
      const response = await fetch('persons.json');
      
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