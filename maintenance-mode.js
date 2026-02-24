// maintenance-mode.js - РЕЖИМ ОБСЛУЖИВАНИЯ ДЛЯ ВСЕХ УСТРОЙСТВ
(function() {
    'use strict';
    
    // Функция проверки статуса из файла
    function checkMaintenance() {
        fetch('maintenance.txt?t=' + Date.now())
            .then(response => {
                if (!response.ok) return '0';
                return response.text();
            })
            .then(status => {
                if (status.trim() === '1') {
                    showMaintenanceScreen();
                }
            })
            .catch(() => {
                // При ошибке - сайт работает
            });
    }
    
    // Показ экрана ошибки
    function showMaintenanceScreen() {
        if (document.getElementById('maintenance-overlay')) return;
        
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
                </style>
                <div class="error-container">
                    <div class="error-title" style="display:flex; align-items:center; justify-content:center; gap:10px; font-weight:900;">
                        <img src="screenshots/Ошибка.png" alt="!" style="width:36px; height:auto;">
                        ОШИБКА СОЕДИНЕНИЯ!
                    </div>
                
                    <div class="error-subtitle">Не удалось установить соединение с сервером</div>
                
                    <div class="error-message">
                        К сожалению возникла непредвиденная ошибка.<br>
                        Попробуйте повторить операцию. Если ошибка повторится,<br>
                        попробуйте перезагрузить страницу или обратитесь к администратору.
                    </div>
                
                    <div class="error-code">ERR_CONNECTION_RESET</div>
                
                    <div style="margin-top: 30px;">
                        <button onclick="location.reload()" style="background: #ff3333; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; font-size: 1em; margin: 0 10px;">
                            🔄 Перезагрузить
                        </button>
                    </div>
                </div>
                `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    }
    
    // Проверяем при загрузке
    document.addEventListener('DOMContentLoaded', function() {
        checkMaintenance();
        setInterval(checkMaintenance, 10000);
    });
})();



