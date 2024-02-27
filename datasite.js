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
// Ваш API URL для доступа к Airtable
const airtableApiUrl = 'https://api.airtable.com/v0/appyM5LkcacbXYVGh/deusid';

// Ваш API ключ для аутентификации
const apiKey = 'patuoL9R4t4wpFWXS';

// Заголовки для запроса
const headers = {
  Authorization: `Bearer ${apiKey}`,
};

// Выполняем запрос к Airtable API
fetch(airtableApiUrl, { headers })
  .then(response => response.json())
  .then(data => {
    // Проверка наличия данных
    if (data && data.records) {
      // Обработка полученных данных
      const site = data.records.map(record => ({
        name: record.fields.name,
        url: record.fields.url,
        date: record.fields.date,
        noti: record.fields.noti,
        noti_title: record.fields.noti_title,
        noti_text: record.fields.noti_text,
        blocker: record.fields.blocker,
        blocker_effect: record.fields.blocker_effect,
        blocker_redirecturl: record.fields.blocker_redirecturl,
        blocker_note: record.fields.blocker_note,
      }));

      // Ваш код, использующий полученные данные
      console.log(site);
    } else {
      console.error('No records found in Airtable data.');
    }
  })
  .catch(error => console.error('Error fetching data from Airtable:', error));
