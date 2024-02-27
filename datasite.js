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

// Функция для получения данных с сервера
async function fetchData() {
    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        
        if (data && data.list && Array.isArray(data.list)) {
            return data.list.map(item => ({
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
        } else {
            console.error('Ошибка: Полученные данные не соответствуют ожидаемой структуре');
            return [];
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

// Вызываем функцию получения данных и экспортируем ее
fetchData().then(data => {
    console.log(data); // Выводим данные в консоль (можно убрать после проверки)
});
