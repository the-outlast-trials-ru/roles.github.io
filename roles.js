[file name]: roles.js
[file content begin]
const roles = [
  {
    name: "Администратор по цифровым технологиям РУ",
    description: "Полный доступ к управлению сервером",
    color: "#ff6b6b",
    gradient: "linear-gradient(135deg, #ff6b6b, #ff4757)",
    category: "Администрация"
  },
  {
    name: "Модератор",
    description: "Контроль порядка на сервере",
    color: "#3498db",
    gradient: "linear-gradient(135deg, #3498db, #2980b9)",
    category: "Администрация"
  },
  {
    name: "Игрок",
    description: "Основная роль для участников",
    color: "#2ecc71",
    gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
    category: "Основные роли"
  },
  {
    name: "Главный администратор",
    description: "Контроль порядка на сервере",
    color: "#3498db",
    gradient: "linear-gradient(135deg, #3498db, #2980b9)",
    category: "Администрация"
  },
];

// Функция для создания карточки роли с адаптивным текстом
function createRoleCard(role) {
  const card = document.createElement('div');
  card.className = 'role-card';
  card.style.background = role.gradient;
  
  // Контейнер для названия роли с адаптивным текстом
  const titleContainer = document.createElement('div');
  titleContainer.className = 'text-container';
  
  const roleName = document.createElement('div');
  roleName.className = 'role-title adaptive-text';
  roleName.textContent = role.name;
  roleName.style.color = 'white';
  titleContainer.appendChild(roleName);
  
  // Категория роли с адаптивным текстом
  const category = document.createElement('div');
  category.className = 'role-category adaptive-text';
  category.textContent = role.category;
  category.style.backgroundColor = role.color;
  category.style.color = 'white';
  
  // Описание роли
  const description = document.createElement('div');
  description.className = 'role-description';
  description.textContent = role.description;
  description.style.color = 'rgba(255, 255, 255, 0.9)';
  
  // Собираем карточку
  card.appendChild(titleContainer);
  card.appendChild(category);
  card.appendChild(description);
  
  return card;
}

// Функция для отображения всех ролей
function displayRoles() {
  const container = document.getElementById('roles-container') || document.querySelector('.roles-container');
  
  if (!container) {
    console.warn('Контейнер для ролей не найден. Создайте элемент с id="roles-container"');
    return;
  }
  
  // Очищаем контейнер
  container.innerHTML = '';
  
  // Группируем роли по категориям
  const rolesByCategory = {};
  
  roles.forEach(role => {
    if (!rolesByCategory[role.category]) {
      rolesByCategory[role.category] = [];
    }
    rolesByCategory[role.category].push(role);
  });
  
  // Создаем секции по категориям
  Object.keys(rolesByCategory).forEach(category => {
    // Заголовок категории с адаптивным текстом
    const categoryHeader = document.createElement('h2');
    categoryHeader.className = 'category-header adaptive-text';
    categoryHeader.textContent = category;
    categoryHeader.style.marginTop = '30px';
    categoryHeader.style.marginBottom = '15px';
    categoryHeader.style.color = '#333';
    categoryHeader.style.fontSize = 'clamp(18px, 4vw, 24px)';
    categoryHeader.style.whiteSpace = 'nowrap';
    categoryHeader.style.overflow = 'hidden';
    categoryHeader.style.textOverflow = 'ellipsis';
    
    container.appendChild(categoryHeader);
    
    // Создаем контейнер для ролей этой категории
    const rolesGrid = document.createElement('div');
    rolesGrid.className = 'roles-grid';
    rolesGrid.style.display = 'grid';
    rolesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    rolesGrid.style.gap = '20px';
    rolesGrid.style.marginBottom = '30px';
    
    // Добавляем карточки ролей
    rolesByCategory[category].forEach(role => {
      const roleCard = createRoleCard(role);
      rolesGrid.appendChild(roleCard);
    });
    
    container.appendChild(rolesGrid);
  });
}

// Функция для добавления CSS стилей адаптивного текста
function addAdaptiveStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Адаптивные стили для текста ролей */
    .adaptive-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      min-width: 0;
    }
    
    .role-title {
      font-size: clamp(16px, 4vw, 22px);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      display: inline-block;
      width: fit-content;
    }
    
    .role-category {
      font-size: clamp(12px, 3vw, 14px);
      padding: 6px 12px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 15px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .role-description {
      font-size: clamp(14px, 3.5vw, 16px);
      line-height: 1.5;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      margin-top: 10px;
    }
    
    .role-card {
      padding: 20px;
      border-radius: 15px;
      color: white;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .role-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    
    .category-header {
      position: relative;
      padding-bottom: 10px;
    }
    
    .category-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, #3498db, #2ecc71);
      border-radius: 2px;
    }
    
    /* Адаптация для мобильных устройств */
    @media (max-width: 768px) {
      .roles-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
        gap: 15px !important;
      }
      
      .role-card {
        padding: 15px !important;
        min-height: 160px !important;
      }
      
      .role-title {
        font-size: clamp(15px, 5vw, 20px) !important;
        padding: 6px 10px !important;
      }
      
      .role-category {
        font-size: clamp(11px, 4vw, 13px) !important;
        padding: 5px 10px !important;
      }
    }
    
    @media (max-width: 480px) {
      .roles-grid {
        grid-template-columns: 1fr !important;
      }
      
      .role-title {
        font-size: clamp(14px, 6vw, 18px) !important;
      }
      
      .role-category {
        font-size: clamp(10px, 5vw, 12px) !important;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем адаптивные стили
  addAdaptiveStyles();
  
  // Отображаем роли
  displayRoles();
  
  // Добавляем обработчик для ресайза окна (обновляем при изменении размера)
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(displayRoles, 150);
  });
});

// Экспорт функций для использования в других файлах
window.RolesManager = {
  roles: roles,
  createRoleCard: createRoleCard,
  displayRoles: displayRoles,
  addAdaptiveStyles: addAdaptiveStyles
};
[file content end]
