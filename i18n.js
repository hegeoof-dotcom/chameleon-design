/* Chameleon VPN — переключатель RU/EN.
   Интерфейс написан на русском; в режиме EN тексты подменяются по словарю и правилам
   (числа, даты и цены сохраняются). Новые экраны переводятся автоматически. */
(function(){
const EXACT={
  // главная
  'потяни планету':'drag the planet','Защита активна':'Protection on','Скоро закончится':'Ending soon','Защита выключена':'Protection off',
  'Вы под':'You are','защитой.':'protected.','Осталось':'Only','VPN':'VPN','отключён.':'is off.',
  'Подключи защиту за минуту — трафик выглядит как обычный, до 9 устройств.':'Get protected in a minute — your traffic looks ordinary, up to 9 devices.',
  'Выбрать тариф':'Choose a plan','Как подключить':'How to connect','Подключить устройство':'Connect a device',
  'Ключ':'Key','Устройства':'Devices','Продлить':'Renew','Баланс':'Balance','Пополнить':'Top up','+ Пополнить':'+ Top up',
  'Друзья':'Friends','с их оплат':'of their payments','Подари VPN другу':'Gift VPN to a friend','Оплати с баланса — отправь ссылку':'Pay from balance — send a link',
  'История платежей':'Payment history','О сервисе':'About','Главная':'Home','Тарифы':'Plans','История':'History','Аккаунт':'Account',
  'Рефералы':'Referrals','Подарки':'Gifts','Админ-панель':'Admin panel',
  // тарифы
  'Выбери':'Pick','свой тариф.':'your plan.','Безлимитный трафик и все страны на любом тарифе':'Unlimited traffic and all countries on every plan',
  'Базовый':'Basic','Семейный':'Family','Расширенный':'Extended','Популярный':'Popular','от':'from','/мес':'/mo',
  'Оформление':'Checkout','Безлимит':'Unlimited','безлимит':'unlimited','Полная скорость':'Full speed','Срок подписки':'Subscription term',
  '1 месяц':'1 month','3 месяца':'3 months','6 месяцев':'6 months','12 месяцев':'12 months','Выгоднее всего':'Best value',
  'Выберите срок':'Choose a term','Срок':'Term','Тариф':'Plan',
  // оплата
  'Пополнение':'Top up','Текущий баланс':'Current balance','Выберите сумму':'Choose an amount','Или своя сумма':'Or your amount',
  'Минимальная сумма — 10 ₽':'Minimum amount — 10 ₽','Далее':'Next','Способ оплаты':'Payment method','Сумма':'Amount','Выберите способ':'Choose a method',
  'Оплатить внутренним балансом':'Pay with your balance','СБП':'SBP','Система быстрых платежей — мгновенно':'Faster Payments System — instant',
  'ЮKassa':'YooKassa','Банковская карта, СБП':'Bank card, SBP','Оплатить':'Pay','Загрузка...':'Loading...',
  // рефералы
  'Реферальная программа':'Referral program','Приглашай друзей —':'Invite friends —','получай':'get',
  'с каждой их оплаты на твой баланс.':'of every payment they make, to your balance.','Баланс тратится на VPN и подарки.':'Spend it on VPN and gifts.',
  'Приглашено':'Invited','Заработано':'Earned','Копировать':'Copy','Пригласить друга':'Invite a friend','Как это работает':'How it works',
  'Отправь другу свою ссылку':'Send your link to a friend','Друг подключает VPN и оплачивает тариф':'Your friend connects VPN and pays for a plan',
  'Ты сразу получаешь бонус на баланс — с каждой его оплаты':'You instantly get a bonus — from every payment they make',
  'Для блогеров':'For creators','Партнёрская программа':'Partner program','Зарабатывай на своём контенте':'Earn with your content',
  'Размести наш баннер или ссылку в ролике — платим деньгами, а не бонусами. Условия согласуем лично после проверки аккаунта.':'Place our banner or link in your video — we pay in money, not bonuses. Terms are agreed personally after we review your account.',
  'Подать заявку':'Apply','Приглашённые':'Invited friends','Пока никого нет — отправь ссылку первому другу':'Nobody yet — send your link to the first friend',
  'Заявка блогера':'Creator application','Расскажи о своём канале — администрация проверит аккаунт и свяжется с тобой, чтобы согласовать формат и оплату.':'Tell us about your channel — our team will review it and contact you to agree on the format and payment.',
  'Площадка':'Platform','Другое':'Other','Ссылка на аккаунт':'Account link','Аудитория':'Audience','до 10 тыс.':'under 10K','10–100 тыс.':'10–100K',
  '100 тыс.–1 млн':'100K–1M','1 млн+':'1M+','Средние просмотры ролика':'Average views per video','Отправить заявку':'Send application',
  'например, 25 000':'e.g. 25,000','Заявка отправлена':'Application sent','Вернуться':'Back',
  // о сервисе
  'Трафик маскируется под обычный — работает там, где другие VPN блокируют.':'Traffic is disguised as ordinary — works where other VPNs get blocked.',
  'Пользовательское соглашение':'Terms of service','Политика конфиденциальности':'Privacy policy','Поддержка':'Support',
  'Есть вопрос или что-то не работает — напиши, ответим быстро.':'Have a question or something is broken — write to us, we reply fast.',
  'Написать в поддержку':'Contact support',
  // подарок
  'Подарок':'Gift','Оплати с баланса — друг получит ссылку и активирует подписку в один клик':'Pay from your balance — your friend gets a link and activates in one tap',
  'Ваш баланс':'Your balance','Подарок создан':'Gift created','🎁 Подарок готов!':'🎁 Your gift is ready!','Подарок готов!':'Your gift is ready!',
  'Отправь ссылку другу — он получит подписку бесплатно':'Send the link to your friend — they get the subscription for free',
  'Ссылка для активации':'Activation link','Скопировать ссылку':'Copy link','Поделиться в Telegram':'Share in Telegram','Пополнить баланс':'Top up balance',
  // устройства
  'устройств подключено':'devices connected','Подключить новое устройство':'Connect a new device','Пока пусто':'Nothing here yet',
  'Устройство появится здесь после первого подключения.':'A device appears here after its first connection.','Нет активной подписки':'No active subscription',
  'Оформи тариф — и здесь появятся твои устройства.':'Get a plan — your devices will show up here.','Тарифы ':'Plans',
  'Лимит устройств исчерпан. Удали ненужное устройство или перейди на тариф с большим лимитом.':'Device limit reached. Remove a device you don’t use or switch to a bigger plan.',
  // подключение
  'Подключение':'Connection','Приложение':'App','Рекомендуем':'Recommended','Проверенный':'Proven','Установи приложение':'Install the app',
  'Скачать APK':'Download APK','Скачать .dmg':'Download .dmg','Установщик Windows':'Windows installer','Mac на Intel':'Intel Mac','Инструкция для TV':'TV guide',
  'Добавь подписку':'Add the subscription','Приложение откроется, и подписка добавится сама.':'The app opens and the subscription is added automatically.',
  'Подписки пока нет — оформи её, и кнопка станет активной.':'No subscription yet — get one and this button turns on.',
  'Добавить подписку':'Add subscription','Скопировать ссылку вручную':'Copy the link manually','Готово — включай':'Done — switch it on',
  'Нажми большую кнопку включения в приложении. Сервер выбирается автоматически, при желании выбери другой в списке.':'Tap the big power button in the app. The server is picked automatically — choose another one from the list if you like.',
  // аккаунт / история
  'Подписка активна':'Subscription active','Осталось дней':'Days left','Истекает':'Expires','Трафик':'Traffic','Конфиг для подключения':'Connection config',
  'Скопировать конфиг':'Copy config','Продлить подписку':'Renew subscription','Успешно':'Success','Ожидание':'Pending','Ошибка':'Error',
  'Операций пока нет':'No operations yet','Нет данных':'No data','Ошибка загрузки':'Loading error',
  // админка
  'Требует внимания':'Needs attention','Средний чек':'Average check','Платежей':'Payments','Активных подписок':'Active subscriptions',
  'Истекают за 7 дней':'Expiring in 7 days','Пользователей':'Users','Платящих':'Paying','По тарифам':'By plan','Популярные покупки':'Top purchases',
  'Способы оплаты':'Payment methods','Приведено рефералами':'Brought by referrals','Остатки на балансах':'Balances outstanding',
  'обязательства перед клиентами':'owed to customers','Покупки с баланса':'Balance purchases','за период, не выручка':'for the period, not revenue',
  'Последние операции':'Latest operations','Выдано':'Delivered','Оплачено':'Paid','Отказ':'Declined','Сбой выдачи':'Delivery failed',
  'Пополнение баланса':'Balance top-up','Нет доступа':'No access','Покупок пока нет':'No purchases yet',
  'Демо-данные. На сервере здесь будут реальные цифры из базы бота.':'Demo data. On the server this shows real numbers from the bot database.',
  // вход
  'Вход через Telegram':'Sign in with Telegram','Открой бота':'Open the bot','Отправь команду':'Send the command','Введи полученный':'Enter the',
  '8-значный код':'8-digit code','ниже':'below','Войти':'Sign in','Войти →':'Sign in','Проверяем...':'Checking...',
  // уведомления
  'Конфиг скопирован ✓':'Config copied ✓','Ошибка копирования':'Copy failed','Конфиг недоступен':'Config unavailable','Ссылка скопирована!':'Link copied!',
  'Введите сумму от 10 ₽':'Enter at least 10 ₽','Выберите способ оплаты':'Choose a payment method','Войдите через Telegram':'Sign in with Telegram',
  'Устройство удалено':'Device removed','Ошибка соединения':'Connection error','Выбери площадку':'Choose a platform','Вставь ссылку на аккаунт':'Paste your account link',
  'Укажи размер аудитории':'Choose your audience size','Сначала оформи подписку':'Get a subscription first','Создаём...':'Creating...',
  'Неверный или просроченный код':'Invalid or expired code','Введи все 8 цифр кода из бота':'Enter all 8 digits from the bot',
};
const RULES=[
  [/^(\d+) (дней|дня|день)\.?$/,(m,n)=>`${n} ${n==='1'?'day':'days'}${m.endsWith('.')?'.':''}`],
  [/^(\d+) дней$/,(m,n)=>`${n} days`],
  [/^· до (.+)$/,(m,d)=>`· until ${d}`],
  [/^до (\d\d\.\d\d\.\d{4})$/,(m,d)=>`until ${d}`],
  [/^Тариф «(.+)» ·$/,(m,n)=>`Plan “${tr(n)||n}” ·`],
  [/^до (\d+) устройств · безлимит$/,(m,n)=>`up to ${n} devices · unlimited`],
  [/^до (\d+) устройств одновременно$/,(m,n)=>`up to ${n} devices at once`],
  [/^до (\d+) устр\.$/,(m,n)=>`up to ${n} dev.`],
  [/^(\d+) устройств$/,(m,n)=>`${n} devices`],
  [/^до −(\d+)%$/,(m,n)=>`up to −${n}%`],
  [/^(\d+) ₽\/мес( ·)?$/,(m,n,d)=>`${n} ₽/mo${d||''}`],
  [/^Оплатить (\d+) ₽$/,(m,n)=>`Pay ${n} ₽`],
  [/^Подарить за (\d+) ₽$/,(m,n)=>`Gift for ${n} ₽`],
  [/^добавлено (.+)$/,(m,d)=>`added ${d}`],
  [/^с (\d\d\.\d\d\.\d{4})$/,(m,d)=>`since ${d}`],
  [/^Выручка за (\d+) дн\.$/,(m,n)=>`Revenue, ${n} days`],
  [/^(\d+) дней$/,(m,n)=>`${n} days`],
  [/^сегодня (.+) · за всё время (.+)$/,(m,a,b)=>`today ${a} · all time ${b}`],
  [/^(?:(\d+) оплачено, но доступ не выдан · )?(\d+) ждут оплаты$/,(m,a,b)=>`${a?a+' paid but not delivered · ':''}${b} awaiting payment`],
  [/^\+(\d+) за период · \+(\d+) за сутки$/,(m,a,b)=>`+${a} this period · +${b} in 24h`],
  [/^конверсия (.+) · пробник у (\d+)$/,(m,a,b)=>`conversion ${a} · ${b} on trial`],
  [/^(\d+) покупок$/,(m,n)=>`${n} purchases`],
  [/^(\d+) шт\.$/,(m,n)=>`${n} pcs`],
  [/^(\d+) операций( · не выручка)?$/,(m,n,x)=>`${n} operations${x?' · not revenue':''}`],
  [/^начислено бонусов (.+)$/,(m,a)=>`bonuses credited ${a}`],
  [/^активировано (\d+)$/,(m,a)=>`redeemed ${a}`],
  [/^Нажми кнопку и установи (\S+) на это устройство\.$/,(m,a)=>`Tap the button and install ${a} on this device.`],
  [/^Не хватает$/,()=>'Not enough'],
  [/^на балансе$/,()=>'on balance'],
  [/^Подписка «(.+)» на (.+)\. Отправь ссылку другу — он нажмёт и получит доступ\.$/,(m,a,b)=>`“${tr(a)||a}” subscription for ${tr(b)||b}. Send the link to your friend — one tap and they’re in.`],
  [/^Проверим (.+) и напишем тебе в Telegram в течение 1–2 дней\.$/,(m,a)=>`We’ll review ${a} and message you in Telegram within 1–2 days.`],
  [/^Удалить «(.+)»\? .*$/,(m,a)=>`Remove “${a}”? It will be disconnected from VPN and free a slot for a new device.`],
];
function tr(t){
  if(Object.prototype.hasOwnProperty.call(EXACT,t))return EXACT[t];
  for(const[re,fn]of RULES){const m=t.match(re);if(m)return fn(...m);}
  if(t.includes(' · ')){ // составные строки: «Семейный · 1 месяц · СБП · 22.11 14:52»
    let hit=false;const parts=t.split(' · ').map(p=>{const x=tr(p);if(x!==null){hit=true;return x;}return p;});
    if(hit)return parts.join(' · ');
  }
  return null;
}
let lang='ru';
try{lang=localStorage.getItem('cvpn_lang')||'ru';}catch(e){}
const done=new Set();
function fix(n){
  if(n.nodeType!==3)return;
  const p=n.parentElement;if(!p||p.closest('script,style,[data-noi18n]'))return;
  const raw=n.nodeValue;const core=raw.replace(/\s+/g,' ').trim();
  if(!core||!/[А-Яа-яЁё]/.test(core))return;
  const en=tr(core);if(en===null)return;
  if(n.__ru===undefined)n.__ru=raw;
  n.nodeValue=raw.replace(raw.trim(),en);done.add(n);
}
function fixAttrs(el){
  el.querySelectorAll?.('[placeholder],[aria-label]').forEach(e=>{
    ['placeholder','aria-label'].forEach(a=>{const v=e.getAttribute(a);if(v&&/[А-Яа-я]/.test(v)){const en=tr(v);if(en!==null){e['__ru_'+a]=v;e.setAttribute(a,en);done.add(e);}}});
  });
}
function walk(root){
  if(!root)return;
  if(root.nodeType===3){fix(root);return;}
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())fix(n);
  fixAttrs(root);
}
const mo=new MutationObserver(list=>{
  if(lang!=='en')return;
  for(const m of list){
    if(m.type==='characterData')fix(m.target);
    else m.addedNodes.forEach(walk);
  }
});
function apply(){
  document.documentElement.lang=lang;
  document.querySelectorAll('.lang-b').forEach(b=>b.textContent=lang==='en'?'EN':'RU');
  if(lang==='en'){walk(document.body);}
  else{
    done.forEach(n=>{
      if(n.nodeType===3&&n.__ru!==undefined){n.nodeValue=n.__ru;delete n.__ru;}
      else if(n.nodeType===1){['placeholder','aria-label'].forEach(a=>{if(n['__ru_'+a]){n.setAttribute(a,n['__ru_'+a]);delete n['__ru_'+a];}});}
    });
    done.clear();
  }
}
window.I18N={
  get lang(){return lang;},
  T(s){return lang==='en'?(tr(s)??s):s;},
  set(l){lang=l==='en'?'en':'ru';try{localStorage.setItem('cvpn_lang',lang);}catch(e){}apply();},
  toggle(){this.set(lang==='en'?'ru':'en');},
};
function start(){mo.observe(document.body,{childList:true,subtree:true,characterData:true});apply();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
