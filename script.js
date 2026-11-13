document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавная прокрутка
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 2. Анимация появления главного экрана
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // 3. Автокопирование ника Telegram
    const copyNick = document.getElementById('copy-nick');
    if (copyNick) {
        copyNick.addEventListener('click', () => {
            navigator.clipboard.writeText('@Zhanetka777').then(() => {
                const originalText = copyNick.innerText;
                copyNick.innerText = '✓ Ник скопирован!';
                copyNick.style.color = '#25D366';
                setTimeout(() => {
                    copyNick.innerText = originalText;
                    copyNick.style.color = '#c29b62';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
            });
        });
    }

    // 4. КАЛЬКУЛЯТОР УСЛУГ
    const checkboxes = document.querySelectorAll('.calc-checkbox');
    const totalPriceEl = document.getElementById('total-price');

    if (checkboxes.length > 0 && totalPriceEl) {
        checkboxes.forEach(box => {
            box.addEventListener('change', () => {
                let total = 0;
                checkboxes.forEach(b => {
                    if (b.checked) total += parseInt(b.value);
                });
                totalPriceEl.textContent = total;
            });
        });
    }

    // 5. КАРТА ДНЯ
    const drawBtn = document.getElementById('draw-card-btn');
    const cardResult = document.getElementById('card-result');
    const cards = [
        { name: "Туз червей", text: "Вас ждет радостное событие или приятная новость. Откройтесь этому чувству." },
        { name: "Дама пик", text: "Будьте осторожны с советами окружающих. Сейчас лучше довериться своей интуиции." },
        { name: "Король треф", text: "В вашем окружении есть влиятельный человек, готовый помочь. Не бойтесь просить." },
        { name: "Валет бубен", text: "День принесет неожиданные возможности. Будьте внимательны к мелочам." },
        { name: "Руна Феху", text: "Символ благополучия. Ваши усилия начнут приносить плоды. Время собирать урожай." },
        { name: "Руна Альгиз", text: "Вы под защитой высших сил. Смело двигайтесь вперед." }
    ];

    if (drawBtn && cardResult) {
        drawBtn.addEventListener('click', () => {
            cardResult.classList.remove('active');
            setTimeout(() => {
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                cardResult.innerHTML = `
                    <div class="card-title">${randomCard.name}</div>
                    <div class="card-text">${randomCard.text}</div>
                `;
                cardResult.classList.add('active');
            }, 300);
        });
    }

    // 6. FAQ АККОРДЕОН
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });

    // 7. ОТПРАВКА ФОРМЫ И КРАСИВОЕ ОКНО
    const contactForm = document.getElementById('contact-form');
    const customModal = document.getElementById('custom-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Останавливаем переход на страницу Formspree
            
            const formData = new FormData(contactForm);
            
            // Отправляем данные в фоне
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset(); // Очищаем форму
                customModal.classList.add('show'); // Показываем окно
            } else {
                alert('Ой, что-то пошло не так. Попробуйте написать мне в Telegram.');
            }
        });
    }

    // Закрытие окна по кнопке
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            customModal.classList.remove('show');
        });
    }

    // Закрытие окна при клике на темный фон
    if (customModal) {
        customModal.addEventListener('click', (e) => {
            if (e.target === customModal) {
                customModal.classList.remove('show');
            }
        });
    }
});