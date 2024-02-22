let isPreloaderDone = false; 
$("body").css("overflow","hidden"); 
$(document).ready(function() { 
setTimeout(function() { 
if (!isPreloaderDone) { 
isPreloaderDone = true; 
$("#preloader").delay(350).fadeOut('slow'); 
$("body").css("overflow",""); 
window.dispatchEvent(new Event('resize')); } }, 5000); }); 
$(window).on('load', function () { 
if (!isPreloaderDone) { 
isPreloaderDone = true; 
$("#preloader").delay(350).fadeOut('slow'); 
setTimeout(function() { 
$("body").css("overflow",""); 
window.dispatchEvent(new Event('resize')); }, 400); } });

//Background
//global Variables
let scene;
let camera;
let renderer;
let circle;
let skeleton;
let particle;
let ambientLight;
let dLight;

//function
function init() {
  //scene
  scene = new THREE.Scene();

  //camera Variables
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;

  // camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 500;

  const minCameraPosition = 100; // Минимальная позиция камеры
  const cameraChangeSpeed = 0.1; // Скорость изменения позиции камеры

  // Функция для изменения позиции камеры при прокрутке
  function updateCameraPosition() {
    // Получите текущую прокрутку страницы
    const scrollTop = window.scrollY;

    // Вычислите целевую позицию камеры в зависимости от прокрутки
    const targetCameraPosition =
      500 -
      400 *
        (scrollTop /
          (document.documentElement.scrollHeight - window.innerHeight));

    // Ограничьте минимальное значение позиции камеры
    if (targetCameraPosition < minCameraPosition) {
      camera.position.z = minCameraPosition;
    } else {
      camera.position.z = targetCameraPosition;
    }

    // Обновите отображение сцены
    scene.add(camera);
  }

  // Добавьте слушатель события прокрутки
  window.addEventListener("scroll", updateCameraPosition);

  //renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById("bg").appendChild(renderer.domElement);

  //3d object
  circle = new THREE.Object3D();
  skeleton = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(circle);
  scene.add(skeleton);
  scene.add(particle);

  //adding Geomentry
  let geometry = new THREE.TetrahedronGeometry(2, 1);
  let geomet = new THREE.IcosahedronGeometry(7, 1);
  let geomet2 = new THREE.IcosahedronGeometry(15, 4);

  //colorSet
  const getComputedStyleValue = (property) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();

  const bgCircleColor = getComputedStyleValue("--bg-color-circle");
  const bgSkeletColor = getComputedStyleValue("--bg-color-skelet");
  const bgOrbitsColor = getComputedStyleValue("--bg-color-orbits");
  const lightTopRightColor = getComputedStyleValue("--light-color-topright");
  const lightRightColor = getComputedStyleValue("--light-color-right");
  const lightFrontRightColor = getComputedStyleValue(
    "--light-color-frontright"
  );
  const lightBottomLeftColor = getComputedStyleValue(
    "--light-color-bottomleft"
  );

  //Material
  let material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(bgCircleColor),
    shading: THREE.FLatShading
  });

  let mat = new THREE.MeshPhongMaterial({
    color: new THREE.Color(bgSkeletColor),
    side: THREE.DoubleSide,
    wireframe: true
  });

  let mat2 = new THREE.MeshPhongMaterial({
    color: new THREE.Color(bgOrbitsColor),
    side: THREE.DoubleSide,
    wireframe: true
  });

  //Particle
  for (let i = 0; i < 1000; i++) {
    let mesh = new THREE.Mesh(geometry, mat2);
    mesh.position.set(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    );
    mesh.position.multiplyScalar(90 + Math.random() * 900);
    mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    particle.add(mesh);
  }

  //innerplanet
  let innerPlanet = new THREE.Mesh(geomet, material);
  innerPlanet.scale.x = innerPlanet.scale.y = innerPlanet.scale.z = 16;
  circle.add(innerPlanet);

  //outerPlanet
  let outerPlanet = new THREE.Mesh(geomet2, mat);
  outerPlanet.scale.x = outerPlanet.scale.y = outerPlanet.scale.z = 11;
  skeleton.add(outerPlanet);

  //ambientLight
  ambientLight = new THREE.AmbientLight(new THREE.Color(lightTopRightColor));
  scene.add(ambientLight);

  // directional light
  dLight = [];
  dLight[0] = new THREE.DirectionalLight(new THREE.Color(lightRightColor), 1);
  dLight[0].position.set(1, 0, 0);
  dLight[1] = new THREE.DirectionalLight(
    new THREE.Color(lightFrontRightColor),
    1
  );
  dLight[1].position.set(0.75, 1, 0.5);
  dLight[2] = new THREE.DirectionalLight(
    new THREE.Color(lightBottomLeftColor),
    1
  );
  dLight[2].position.set(-0.75, -1, 0.5);
  scene.add(dLight[0]);
  scene.add(dLight[1]);
  scene.add(dLight[2]);

  animate();
  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0;
  particle.rotation.y -= 0.0001;
  particle.rotation.z -= 0.0015;

  circle.rotation.x -= 0.002;
  circle.rotation.y -= 0.002;

  skeleton.rotation.x += 0.001;
  skeleton.rotation.y += 0.001;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.onload = init;

//меню
document.addEventListener("DOMContentLoaded", function () {
  const groups = {
    Profile: ["#soon"],
      System: ["#soon"],
      News: ["#news"],
      Table: ["#maintable"],
    Home: ["#home"],
    Shop: ["#soon"],
    About: ["#about"]
  };

  const showOnlyElements = (group) => {
    for (const id in groups) {
      groups[id].forEach((element) => {
        const el = document.querySelector(element);
        if (el) {
          el.style.display = group.includes(element) ? "block" : "none";
        }
      });
    }
  };

  const mainTabs = document.querySelector(".main-tabs");
  const mainSliderCircle = document.querySelector(".main-slider-circle");
  const roundButtons = document.querySelectorAll(".round-button");
  const filterTabs = document.querySelector(".filter-tabs");
  const filterButtons = document.querySelectorAll(".filter-button");

  // По умолчанию показываем группу Studio
  showOnlyElements(groups.Home);

  const colors = {
    yellow: {
      5: { value: "#464700" },
      10: { value: "linear-gradient(315deg, #685E00 0%, #181c1b 74%)" },
      15: { value: "#1A1900" },
      20: { value: "#4B4400" },
      25: { value: "#4B4400" },
      30: { value: "#4d4d4d" },
      35: { value: "#ffffff" },
      40: { value: "#aee0e6" },
      45: { value: "#d9db72" }
    },
    blue: {
      5: { value: "#00416A" },
      10: { value: "linear-gradient(315deg, #00416A 0%, #181c1b 74%)" },
      15: { value: "#00152E" },
      20: { value: "#002B60" },
      25: { value: "#002B60" },
      30: { value: "#4d4d4d" },
      35: { value: "#ffffff" },
      40: { value: "#aee0e6" },
      45: { value: "#d9db72" }
    },
    purple: {
      5: { value: "#2E004F" },
      10: { value: "linear-gradient(315deg, #5900A0 0%, #181c1b 74%)" },
      15: { value: "#1A002F" },
      20: { value: "#410179" },
      25: { value: "#410179" },
      30: { value: "#4d4d4d" },
      35: { value: "#ffffff" },
      40: { value: "#aee0e6" },
      45: { value: "#d9db72" }
    },
    red: {
      5: { value: "#500000" },
      10: { value: "linear-gradient(315deg, #B80015 0%, #181c1b 74%)" },
      15: { value: "#2B0005" },
      20: { value: "#5D020C" },
      25: { value: "#5D020C" },
      30: { value: "#4d4d4d" },
      35: { value: "#ffffff" },
      40: { value: "#aee0e6" },
      45: { value: "#d9db72" }
    },
    green: {
      5: { value: "#2B4900" },
      10: { value: "linear-gradient(315deg, #4B8706 0%, #181c1b 74%)" },
      15: { value: "#0F1C00" },
      20: { value: "#1D3303" },
      25: { value: "#1D3303" },
      30: { value: "#d4d4d4" },
      35: { value: "#ffffff" },
      40: { value: "#aee0e6" },
      45: { value: "#d9db72" }
    }
  };

  const getColor = (color, variant) => colors[color][variant].value;

  const handleActiveTab = (tabs, event, className) => {
    tabs.forEach((tab) => tab.classList.remove(className));
    if (!event.target.classList.contains(className)) {
      event.target.classList.add(className);
    }
  };

  mainTabs.addEventListener("click", (event) => {
    const root = document.documentElement;
    const targetColor = event.target.dataset.color;
    const targetTranslateValue = event.target.dataset.translateValue;

    if (event.target.classList.contains("round-button")) {
      mainSliderCircle.classList.remove("animate-jello");
      void mainSliderCircle.offsetWidth;
      mainSliderCircle.classList.add("animate-jello");

      root.style.setProperty("--translate-main-slider", targetTranslateValue);
      root.style.setProperty("--main-slider-color", getColor(targetColor, 5));
      root.style.setProperty("--bg-image", getColor(targetColor, 10));
      root.style.setProperty("--bg-color-circle", getColor(targetColor, 15));
      root.style.setProperty("--bg-color-skelet", getColor(targetColor, 20));
      root.style.setProperty("--bg-color-orbits", getColor(targetColor, 25));
      root.style.setProperty(
        "--light-color-topright",
        getColor(targetColor, 30)
      );
      root.style.setProperty("--light-color-right", getColor(targetColor, 35));
      root.style.setProperty(
        "--light-color-frontright",
        getColor(targetColor, 40)
      );
      root.style.setProperty(
        "--light-color-bottomleft",
        getColor(targetColor, 45)
      );

      handleActiveTab(roundButtons, event, "active");

      function getComputedStyleValue(property) {
        return getComputedStyle(document.documentElement)
          .getPropertyValue(property)
          .trim();
      }

      const bgCircleColor = getComputedStyleValue("--bg-color-circle");
      const bgSkeletColor = getComputedStyleValue("--bg-color-skelet");
      const bgOrbitsColor = getComputedStyleValue("--bg-color-orbits");
      const lightTopRightColor = getComputedStyleValue(
        "--light-color-topright"
      );
      const lightRightColor = getComputedStyleValue("--light-color-right");
      const lightFrontRightColor = getComputedStyleValue(
        "--light-color-frontright"
      );
      const lightBottomLeftColor = getComputedStyleValue(
        "--light-color-bottomleft"
      );

      const colorBgCircle = new THREE.Color(bgCircleColor);
      const colorBgSkelet = new THREE.Color(bgSkeletColor);
      const colorBgOrbits = new THREE.Color(bgOrbitsColor);
      const colorLightTopRight = new THREE.Color(lightTopRightColor);
      const colorLightRight = new THREE.Color(lightRightColor);
      const colorLightFrontRight = new THREE.Color(lightFrontRightColor);
      const colorLightBottomLeft = new THREE.Color(lightBottomLeftColor);

      circle.children[0].material.color = colorBgCircle;
      skeleton.children[0].material.color = colorBgSkelet;
      particle.children[0].material.color = colorBgOrbits;
      ambientLight.color = colorLightTopRight;
      dLight[0].color = colorLightRight;
      dLight[1].color = colorLightFrontRight;
      dLight[2].color = colorLightBottomLeft;

      if (!event.target.classList.contains("work")) {
        root.style.setProperty("--filters-container-height", "0");
        root.style.setProperty("--filters-wrapper-opacity", "0");
      } else {
        root.style.setProperty("--filters-container-height", "38px");
        root.style.setProperty("--filters-wrapper-opacity", "1");
      }
    }
  });

  roundButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const targetGroup = event.target.dataset.group;
      if (targetGroup) {
        if (targetGroup === "filter-button-active") {
          const filterActiveButton = document.querySelector(
            ".filter-button.filter-active"
          );
          if (filterActiveButton) {
            showOnlyElements(groups[filterActiveButton.dataset.group]);
          }
        } else {
          showOnlyElements(groups[targetGroup]);
        }
      }
    });
  });

  filterTabs.addEventListener("click", (event) => {
    const root = document.documentElement;
    const targetButton = event.target.closest(".filter-button");

    if (targetButton) {
      const targetTranslateValue = targetButton.dataset.translateValue;
      root.style.setProperty(
        "--translate-filters-slider",
        targetTranslateValue
      );

      filterButtons.forEach((button) =>
        button.classList.remove("filter-active")
      );
      targetButton.classList.add("filter-active");
      showOnlyElements(groups[targetButton.dataset.group]);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
//Home
// get the element
const text = document.querySelector(".typing-text");

// make a words array
const words = ["no-code модификаций", "сайтов", "веб-приложений"];

// start typing effect
setTyper(text, words);

function setTyper(element, words) {
  const LETTER_TYPE_DELAY = 75;
  const WORD_STAY_DELAY = 2000;

  const DIRECTION_FORWARDS = 0;
  const DIRECTION_BACKWARDS = 1;

  var direction = DIRECTION_FORWARDS;
  var wordIndex = 0;
  var letterIndex = 0;

  var wordTypeInterval;

  startTyping();

  function startTyping() {
    wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
  }

  function typeLetter() {
    const word = words[wordIndex];

    if (direction == DIRECTION_FORWARDS) {
      letterIndex++;

      if (letterIndex == word.length) {
        direction = DIRECTION_BACKWARDS;
        clearInterval(wordTypeInterval);
        setTimeout(startTyping, WORD_STAY_DELAY);
      }
    } else if (direction == DIRECTION_BACKWARDS) {
      letterIndex--;

      if (letterIndex == 0) {
        nextWord();
      }
    }

    const textToType = word.substring(0, letterIndex);

    element.textContent = textToType;
  }

  function nextWord() {
    letterIndex = 0;
    direction = DIRECTION_FORWARDS;
    wordIndex++;

    if (wordIndex == words.length) {
      wordIndex = 0;
    }
  }
}

(function ($) {
  "use strict";
  $.fn.sliderResponsive = function (settings) {
    var set = $.extend(
      {
        slidePause: 5000,
        fadeSpeed: 800,
        autoPlay: "on",
        showArrows: "off",
        hideDots: "off",
        hoverZoom: "on",
        titleBarTop: "off"
      },
      settings
    );

    var $slider = $(this);
    var size = $slider.find("> div").length; //number of slides
    var position = 0; // current position of carousal
    var sliderIntervalID; // used to clear autoplay

    // Add a Dot for each slide
    $slider.append("<ul></ul>");
    $slider.find("> div").each(function () {
      $slider.find("> ul").append("<li></li>");
    });

    // Put .show on the first Slide
    $slider.find("div:first-of-type").addClass("show");

    // Put .showLi on the first dot
    $slider.find("li:first-of-type").addClass("showli");

    //fadeout all items except .show
    $slider.find("> div").not(".show").fadeOut();

    // If Autoplay is set to 'on' than start it
    if (set.autoPlay === "on") {
      startSlider();
    }

    // If showarrows is set to 'on' then don't hide them
    if (set.showArrows === "on") {
      $slider.addClass("showArrows");
    }

    // If hideDots is set to 'on' then hide them
    if (set.hideDots === "on") {
      $slider.addClass("hideDots");
    }

    // If hoverZoom is set to 'off' then stop it
    if (set.hoverZoom === "off") {
      $slider.addClass("hoverZoomOff");
    }

    // function to start auto play
    function startSlider() {
      sliderIntervalID = setInterval(function () {
        nextSlide();
      }, set.slidePause);
    }

    // on mouseover stop the autoplay and clear interval
    $slider.mouseover(function () {
      clearInterval(sliderIntervalID);
    });

    // on mouseout starts the autoplay by calling startSlider
    $slider.mouseout(function () {
      startSlider();
    });

    //on right arrow click
    $slider.find("> .right").click(nextSlide);

    //on left arrow click
    $slider.find("> .left").click(prevSlide);

    // Go to next slide
    function nextSlide() {
      position = $slider.find(".show").index() + 1;
      if (position > size - 1) position = 0;
      changeCarousel(position);
    }

    // Go to previous slide
    function prevSlide() {
      position = $slider.find(".show").index() - 1;
      if (position < 0) position = size - 1;
      changeCarousel(position);
    }

    //when user clicks slider button
    $slider.find(" > ul > li").click(function () {
      position = $(this).index();
      changeCarousel($(this).index());
    });

    //this changes the image and button selection
    function changeCarousel() {
      $slider.find(".show").removeClass("show").fadeOut();
      $slider.find("> div").eq(position).fadeIn(set.fadeSpeed).addClass("show");
      // The Dots
      $slider.find("> ul").find(".showli").removeClass("showli");
      $slider.find("> ul > li").eq(position).addClass("showli");
    }

    return $slider;
  };
})(jQuery);

//////////////////////////////////////////////
// Activate each slider - change options
//////////////////////////////////////////////
$(document).ready(function () {
  $("#slider").sliderResponsive({
    // Using default everything
    // slidePause: 5000,
    // fadeSpeed: 800,
    // autoPlay: "on",
    // showArrows: "off",
    // hideDots: "off",
    // hoverZoom: "on",
    // titleBarTop: "off"
  });
});

(function () {
  "use strict";

  var carousels = function () {
    $("#home .testimonials .owl-carousel1").owlCarousel({
      loop: true,
      center: true,
      margin: 0,
      responsiveClass: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        680: {
          items: 2,
          nav: false,
          loop: false
        },
        1000: {
          items: 3,
          nav: true
        }
      }
    });
  };

  (function ($) {
    carousels();
  })(jQuery);
})();
//About
jQuery(document).ready(function () {
  jQuery(".about .faq-active").children().css({ display: "block" });

  jQuery(".about .faq-item").click(function () {
    var _this = jQuery(this);
    var check_active = _this.hasClass("faq-active");
    var rem_active = jQuery(".about .faq-item").removeClass("faq-active");

    if (check_active == false) {
      jQuery(".about .faq-content").slideUp(500);
      jQuery(_this).find(".faq-content").slideToggle(300);

      jQuery(".about .faq-icon").removeClass("faq-icon-open");
      jQuery(_this).find(".faq-icon").addClass("faq-icon-open");
    }
    var set_active = _this.addClass("faq-active");
  });
});

const cryptoWallets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "15FsecPaYKqwCKrxugfSQ7v7NWjQqJCpeT"
  },
  {
    symbol: "ETH",
    name: "Etherium",
    address: "0x96800af5023619eA338551a8E20b612C8Dd6192C"
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    address: "15jcJ4uQ7MwtCsfGXo4J1GDKzcFitGFw2VEwDd9E8HKmpoc7"
  },
  {
    symbol: "TON",
    name: "Toncoin",
    address: "EQDgfVN-8ZhzMPbexxnFSRZBBMhQjoZ4win1LdtGEhJ4hpfK"
  },
  {
    symbol: "XRP",
    name: "Ripple",
    address: "raHW9xPXB3YiQqkraR2DT1oH8vUr7X5EQT"
  }
];

// number format filter
Vue.filter("toMoney", (num, decimals) => {
  let o = {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  };
  return new Intl.NumberFormat("en-US", o).format(num);
});

// vue instance
new Vue({
  el: ".about .donate .card-wrap",

  // app data
  data: {
    cryptoWallets,
    tab: "BTC",
    wallet: {},
    statsCache: {},
    stats: {}
  },

  // created hook
  created() {
    // Set the initial active wallet on page load
    this.selectWallet(this.tab);
  },

  // computed methods
  computed: {
    // compute list wallets for tabs
    walletsList() {
      return this.cryptoWallets.map((w) => {
        w.active = w.symbol === this.tab;
        return w;
      });
    }
  },

  // custom methods
  methods: {
    // select active tab wallet
    selectWallet(symbol) {
      let wallet = this.cryptoWallets.find((w) => w.symbol === symbol);
      if (!wallet) return;
      wallet.copied = 0;
      this.wallet = { ...wallet };
      this.tab = symbol;
    },

    // copy text to clipboard
    copyText(txt) {
      txt = String(txt || "").trim();
      if (!txt) return;
      let input = document.createElement("input");
      document.body.appendChild(input);
      input.value = txt;
      input.select();
      document.execCommand("Copy");
      document.body.removeChild(input);
      this.wallet = { ...this.wallet, copied: 1 };
    },

    // get qr image url for selected wallet
    getQrImage() {
      const w = 180;
      const h = 180;
      const a = this.wallet.address;
      return `https://chart.googleapis.com/chart?chs=${w}x${h}&cht=qr&choe=UTF-8&chl=${a}`;
    }
  }
});
});
//News
var expandingAnimationTiming = 400;
var collapsingAnimationTiming = 200;

/* Extends jQuery animate easing */
$.easing = Object.assign({}, $.easing, {
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  }
});

/* Function to expand cards */
function expandElement(elementToExpand) {
  // Adds class 'open' to help with styling
  elementToExpand.parents(".news .card").addClass("open");

  // Prevents 'body' scroll
  $("body").addClass("lock");

  // freeze the current scroll position of the background page expand-wrapper
  var elementOffset = $(".news .list-wrapper").offset();
  var elementScrollTop = $("body").scrollTop();
  var netOffset = elementOffset.top - elementScrollTop;
  var expandPosition = $(".news .list-wrapper").offset();
  var expandTop = expandPosition.top;
  var expandLeft = expandPosition.left;
  var expandWidth = $(".news .list-wrapper").outerWidth();
  var expandHeight = $(".news .list-wrapper").outerHeight();

  $(".news .list-wrapper").css({
    top: netOffset,
    position: "fixed",
    overflow: "hidden",
    "z-index": "11"
  });

  // convert the expand-item to fixed position without moving it
  elementToExpand.css({
    top: elementToExpand.offset().top - $("body").scrollTop(),
    left: elementToExpand.offset().left,
    height: elementToExpand.height(),
    width: elementToExpand.width(),
    "max-width": expandWidth,
    position: "fixed"
  });

  // Changes height of banner
  var expandedHeight = elementToExpand
    .find(".news .banner")
    .data("height-expanded");
  elementToExpand.find(".news .banner").animate(
    {
      height: expandedHeight
    },
    expandingAnimationTiming,
    "easeOutBack"
  );

  // Changes position of content
  var expandedPosition = elementToExpand
    .find(".news .inner-content")
    .data("position-expanded");
  elementToExpand.find(".news .inner-content").animate(
    {
      top: expandedPosition
    },
    expandingAnimationTiming,
    "easeOutBack"
  );

  // start expand-item animation to the expand wrapper
  // expand the element with class .about-tile-bg-image
  elementToExpand.animate(
    {
      left: expandLeft,
      top: expandTop,
      height: expandHeight,
      width: expandWidth,
      "max-width": expandWidth
    },
    expandingAnimationTiming, // animation timing in millisecs
    "easeOutBack", //animation easing
    function () {
      elementToExpand.css({
        right: 0,
        bottom: 0,
        width: "auto",
        height: "auto"
      });

      elementToExpand.find(".news .banner-holder").css({
        position: "fixed"
      });
    }
  );
}

/* Function to collapse cards */
function collapseElement(collapseButton) {
  // find the element to collapse
  var elementToCollpseParent = collapseButton.parents(".news .card");
  var elementToCollpse = elementToCollpseParent.find(".card-content");

  // find the location of the placeholder
  var elementToCollpsePlaceholder = elementToCollpse.parents(
    ".news .card"
  );
  var elementToCollpsePlaceholderTop =
    elementToCollpsePlaceholder.offset().top - $("body").scrollTop();
  var elementToCollpsePlaceholderLeft = elementToCollpsePlaceholder.offset()
    .left;
  var elementToCollpsePlaceholderHeight = elementToCollpsePlaceholder.outerHeight();
  var elementToCollpsePlaceholderWidth = elementToCollpsePlaceholder.outerWidth();

  elementToCollpse.find(".news .banner-holder").css({
    position: "absolute"
  });

  // convert the width and height to numeric values
  elementToCollpse.css({
    right: "auto",
    bottom: "auto",
    width: elementToCollpse.outerWidth(),
    height: elementToCollpse.outerHeight()
  });

  $(".news .list-wrapper").css({
    top: 0,
    position: "absolute",
    overflow: "auto",
    "z-index": "1"
  });

  // Changes height of banner
  var collapsedHeight = elementToCollpse
    .find(".news .banner")
    .data("height");
  elementToCollpse.find(".news .banner").animate(
    {
      height: collapsedHeight
    },
    collapsingAnimationTiming,
    "linear"
  );

  // Changes position of content
  var collapsedPosition = elementToCollpse
    .find(".news .inner-content")
    .data("position");
  elementToCollpse.find(".news .inner-content").animate(
    {
      top: collapsedPosition
    },
    collapsingAnimationTiming,
    "linear"
  );

  elementToCollpse.animate(
    {
      left: elementToCollpsePlaceholderLeft,
      top: elementToCollpsePlaceholderTop,
      height: elementToCollpsePlaceholderHeight,
      width: elementToCollpsePlaceholderWidth
    },
    collapsingAnimationTiming, // animation timing in millisecs
    "linear", //animation easing
    function () {
      // Removes class 'open'
      elementToCollpseParent.removeClass("open");

      elementToCollpse.css({
        position: "relative",
        top: "auto",
        left: "auto",
        width: "100%",
        height: "100%"
      });
    }
  );

  // Stops preventing 'body' scroll
  $("body").removeClass("lock");
}

function setCardHeight() {
  $(".news .card ").each(function (index, element) {
    var slideHeight = $(element).find(".banner-holder").outerHeight();
    var containerHeight = $(element).find(".inner-content").outerHeight();
    var contentHeight = slideHeight + containerHeight;

    $(element).css({
      height: contentHeight
    });
  });
}

function attachListeners() {
  $(document)
    .on("click", ".news .card-content", function () {
      if ($(this).parents(".news .card").hasClass("open")) {
        return;
      }
      expandElement($(this));
    })
    .on("click", ".news .card .close-btn", function (event) {
      event.stopPropagation();
      collapseElement($(this));
    })
    .on("touchstart", ".news .card", function () {
      $(this).addClass("hover");
    })
    .on("touchend touchmove touchcancel", ".news .card", function () {
      $(this).removeClass("hover");
    });
}

function initialiseCards() {
  attachListeners();
  setCardHeight();
}

initialiseCards();

function copyCode(codeName) {
  const codeBoxes = document.querySelectorAll(
    '.news .code-box[data-code="' + codeName + '"]'
  );
  let codeText = "";

  codeBoxes.forEach((codeBox) => {
    codeText += codeBox.textContent + "\n\n";
  });

  const textArea = document.createElement("textarea");
  textArea.value = codeText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  alert("Код скопирован в буфер обмена");
}

document.addEventListener("DOMContentLoaded", function () {
const galleryMask = document.querySelector(
  ".news .description .gallery-mask"
);
const maskImage = document.querySelector(
  ".news .description .mask-image"
);
const galleryImgs = document.querySelectorAll(
  ".news .description .image-item"
);

galleryMask.addEventListener("click", () => {
  galleryMask.classList.add("mask-off");
});

galleryImgs.forEach((item) => {
  item.addEventListener("click", () => {
    let styleValue = item.getAttribute("style");
    maskImage.setAttribute(
      "src",
      styleValue.slice(styleValue.indexOf(": url(") + 7, -3)
    );
    galleryMask.classList.remove("mask-off");
  });
});
});

//Cookie
function checkConsent() {
    return localStorage.getItem('D3usN0tam') === 'true';
  }

  // Функция для сохранения согласия на куки
  function saveConsent() {
    localStorage.setItem('D3usN0tam', 'true');
  }

  // Функция для скрытия баннера согласия на куки
  function hideBanner() {
    const banner = document.querySelector('.deuscookie');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  // Функция для анимированного скрытия баннера согласия на куки
  function hideBannerWithAnimation() {
    const banner = document.querySelector('.deuscookie');
    if (banner) {
      banner.style.transition = 'top 0.5s ease, opacity 0.5s ease';
      banner.style.top = '-400px';
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 500);
    }
  }

  // Проверяем, было ли дано согласие на куки
  if (checkConsent()) {
    hideBanner();
  }

  // Обработчик клика по кнопке согласия
  const consentButton = document.querySelector('.deuscookie .consent-button');
  if (consentButton) {
    consentButton.addEventListener('click', () => {
      saveConsent();
      hideBannerWithAnimation();
    });
  }
