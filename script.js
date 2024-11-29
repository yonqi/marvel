
//РАЗВИТИЕ И ИСТОРИЯ
// Скрипт для анимации прокручивания изображения
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY; // Получаем текущую позицию прокрутки
    const images = document.querySelectorAll('.scroll-image'); // Все элементы с классом scroll-image

    // Применяем прокрутку ко всем изображениям
    images.forEach(function(image) {
        image.style.transform = `translateX(-${scrollPosition / 3}px)`; // Перемещаем каждое изображение
    });
});