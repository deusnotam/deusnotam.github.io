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

// Получение токена из GitHub Secrets
const authToken = process.env.XC_AUTH_TOKEN;

if (!authToken) {
    console.error('Ошибка: Токен не найден в GitHub Secrets.');
    process.exit(1);
}

const options = {
    method: 'GET',
    headers: {
        'xc-auth': authToken
    }
};

fetch('https://app.nocodb.com/api/v1/db/data/noco/p2kmbphsgvqs8kz/mpqof3e6f1ueozo/views/vwz1zne8sfxvhxco', options)
    .then(response => response.json())
    .then(data => {
        if (data && data.list && Array.isArray(data.list)) {
            // Преобразование данных в нужный формат
            const siteList = data.list.map(item => ({
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

            // Теперь 'siteList' содержит данные из вашей таблицы NocoDB
            console.log(siteList);
        } else {
            console.error('Ошибка: Полученные данные не соответствуют ожидаемой структуре');
        }
    })
    .catch(error => console.error('Ошибка при получении данных:', error));
