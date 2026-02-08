// maintenance-mode.js
// Добавьте этот файл в корень сайта

(function() {
    // Проверяем режим обслуживания
    if (localStorage.getItem('maintenance_mode') === 'active') {
        showMaintenanceScreen();
    }
    
    function showMaintenanceScreen() {
        // Если экран уже показан - выходим
        if (document.getElementById('maintenance-screen')) {
            return;
        }
        
        // Создаем экран ошибки
        const screen = document.createElement('div');
        screen.id = 'maintenance-screen';
        screen.innerHTML = `
            <style>
                #maintenance-screen {
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
                    <button class="error-btn reload" onclick="location.reload()">🔄 Перезагрузить страницу</button>
                </div>
                <div style="margin-top: 30px; color: #666; font-size: 0.9em;">
                    Автоматическая проверка через: <span id="countdown">30</span> сек
                </div>
            </div>
        `;
        
        // Добавляем на страницу
        document.body.appendChild(screen);
        
        // Блокируем прокрутку
        document.body.style.overflow = 'hidden';
        
        // Запускаем таймер
        startCountdown();
    }
    
    function startCountdown() {
        let seconds = 30;
        const countdownEl = document.getElementById('countdown');
        
        const timer = setInterval(() => {
            if (!document.getElementById('maintenance-screen')) {
                clearInterval(timer);
                return;
            }
            
            seconds--;
            if (countdownEl) {
                countdownEl.textContent = seconds;
            }
            
            if (seconds <= 0) {
                clearInterval(timer);
                location.reload();
            }
        }, 1000);
    }
    
    // Функция для кнопки "Проверить статус"
    window.checkMaintenanceStatus = function() {
        // Удаляем режим обслуживания и перезагружаем
        localStorage.removeItem('maintenance_mode');
        location.reload();
    };

})();
