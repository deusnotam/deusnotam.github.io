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

const options = {
    method: 'GET',
    headers: {
        'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnlhYWJyb3NAZ21haWwuY29tIiwiZGlzcGxheV9uYW1lIjoiRGFuaWVsIEFicm9zIiwiYXZhdGFyIjpudWxsLCJ1c2VyX25hbWUiOm51bGwsImlkIjoidXM1cGE1a3FlYmx6MjBxOSIsInJvbGVzIjoib3JnLWxldmVsLXZpZXdlciIsInRva2VuX3ZlcnNpb24iOiI4MjMyYzQ5ZGJhNjhhOTRlYTg0MGY5ZGUwOTljMDQ1NTQ0YjA2MGRjNDExNTFlYWZhMzEwNzM1OGE2M2MwNjI1MWExOTQwMGI0MzM5ZTdiOCIsInByb3ZpZGVyIjoiY29nbml0byIsImlhdCI6MTcwOTA2MzE3MSwiZXhwIjoxNzA5MDk5MTcxfQ.mjkJTW5DiVDwtGvzxGw6cLVY2PLM4w3tFUMEKQKi6B4'
    }
};

fetch('https://app.nocodb.com/api/v1/db/data/noco/p2kmbphsgvqs8kz/mpqof3e6f1ueozo/views/vwz1zne8sfxvhxco?offset=0&limit=25&where=', options)
    .then(response => response.json())
    .then(data => {
        // Преобразование данных в нужный формат, предположим, что это массив объектов
        const site = data.map(item => ({
            name: item.name,
            url: item.url,
            date: item.date,
            noti: item.noti,
            noti_title: item.noti_title,
            noti_text: item.noti_text,
            blocker: item.blocker,
            blocker_effect: item.blocker_effect,
            blocker_redirecturl: item.blocker_redirecturl,
            blocker_note: item.blocker_note,
        }));

        // Теперь 'site' содержит данные из вашей таблицы NocoDB
        console.log(site);
    })
    .catch(error => console.error('Ошибка при получении данных:', error));
