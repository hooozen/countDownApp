function $(id) { return document.querySelector(id) };

function mian() {

  window.GOLOBAL = {
    motto: $('#motto'),
    bg: $('#bg'),
    deadline: getDeadline(),
    switchMottoTime: (new Date()).getMinutes(),
    switchBgTime: (new Date()).getMinutes(),
    mottos: [
      '不积跬步无以至千里', '北海虽赊，扶摇可接', '欲穷千里目，更上一层楼!', '大鹏一日同风起，扶摇直上九万里',
      '会当凌绝顶，一览众山小', '驽马十驾，功在不舍', '一寸光阴一寸金', '黄沙百战穿金甲，不破楼兰终不还',
      '故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能',
      '鹏北海，凤朝阳。又携书剑路茫茫。明年此日青云去，却笑人间举子忙',
    ],
  };

  var days = $('#days');
  var hours = $('#hours');
  var minutes = $('#minutes');
  var seconds = $('#secnds');
  var milliseconds = $('#milliseconds');

  registeServiceWorker();
  refresh();
}

function registeServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.info('service worker registed');
    });
  } else {
    console.warn('serviceWorker is not supported');
  }
}

function refresh() {
  window.requestAnimationFrame(freshNumbers);
}

function freshNumbers() {
  var numbers = getTimerNumbers(GOLOBAL.deadline);
  rendserNumber(numbers);
  switchMotto();
  switchBg();
  window.requestAnimationFrame(freshNumbers);
}

function rendserNumber(numbers) {
  days.innerText = numbers.days;
  hours.innerText = formatNumber(numbers.hours, 2);
  minutes.innerText = formatNumber(numbers.minutes, 2);
  seconds.innerText = formatNumber(numbers.seconds, 2);
  milliseconds.innerText = formatNumber(numbers.milliseconds, 3);
}

function formatNumber(number, length) {
  number = '' + number;
  if (number.length >= length) return number;
  return '0000000000'.substr(0, length - number.length) + number;

}

function getDeadline() {
  return new Date(2020, 11, 26);
}

function getTimerNumbers(deadline) {
  var now = Date.now();
  var remainingTime = (deadline - now);
  return {
    days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
    hours: Math.floor(remainingTime / (1000 * 60 * 60) % 24),
    minutes: Math.floor(remainingTime / (1000 * 60) % 60),
    seconds: Math.floor(remainingTime / 1000 % 60),
    milliseconds: Math.floor(remainingTime % 1000),
  }
};

function switchMotto() {
  var minutes = (new Date()).getMinutes();
  if (minutes != GOLOBAL.switchMottoTime) return;
  GOLOBAL.motto.innerText = GOLOBAL.mottos[Math.floor(GOLOBAL.mottos.length * Math.random())];
  GOLOBAL.switchMottoTime = Math.floor(Math.random() * 60);
}

function switchBg() {
  var minutes = (new Date()).getMinutes();
  if (minutes != GOLOBAL.switchBgTime) return;
  GOLOBAL.bg.style.backgroundImage = 'url(./style/assets/images/bg-' + Math.floor(Math.random() * 28)  + '.jpg)';
  GOLOBAL.switchBgTime = Math.floor(Math.random() * 60);
}


window.onload = mian();
