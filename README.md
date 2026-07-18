# Apex MMC — Mühasibatlıq &amp; Maliyyə veb sayt

Bu, **Node.js tələb etməyən, tam statik** (HTML + CSS + vanilla JavaScript) bir vebsaytdır.
Heç bir `npm install`, server və ya build addımı lazım deyil.

## Necə açmaq olar

**Ən sadə yol:** ZIP-i açın (unzip/extract edin) və `index.html` faylının üzərinə iki dəfə klikləyin — sayt birbaşa brauzerdə açılacaq.

**Tövsiyə olunan yol (dil dəyişimi və bütün funksiyaların qüsursuz işləməsi üçün):**
Bəzi brauzerlər (xüsusilə Chrome) təhlükəsizlik səbəbindən `file://` protokolu ilə açılan səhifələrdə bəzi funksiyaları məhdudlaşdıra bilər. Bunun qarşısını almaq üçün qovluğu kiçik bir yerli server ilə açmaq daha etibarlıdır:

- **VS Code istifadə edirsinizsə:** "Live Server" əlavəsini quraşdırın, `index.html`-ə sağ klikləyib "Open with Live Server" seçin.
- **Python quraşdırılıbsa:** Terminalda qovluğa daxil olub bunu yazın:
  ```
  python3 -m http.server 8000
  ```
  Sonra brauzerdə `http://localhost:8000` ünvanını açın.
- **Node.js quraşdırılıbsa** (istəsəniz, məcburi deyil):
  ```
  npx serve .
  ```
  və göstərilən linki açın.

Hər üç variantda sayt eyni görünəcək — fərq yalnız bəzi brauzer təhlükəsizlik məhdudiyyətlərinin aradan qalxmasıdır.

## Qovluq strukturu

```
apex-mmc/
├── index.html         → Ana səhifə (hero, xidmətlər, statistika, rəylər)
├── about.html         → Haqqımızda (komanda, missiya, tarixçə)
├── services.html      → Xidmətlərin ətraflı təsviri + FAQ
├── calculators.html   → ƏDV, əmək haqqı və sadələşdirilmiş vergi kalkulyatorları
├── pricing.html       → Qiymət paketləri (Başlanğıc / Standart / Premium)
├── blog.html          → Bloq məqalələri (vergi, əmək haqqı, audit mövzularında)
├── contact.html       → Əlaqə forması, ofis məlumatı, FAQ
├── portal.html        → Müştəri Portalı — demo giriş interfeysi
├── css/style.css      → Bütün dizayn (rənglər, tipoqrafiya, komponentlər)
├── js/main.js         → Naviqasiya, kalkulyatorlar, akkordeon, slayder və s.
├── js/i18n.js         → AZ / EN / RU dil dəyişdirici (yuxarı sağ küncdə)
└── assets/favicon.svg → Sayt ikonası
```

## Öz məlumatlarınızla necə fərdiləşdirmək olar

Kod redaktoru (VS Code, Sublime Text və s.) ilə faylları açıb aşağıdakıları dəyişə bilərsiniz — proqramlaşdırma bilgisi tələb olunmur, sadəcə mətn redaktəsidir:

1. **Əlaqə məlumatları** — hər səhifənin footer hissəsində və `contact.html`-də ünvan, telefon, e-poçt.
2. **Qiymətlər** — `pricing.html` faylında `149 ₼`, `349 ₼`, `749 ₼` kimi rəqəmləri özününüzlə əvəz edin.
3. **Komanda üzvləri** — `about.html` faylında ad, vəzifə və qısa təsvirlər.
4. **Vergi tarifləri** — `js/main.js` faylının yuxarı hissəsində kalkulyator düsturları şərhlərlə (comment) izah olunub; Vergi Məcəlləsi dəyişdikdə bu rəqəmləri yeniləmək kifayətdir.
5. **Loqo** — hazırda hərflərlə (Apex MMC) sadə SVG istifadə olunub; öz loqo faylınızı `assets/` qovluğuna əlavə edib `<img>` teqi ilə əvəz edə bilərsiniz.

## Real (canlı) sayta çevirmək üçün növbəti addımlar

Bu sayt hazırda **demo/statik** vəziyyətdədir:

- **Əlaqə forması** hazırda yalnız brauzerdə "göndərildi" mesajı göstərir, real e-poçt/CRM-ə göndərmir. Bunu aktivləşdirmək üçün Formspree, Google Forms, EmailJS kimi pulsuz xidmətlərdən birinə qoşmaq və ya öz backend sisteminizi qurmaq lazımdır.
- **Müştəri Portalı** (`portal.html`) hazırda vizual demo-dur, real istifadəçi məlumat bazasına qoşulmayıb.
- Domeninizi aldıqdan sonra bu qovluğu istənilən hosting xidmətinə (məsələn adi paylaşımlı hosting, Netlify, Vercel, GitHub Pages) yükləməklə sayt canlıya keçəcək.

## Texniki qeydlər

- Şriftlər Google Fonts CDN-dən yüklənir (Fraunces, IBM Plex Sans, IBM Plex Mono) — internet bağlantısı tələb olunur.
- Sayt tam responsive-dir (mobil, planşet, masaüstü).
- Heç bir xarici kitabxana (React, jQuery və s.) istifadə olunmayıb — sadə, sürətli və asan saxlanılan kod bazası.
