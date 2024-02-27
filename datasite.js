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

const apiKey = 'patuoL9R4t4wpFWXS';
const baseId = 'appyM5LkcacbXYVGh';
const tableName = 'Site';

// URL для запросов к API Airtable
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// Заголовки запроса, включая API ключ
const headers = new Headers({
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
});

// Выполняем запрос к Airtable API
fetch(apiUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Получаем данные из ответа
    const records = data.records;

    // Обрабатываем данные (здесь можно добавить логику обработки)

    // Ваш код для использования данных из Airtable
    var site = records.map(record => ({
      name: record.fields.Name,
      url: record.fields.URL,
      date: record.fields.Date,
      // Добавьте другие поля по необходимости
    }));

    console.log(site);
  })
  .catch(error => {
    console.error('Ошибка при получении данных из Airtable:', error.message);
  });
