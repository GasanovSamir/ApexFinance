/* =========================================================
   APEX MMC — i18n (AZ / EN / RU)
   Lightweight, no build step, no fetch (works from file://).
   Elements opt in with data-i18n="key" (textContent)
   or data-i18n-html="key" (innerHTML, for strings with <em>/<br>)
   or data-i18n-ph="key" (placeholder attribute).
   ========================================================= */

const APEX_I18N = {
  az: {
    "nav.home": "Ana səhifə",
    "nav.about": "Haqqımızda",
    "nav.services": "Xidmətlər",
    "nav.calculators": "Kalkulyatorlar",
    "nav.pricing": "Qiymətlər",
    "nav.blog": "Bloq",
    "nav.contact": "Əlaqə",
    "nav.portal": "Müştəri Portalı",
    "nav.cta": "Məsləhət alın",

    "hero.eyebrow": "Bakı · Mühasibatlıq və Maliyyə Konsaltinqi",
    "hero.h1": "Rəqəmləriniz danışsın, <em>siz isə biznesinizi böyüdün.</em>",
    "hero.lede": "Apex MMC — kiçik və orta bizneslər üçün tam mühasibat uçotu, vergi, əmək haqqı və maliyyə hesabatlılığını bir dam altında birləşdirən peşəkar komandadır.",
    "hero.cta1": "Pulsuz məsləhət alın",
    "hero.cta2": "Xidmətlərə baxın",
    "hero.stat1n": "11+",
    "hero.stat1s": "İl təcrübə",
    "hero.stat2n": "260+",
    "hero.stat2s": "Aktiv müştəri",
    "hero.stat3n": "0",
    "hero.stat3s": "İtirilmiş məhkəmə işi",
    "hero.stat4n": "24/48s",
    "hero.stat4s": "Orta cavab müddəti",

    "footer.rights": "Bütün hüquqlar qorunur.",
    "footer.tagline": "Bakıda 2013-cü ildən fəaliyyət göstərən lisenziyalı mühasibatlıq, audit və vergi konsaltinq şirkəti.",
    "footer.company": "Şirkət",
    "footer.services": "Xidmətlər",
    "footer.resources": "Resurslar",
    "footer.contactHead": "Əlaqə",

    "btn.consult": "Pulsuz məsləhət alın",
    "btn.seeServices": "Xidmətlərə baxın",
    "btn.viewPricing": "Qiymətlərə baxın",
    "btn.sendRequest": "Sorğu göndər",
    "btn.calculate": "Hesabla",
    "btn.login": "Daxil ol",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.calculators": "Calculators",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.portal": "Client Portal",
    "nav.cta": "Get a consult",

    "hero.eyebrow": "Baku · Accounting & Financial Consulting",
    "hero.h1": "Let your numbers speak, <em>so you can grow the business.</em>",
    "hero.lede": "Apex MMC is a professional team bringing full-cycle bookkeeping, tax, payroll and financial reporting together under one roof for small and mid-size businesses.",
    "hero.cta1": "Get a free consult",
    "hero.cta2": "Explore services",
    "hero.stat1n": "11+",
    "hero.stat1s": "Years in practice",
    "hero.stat2n": "260+",
    "hero.stat2s": "Active clients",
    "hero.stat3n": "0",
    "hero.stat3s": "Lost tax disputes",
    "hero.stat4n": "24/48h",
    "hero.stat4s": "Average response time",

    "footer.rights": "All rights reserved.",
    "footer.tagline": "A licensed accounting, audit and tax consulting firm operating in Baku since 2013.",
    "footer.company": "Company",
    "footer.services": "Services",
    "footer.resources": "Resources",
    "footer.contactHead": "Contact",

    "btn.consult": "Get a free consult",
    "btn.seeServices": "Explore services",
    "btn.viewPricing": "View pricing",
    "btn.sendRequest": "Send request",
    "btn.calculate": "Calculate",
    "btn.login": "Sign in",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.services": "Услуги",
    "nav.calculators": "Калькуляторы",
    "nav.pricing": "Цены",
    "nav.blog": "Блог",
    "nav.contact": "Контакты",
    "nav.portal": "Кабинет клиента",
    "nav.cta": "Бесплатная консультация",

    "hero.eyebrow": "Баку · Бухгалтерский и финансовый консалтинг",
    "hero.h1": "Пусть цифры говорят сами, <em>а вы развивайте бизнес.</em>",
    "hero.lede": "Apex MMC — профессиональная команда, объединяющая полный цикл бухучёта, налогов, расчёта зарплаты и финансовой отчётности под одной крышей для малого и среднего бизнеса.",
    "hero.cta1": "Бесплатная консультация",
    "hero.cta2": "Смотреть услуги",
    "hero.stat1n": "11+",
    "hero.stat1s": "Лет практики",
    "hero.stat2n": "260+",
    "hero.stat2s": "Активных клиентов",
    "hero.stat3n": "0",
    "hero.stat3s": "Проигранных налоговых споров",
    "hero.stat4n": "24/48ч",
    "hero.stat4s": "Среднее время ответа",

    "footer.rights": "Все права защищены.",
    "footer.tagline": "Лицензированная бухгалтерская, аудиторская и налоговая консалтинговая компания в Баку с 2013 года.",
    "footer.company": "Компания",
    "footer.services": "Услуги",
    "footer.resources": "Ресурсы",
    "footer.contactHead": "Контакты",

    "btn.consult": "Бесплатная консультация",
    "btn.seeServices": "Смотреть услуги",
    "btn.viewPricing": "Смотреть цены",
    "btn.sendRequest": "Отправить заявку",
    "btn.calculate": "Рассчитать",
    "btn.login": "Войти",
  }
};

(function(){
  const STORAGE_KEY = "apex_lang";

  function getLang(){
    return localStorage.getItem(STORAGE_KEY) || "az";
  }

  function applyLang(lang){
    if(!APEX_I18N[lang]) lang = "az";
    document.documentElement.setAttribute("lang", lang);
    const dict = APEX_I18N[lang];

    document.querySelectorAll("[data-i18n]").forEach(function(el){
      const key = el.getAttribute("data-i18n");
      if(dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function(el){
      const key = el.getAttribute("data-i18n-html");
      if(dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
      const key = el.getAttribute("data-i18n-ph");
      if(dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });
    document.querySelectorAll("[data-lang-label]").forEach(function(el){
      el.textContent = lang.toUpperCase();
    });
    document.querySelectorAll(".lang-menu button").forEach(function(btn){
      btn.setAttribute("aria-current", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
  }

  function initLangSwitch(){
    applyLang(getLang());
    document.querySelectorAll(".lang-menu button").forEach(function(btn){
      btn.addEventListener("click", function(){
        applyLang(btn.getAttribute("data-lang"));
        document.querySelectorAll(".lang-menu").forEach(function(m){ m.classList.remove("open"); });
      });
    });
    document.querySelectorAll(".lang-btn").forEach(function(btn){
      btn.addEventListener("click", function(e){
        e.stopPropagation();
        const menu = btn.parentElement.querySelector(".lang-menu");
        menu.classList.toggle("open");
      });
    });
    document.addEventListener("click", function(){
      document.querySelectorAll(".lang-menu").forEach(function(m){ m.classList.remove("open"); });
    });
  }

  document.addEventListener("DOMContentLoaded", initLangSwitch);
})();
