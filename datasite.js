/*!
 * DataSite.js
 * by Deus Notam
 * Telegram → https://t.me/d3usn0tam
 * 
 * Доступные причины (cause):
 * didnt pay - не оплата работы
 *
 * Доступные эффекты (effect):
 * redirect - редирект на redirecturl
 * thanos - поверх сайта чёрный экран с gif щелчком таноса
 */

// Подключение datasite.js - база данных сайтов
  var airtablejs = document.createElement('script');
  airtablejs.src = 'https://cdnjs.cloudflare.com/ajax/libs/airtable/0.11.0/airtable.min.js';
  document.head.appendChild(airtablejs);

const apiKey = 'patuoL9R4t4wpFWXS';
const baseId = 'appyM5LkcacbXYVGh';
const tableName = 'Site';

 airtablejs.onload = function() {
  const base = new Airtable({ apiKey: apiKey }).base(baseId);

  // Получаем данные из Airtable
  base(tableName).select({
    view: 'Grid view',  // замените 'Grid view' на ваше представление
  }).eachPage(function page(records, fetchNextPage) {
    // Обрабатываем каждую страницу записей
    const site = records.map(record => ({
      name: record.get('Name'),
      url: record.get('URL'),
      date: record.get('Date'),
      // Добавьте другие поля по необходимости
    }));
    
    console.log(site);

    // Переходим к следующей странице, если она есть
    fetchNextPage();
  }, function done(err) {
    if (err) {
      console.error('Ошибка при получении данных из Airtable:', err);
      return;
    }
  });
};
