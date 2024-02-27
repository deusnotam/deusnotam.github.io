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

const axios = require('axios');

const apiKey = 'patuoL9R4t4wpFWXS';
const baseId = 'appyM5LkcacbXYVGh';
const tableName = 'Site';

const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
};

axios.get(apiUrl, { headers })
  .then(response => {
    const data = response.data.records;

    const site = data.map(record => ({
      name: record.fields.Name,
      url: record.fields.URL,
      date: record.fields.Date,
      noti: record.fields.NotificationStatus,
      noti_title: record.fields.NotificationTitle,
      noti_text: record.fields.NotificationText,
      blocker: record.fields.BlockerStatus,
      blocker_effect: record.fields.BlockerEffect,
      blocker_redirecturl: record.fields.BlockerRedirectURL,
      blocker_note: record.fields.BlockerNote,
    }));

    // Теперь у вас есть массив объектов с данными из Airtable
    console.log(site);

    // Добавьте здесь свою логику обработки данных
  })
  .catch(error => {
    console.error('Ошибка при получении данных из Airtable:', error);
  });
