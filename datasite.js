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
var site = [
    
    {name: 'ABROS',
     url: 'https://abros.me',
     date: '09/01/2022',
        noti: 'active',
           noti_title: 'Тестовый сайт',
           noti_text: 'Данный сайт в черном списке<br>Подробности на <a style="color: #32a6ff;" href="https://codepen.io/cleveryeti/pen/JjwNqgP" target="_blank">сайте</a>',
        blocker: 'active',
           blocker_date: '01/01/2022',
           blocker_cause: 'didnt pay',
           blocker_effect: 'thanos',
           blocker_redirecturl: 'https://www.notion.so/deusnotam/D3usN0tam-System-ba149f69de214fd3ba0b9df834eb2c6e',
        deusid: 'active',
    }
];
