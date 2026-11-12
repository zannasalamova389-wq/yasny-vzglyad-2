// Ждем, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавная прокрутка для кнопки "Записаться" и любых ссылок с якорем (#)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Небольшой эффект для главного экрана (появление текста)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        // Запускаем анимацию через 100 миллисекунд
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // 3. Автокопирование ника Telegram при клике
    const copyNick = document.getElementById('copy-nick');
    if (copyNick) {
        copyNick.addEventListener('click', () => {
            // Копируем текст ника в буфер обмена
            navigator.clipboard.writeText('@Zhanetka777').then(() => {
                const originalText = copyNick.innerText;
                copyNick.innerText = '✓ Ник скопирован!';
                copyNick.style.color = '#25D366'; // Зеленый цвет для успеха
                
                // Возвращаем обратно через 2 секунды
                setTimeout(() => {
                    copyNick.innerText = originalText;
                    copyNick.style.color = '#c29b62'; // Возвращаем золотой цвет
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
            });
        });
    }
});