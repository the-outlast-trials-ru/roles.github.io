// maintenance-mode.js - ЕДИНЫЙ ДЛЯ ВСЕХ УСТРОЙСТВ
(function() {
    'use strict';
    
    // Функция проверки статуса с сервера
    function checkMaintenanceStatus() {
        // Используем fetch для получения статуса
        fetch('set-maintenance.php?action=check&t=' + Date.now())
            .then(response => response.json())
            .then(data => {
                if (data.success && data.maintenance) {
                    // Режим обслуживания включен на сервере
                    showMaintenanceScreen();
                }
                // Если выключен - ничего не делаем
            })
            .catch(error => {
                console.log('Не удалось проверить статус:', error);
                // При ошибке соединения можно проверить localStorage как запасной вариант
                if (localStorage.getItem('maintenance_mode') === 'active') {
                    showMaintenanceScreen();
                }
            });
    }
    
    // Проверяем статус при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        // Первая проверка через 500мс (после загрузки страницы)
        setTimeout(checkMaintenanceStatus, 500);
        
        // Проверяем каждые 10 секунд
        setInterval(checkMaintenanceStatus, 10000);
    });
    
    // Функция показа экрана ошибки (ваш существующий код)
    function showMaintenanceScreen() {
        // Если экран уже показан - выходим
        if (document.getElementById('maintenance-overlay')) {
            return;
        }
        
        // Создаем экран ошибки (ваш дизайн)
        const overlay = document.createElement('div');
        overlay.id = 'maintenance-overlay';
        overlay.innerHTML = `
            <style>
                #maintenance-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #0a0a0a;
                    color: #fff;
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    padding: 20px;
                }
                
                .error-container {
                    max-width: 700px;
                    background: #1a1a1a;
                    padding: 40px;
                    border-radius: 10px;
                    border: 2px solid #ff3333;
                    text-align: center;
                    box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
                }
                
                .error-title {
                    color: #ff3333;
                    font-size: 2.5em;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                }
                
                .error-subtitle {
                    color: #ff6666;
                    font-size: 1.5em;
                    margin-bottom: 30px;
                }
                
                .error-message {
                    color: #ccc;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    font-size: 1.1em;
                }
                
                .error-code {
                    background: #222;
                    padding: 15px;
                    border-radius: 5px;
                    font-family: monospace;
                    color: #ff8888;
                    font-size: 1.2em;
                    margin: 20px 0;
                    border-left: 4px solid #ff3333;
                }
                
                .error-buttons {
                    margin-top: 30px;
                }
                
                .error-btn {
                    background: #333;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    margin: 0 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1em;
                    transition: background 0.3s;
                }
                
                .error-btn:hover {
                    background: #444;
                }
                
                .error-btn.reload {
                    background: #ff3333;
                }
                
                .error-btn.reload:hover {
                    background: #ff5555;
                }
            </style>
            
            <div class="error-container">
                <div class="error-title">ОШИБКА СОЕДИНЕНИЯ!</div>
                <div class="error-subtitle">Сервер временно не доступен</div>
                
                <div class="error-message">
                    К сожалению возникла непредвиденная ошибка.<br>
                    Попробуйте повторить операцию. Если ошибка повторится,<br>
                    попробуйте перезагрузить страницу или обратитесь к администратору.
                </div>
                
                <div class="error-code">
                    ERR_CONNECTION_RESET x0000003456
                </div>
                
                <div class="error-buttons">
                    <button class="error-btn reload" onclick="location.reload()">
                        🔄 Перезагрузить страницу
                    </button>
                    <button class="error-btn" onclick="checkStatusNow()">
                        📡 Проверить статус
                    </button>
                </div>
                
                <div style="margin-top: 30px; color: #666; font-size: 0.9em;">
                    Автоматическая проверка через: <span id="countdown">30</span> сек
                </div>
            </div>
        `;
        
        // Добавляем на страницу
        document.body.appendChild(overlay);
        
        // Блокируем прокрутку
        document.body.style.overflow = 'hidden';
        
        // Запускаем таймер
        startCountdown();
    }
    
    function startCountdown() {
        let seconds = 30;
        const countdownEl = document.getElementById('countdown');
        
        if (!countdownEl) return;
        
        const timer = setInterval(() => {
            if (!document.getElementById('maintenance-overlay')) {
                clearInterval(timer);
                return;
            }
            
            seconds--;
            countdownEl.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(timer);
                location.reload();
            }
        }, 1000);
    }
    
    // Функция для кнопки "Проверить статус"
    window.checkStatusNow = function() {
        location.reload();
    };
})();
