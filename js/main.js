/* =========================================================
   APEX MMC — main.js
   Vanilla JS, no dependencies, no build step.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

  /* ---------- mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if(navToggle && mobileNav){
    navToggle.addEventListener("click", function(){
      mobileNav.classList.toggle("open");
    });
  }

  /* ---------- active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .mobile-nav a").forEach(function(a){
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll("[data-counter]");
  if(counters.length){
    const countIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter"));
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200;
        const start = performance.now();
        function tick(now){
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function(el){ countIO.observe(el); });
  }

  /* ---------- back to top ---------- */
  const backTop = document.querySelector(".back-top");
  if(backTop){
    window.addEventListener("scroll", function(){
      backTop.classList.toggle("show", window.scrollY > 600);
    });
    backTop.addEventListener("click", function(){
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  /* ---------- accordion (FAQ) ---------- */
  document.querySelectorAll(".accordion-item").forEach(function(item){
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    if(!trigger || !panel) return;
    trigger.addEventListener("click", function(){
      const isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item.open").forEach(function(other){
        if(other !== item){
          other.classList.remove("open");
          other.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- testimonial slider ---------- */
  const testiWrap = document.querySelector(".testi-wrap");
  if(testiWrap){
    const slides = testiWrap.querySelectorAll(".testi-slide");
    const dotsWrap = testiWrap.querySelector(".testi-dots");
    let current = 0;
    function show(i){
      slides.forEach(function(s, idx){ s.style.display = idx === i ? "block" : "none"; });
      if(dotsWrap){
        dotsWrap.querySelectorAll("button").forEach(function(d, idx){
          d.classList.toggle("active", idx === i);
        });
      }
      current = i;
    }
    if(dotsWrap){
      slides.forEach(function(_, idx){
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", "Rəy " + (idx+1));
        dot.addEventListener("click", function(){ show(idx); });
        dotsWrap.appendChild(dot);
      });
    }
    const prev = testiWrap.querySelector(".testi-arrow.left");
    const next = testiWrap.querySelector(".testi-arrow.right");
    if(prev) prev.addEventListener("click", function(){ show((current - 1 + slides.length) % slides.length); });
    if(next) next.addEventListener("click", function(){ show((current + 1) % slides.length); });
    show(0);
    setInterval(function(){ show((current + 1) % slides.length); }, 6500);
  }

  /* ---------- calculator tabs ---------- */
  document.querySelectorAll(".calc-tabs").forEach(function(tabs){
    const shell = tabs.closest(".calc-shell");
    tabs.querySelectorAll(".calc-tab").forEach(function(tab){
      tab.addEventListener("click", function(){
        tabs.querySelectorAll(".calc-tab").forEach(function(t){ t.classList.remove("active"); });
        tab.classList.add("active");
        const target = tab.getAttribute("data-target");
        shell.querySelectorAll(".calc-pane").forEach(function(p){ p.classList.remove("active"); });
        shell.querySelector("#" + target).classList.add("active");
      });
    });
  });

  /* ---------- VAT (ƏDV) calculator ---------- */
  const vatAmount = document.getElementById("vat-amount");
  const vatMode = document.getElementById("vat-mode");
  if(vatAmount){
    const RATE = 0.18;
    function calcVat(){
      const amount = parseFloat(vatAmount.value) || 0;
      const mode = vatMode.value;
      let net, vat, gross;
      if(mode === "net"){
        net = amount; vat = net * RATE; gross = net + vat;
      } else {
        gross = amount; net = gross / (1 + RATE); vat = gross - net;
      }
      document.getElementById("vat-net").textContent = net.toFixed(2) + " ₼";
      document.getElementById("vat-tax").textContent = vat.toFixed(2) + " ₼";
      document.getElementById("vat-gross").textContent = gross.toFixed(2) + " ₼";
    }
    vatAmount.addEventListener("input", calcVat);
    vatMode.addEventListener("change", calcVat);
    calcVat();
  }

  /* ---------- Net salary (əmək haqqı) calculator ---------- */
  const salaryGross = document.getElementById("salary-gross");
  if(salaryGross){
    function incomeTax(gross){
      // 2026 rates, private non-oil/gas sector, monthly
      if(gross <= 2500){
        return Math.max(0, (gross - 200) * 0.03);
      } else if(gross <= 8000){
        return 75 + (gross - 2500) * 0.10;
      } else {
        return 625 + (gross - 8000) * 0.14;
      }
    }
    function employeeSocial(gross){
      // DSMF employee share: 3% up to 200, 10% above 200
      if(gross <= 200) return gross * 0.03;
      return 200 * 0.03 + (gross - 200) * 0.10;
    }
    function employerSocial(gross){
      // DSMF employer share: 22% to 200, 15% 200-8000, 11% above 8000
      if(gross <= 200) return gross * 0.22;
      if(gross <= 8000) return 200 * 0.22 + (gross - 200) * 0.15;
      return 200 * 0.22 + (8000 - 200) * 0.15 + (gross - 8000) * 0.11;
    }
    function unemployment(gross){ return gross * 0.005; }

    function calcSalary(){
      const gross = parseFloat(salaryGross.value) || 0;
      const tax = incomeTax(gross);
      const empSoc = employeeSocial(gross);
      const empUnemp = unemployment(gross);
      const net = gross - tax - empSoc - empUnemp;
      const erSoc = employerSocial(gross);
      const erUnemp = unemployment(gross);
      const totalCost = gross + erSoc + erUnemp;

      document.getElementById("salary-tax").textContent = tax.toFixed(2) + " ₼";
      document.getElementById("salary-social").textContent = empSoc.toFixed(2) + " ₼";
      document.getElementById("salary-unemp").textContent = empUnemp.toFixed(2) + " ₼";
      document.getElementById("salary-net").textContent = net.toFixed(2) + " ₼";
      document.getElementById("salary-er-cost").textContent = totalCost.toFixed(2) + " ₼";
    }
    salaryGross.addEventListener("input", calcSalary);
    calcSalary();
  }

  /* ---------- Simplified tax (sadələşdirilmiş vergi) calculator ---------- */
  const stTurnover = document.getElementById("st-turnover");
  if(stTurnover){
    function calcSimplified(){
      const turnover = parseFloat(stTurnover.value) || 0;
      const region = document.getElementById("st-region").value;
      const rate = region === "baku" ? 0.02 : 0.005;
      const tax = turnover * rate;
      document.getElementById("st-rate").textContent = (rate*100).toFixed(1) + "%";
      document.getElementById("st-tax").textContent = tax.toFixed(2) + " ₼";
      document.getElementById("st-net").textContent = (turnover - tax).toFixed(2) + " ₼";
    }
    stTurnover.addEventListener("input", calcSimplified);
    document.getElementById("st-region").addEventListener("change", calcSimplified);
    calcSimplified();
  }

  /* ---------- generic slider labels (range inputs with output) ---------- */
  document.querySelectorAll(".slider-row input[type='range']").forEach(function(range){
    const out = range.parentElement.querySelector("output");
    function update(){ out.textContent = range.value; }
    range.addEventListener("input", update);
    update();
  });

  /* ---------- pricing monthly/annual toggle ---------- */
  const planToggle = document.querySelector(".plan-toggle");
  if(planToggle){
    const buttons = planToggle.querySelectorAll("button");
    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        buttons.forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode");
        document.querySelectorAll("[data-price-monthly]").forEach(function(el){
          el.textContent = mode === "monthly" ? el.getAttribute("data-price-monthly") : el.getAttribute("data-price-annual");
        });
        document.querySelectorAll("[data-price-note]").forEach(function(el){
          el.textContent = mode === "monthly" ? "/ ay" : "/ ay, illik ödənişdə";
        });
      });
    });
  }

  /* ---------- contact form (client-side only demo) ---------- */
  const contactForm = document.getElementById("contact-form");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      const success = document.getElementById("contact-success");
      if(success){
        success.classList.add("show");
        success.scrollIntoView({ behavior:"smooth", block:"center" });
      }
      contactForm.reset();
    });
  }

  /* ---------- newsletter form ---------- */
  document.querySelectorAll(".newsletter-form").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      const btn = form.querySelector("button");
      const original = btn.textContent;
      btn.textContent = "Təşəkkürlər!";
      setTimeout(function(){ btn.textContent = original; }, 2400);
      form.reset();
    });
  });

  /* ---------- blog post expand ---------- */
  document.querySelectorAll(".post-card [data-expand]").forEach(function(btn){
    btn.addEventListener("click", function(){
      const detail = btn.closest(".post-body").querySelector(".post-detail");
      const isOpen = detail.classList.toggle("open");
      btn.textContent = isOpen ? "Bağla ↑" : "Ətraflı oxu →";
    });
  });

  /* ---------- portal tabs (login / register demo) ---------- */
  const portalTabs = document.querySelector(".portal-tabs");
  if(portalTabs){
    const buttons = portalTabs.querySelectorAll("button");
    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        buttons.forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");
        document.querySelectorAll(".portal-pane").forEach(function(p){ p.style.display = "none"; });
        document.getElementById(btn.getAttribute("data-pane")).style.display = "block";
      });
    });
  }
  const portalForm = document.getElementById("portal-login-form");
  if(portalForm){
    portalForm.addEventListener("submit", function(e){
      e.preventDefault();
      const msg = document.getElementById("portal-msg");
      msg.textContent = "Bu, demo interfeysdir — canlı sistemdə daxil olduğunuz kimi hesabatlarınız, vergi təqvimi və sənəd mübadiləsi bu pəncərədə açılacaq.";
      msg.style.display = "block";
    });
  }

});
