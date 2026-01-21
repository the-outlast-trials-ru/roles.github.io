// Функция для отображения ролей на странице справочника
function displayRoles(filteredRoles) {
    const rolesList = document.getElementById('roles-list');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.querySelector('#results-count span');
    
    // Очищаем контейнер
    rolesList.innerHTML = '';
    
    // Обновляем счетчик
    resultsCount.textContent = filteredRoles.length;
    
    // Если ролей нет, показываем сообщение
    if (filteredRoles.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    // Скрываем сообщение "не найдено"
    noResults.style.display = 'none';
    
    // Отображаем роли
    filteredRoles.forEach(role => {
        const roleCard = document.createElement('div');
        roleCard.className = 'role-card-detailed';
        roleCard.innerHTML = `
            <div class="role-header">
                <span class="role-dot-large" style="background:${role.color}"></span>
                <div class="role-title">${role.name}</div>
                <span class="role-category">${role.category}</span>
            </div>
            <div class="role-description-detailed">
                ${role.description}
            </div>
        `;
        rolesList.appendChild(roleCard);
    });
}

// Функция для заполнения селекта категорий
function populateCategories() {
    const categorySelect = document.getElementById('category-select');
    
    // Получаем уникальные категории из roles.js
    const categories = [...new Set(roles.map(r => r.category))];
    
    // Очищаем селект (оставляем только "Все категории")
    while (categorySelect.options.length > 1) {
        categorySelect.remove(1);
    }
    
    // Добавляем категории
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Функция для фильтрации ролей
function filterRoles() {
    const searchTerm = document.getElementById('role-search').value.toLowerCase();
    const selectedCategory = document.getElementById('category-select').value;
    
    let filteredRoles = roles;
    
    // Фильтрация по категории
    if (selectedCategory !== 'all') {
        filteredRoles = filteredRoles.filter(role => role.category === selectedCategory);
    }
    
    // Фильтрация по поисковому запросу
    if (searchTerm) {
        filteredRoles = filteredRoles.filter(role => 
            role.name.toLowerCase().includes(searchTerm) || 
            role.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Отображаем отфильтрованные роли
    displayRoles(filteredRoles);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Заполняем категории
    populateCategories();
    
    // Отображаем все роли при загрузке
    displayRoles(roles);
    
    // Назначаем обработчики событий
    document.getElementById('role-search').addEventListener('input', filterRoles);
    document.getElementById('category-select').addEventListener('change', filterRoles);
    
    // Кнопка очистки поиска
    document.getElementById('clear-search').addEventListener('click', function() {
        document.getElementById('role-search').value = '';
        filterRoles();
    });
    
    // Кнопка сброса фильтров
    document.getElementById('reset-filters').addEventListener('click', function() {
        document.getElementById('role-search').value = '';
        document.getElementById('category-select').value = 'all';
        filterRoles();
    });
});