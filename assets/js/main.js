(function () {
  document.documentElement.classList.add("js");
  var GH = "https://github.com/Ferdibrgl", HN = "https://ferdibirgul.hashnode.dev";
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var words = ["IT Support", "Network Security", "System Administration", "Cybersecurity", "Active Directory", "Cisco", "Fortinet", "Windows Server", "Penetration Testing", "Red Team", "IoT Security"];
  var tr = document.getElementById("track"), mq = "";
  for (var k = 0; k < 4; k++) words.forEach(function (w) { mq += "<span>" + w + "</span>"; });
  tr.innerHTML = mq;

  var areas = [
    { t: "IT Destek ve Sistem Yönetimi", n: "Teknik çalışmalar", p: "Bilgisayar donanımları, Windows ve Linux sistemleri, Active Directory, kullanıcı yönetimi ve teknik sorun giderme süreçleri üzerine çalışıyorum.", c: ["Windows Server", "Active Directory", "Windows ve Linux", "Donanım ve kullanıcı desteği"] },
    { t: "Network ve Altyapı Güvenliği", n: "Ağ teknolojileri", p: "TCP/IP, VLAN, DHCP, DNS, yönlendirme, anahtarlama ve Fortinet güvenlik duvarı teknolojileri üzerine ağ yapılandırma ve güvenlik çalışmaları gerçekleştiriyorum.", c: ["Cisco Network Technician", "Cisco Network Support and Security", "FortiGate 7.4 Operator", "Visual-Network-Tracker"] },
    { t: "Siber Güvenlik ve Offensive Security", n: "Güvenlik araştırmaları", p: "Sızma testi metodolojileri, zafiyet analizi, web ve API güvenliği ile Red Team teknikleri üzerine laboratuvar çalışmaları ve güvenlik araştırmaları yürütüyorum.", c: ["Cisco Ethical Hacker", "Bug Bounty", "TryHackMe", "HTB CBBH çalışma notları", "API Pentest"] },
    { t: "IoT ve Endüstriyel Sistem Güvenliği", n: "Teknik araştırmalar", p: "IoT cihazları, gömülü sistemler ve endüstriyel kontrol sistemleri üzerine teknik araştırmalar, donanım incelemeleri ve uygulamalı çalışmalar yapıyorum.", c: ["CISA ICS300", "T-Watch S3 Plus incelemesi", "LilyGO T-Deck Pro incelemesi", "Flipper Zero rehberi"] }
  ];
  var xl = document.getElementById("xlist");
  xl.innerHTML = areas.map(function (a, i) {
    return '<div class="xrow' + (i === 0 ? " open" : "") + '">' +
      '<button class="xhead" id="xh' + i + '" aria-expanded="' + (i === 0) + '" aria-controls="xb' + i + '"><span class="t">' + a.t + '</span><span class="n">' + a.n + '</span><span class="pl" aria-hidden="true"></span></button>' +
      '<div class="xbody" id="xb' + i + '" role="region" aria-labelledby="xh' + i + '"><div><div class="xcontent"><p>' + a.p + '</p><ul class="chips">' +
      a.c.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></div></div></div></div>";
  }).join("");
  var rows = [].slice.call(xl.querySelectorAll(".xrow"));
  function openRow(r) {
    rows.forEach(function (x) { var on = x === r; x.classList.toggle("open", on); x.querySelector(".xhead").setAttribute("aria-expanded", on ? "true" : "false"); });
  }
  var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  rows.forEach(function (r) {
    var b = r.querySelector(".xhead");
    b.addEventListener("click", function () { if (r.classList.contains("open") && !canHover) { r.classList.remove("open"); b.setAttribute("aria-expanded", "false"); } else openRow(r); });
    if (canHover) r.addEventListener("mouseenter", function () { openRow(r); });
  });

  var certs = [
    ["Cisco", "Cisco Network Technician", "Ağ Teknolojileri"],
    ["Cisco", "Cisco Network Support and Security", "Ağ Teknolojileri"],
    ["Cisco", "Cisco Junior Cybersecurity Analyst", "Ağ Teknolojileri"],
    ["Fortinet", "FortiGate 7.4 Operator", "Ağ ve Güvenlik Duvarı"],
    ["CISA", "CISA ICS300", "Endüstriyel sistemler"],
    ["Sertifika", "MCBTA", "Siber güvenlik"],
    ["Sertifika", "C3SA", "Siber güvenlik"],
    ["Sertifika", "API Pentest", "Web ve API Güvenliği"],
    ["Eğitim rozeti", "Pentest, Incident Response, Forensics", "Sızma Testi ve Olay Müdahalesi"],
    ["Cisco", "Cisco Ethical Hacker", "Ofansif Güvenlik"],
    ["Hack The Box", "HTB CBBH çalışma notları", "Eğitim çalışması"],
    ["IBM, Cisco, Fortinet", "Ek rozetler", "Eğitim rozetleri"]
  ];
  var cg = document.getElementById("cgrid");
  cg.innerHTML = certs.map(function (c) { return '<div class="crow"><div class="cn">' + c[1] + '<span class="cs">' + c[2] + '</span></div><span class="ci">' + c[0] + "</span></div>"; }).join("");
  
  var repos = [
    ["HTB-certifiedCBBH", "Hack The Box CBBH eğitim yoluna yönelik teknik notlar, komut referansları ve uygulamalı çalışma içerikleri.", "★ 27 · 4 fork"],
    ["cyber-apocalypse-ctf--2023-2024-", "Hack The Box Cyber Apocalypse CTF 2024 kapsamında hazırlanan çözüm ve teknik analizler.", "PowerShell"],
    ["Tryhackme-", "TryHackMe laboratuvarlarına yönelik uygulamalı çözüm notları ve güvenlik araştırmaları.", "PowerShell · ★ 1"],
    ["Visual-Network-Tracker", "Python ile geliştirilen ağ trafiği izleme ve görselleştirme aracı.", "Python"],
    ["hacker-yol-haritas-", "Siber güvenlik öğrenimi için hazırlanmış teknik gelişim ve çalışma yol haritası.", "★ 1"]
  ];
  document.getElementById("repos").innerHTML = repos.map(function (r) {
    return '<a class="item" href="' + GH + "/" + r[0] + '" target="_blank" rel="noopener noreferrer"><span class="n">' + r[0] + '</span><span class="d">' + r[1] + '</span><span class="m">' + r[2] + "</span></a>";
  }).join("");

  var posts = [
    ["23 Tem 2025", "T-Watch S3 Plus İncelemesi: 2.4 GHz LoRa Destekli Giyilebilir IoT Platformu", "2 dk", "/t-watch-s3-plus-incelemesi-24-ghz-lora-destekli-giyilebilir-iot-platformu"],
    ["23 Tem 2025", "LoRa ve E-Ink ile Güçlü Bir Terminal: LilyGO T-Deck Pro İncelemesi", "3 dk", "/lora-ve-e-ink-ile-guclu-bir-terminal-lilygo-t-deck-pro-incelemesi"],
    ["20 Nis 2025", "Certified Red Team Professional Note", "2 dk", "/certified-red-team-professional-note"],
    ["31 Ara 2024", "Flipper Zero Guide for Beginners", "13 dk", "/flipper-zero-guide-for-beginners"],
    ["25 Nis 2024", "Red Team Fundamentals | TryHackMe Writeup/Walkthrough", "13 dk", "/red-team-fundamentals-tryhackme-writeupwalkthrough-by-ferdi-birgul"]
  ];
  document.getElementById("posts").innerHTML = posts.map(function (p) {
    return '<a class="item" href="' + HN + p[3] + '" target="_blank" rel="noopener noreferrer"><span class="n">' + p[1] + '</span><span class="m">' + p[0] + " · " + p[2] + " okuma</span></a>";
  }).join("");

  var links = [["GitHub", GH], ["LinkedIn", "https://www.linkedin.com/in/ferdi-birg%C3%BCl-590a44241"], ["Hashnode", HN], ["YouTube", "https://www.youtube.com/@Ferdibirgul."], ["Medium", "https://medium.com/@ferdibirgul"]];
  document.getElementById("clinks").innerHTML = links.map(function (l) { return '<a href="' + l[1] + '" target="_blank" rel="noopener noreferrer">' + l[0] + "<span>↗</span></a>"; }).join("");

  /* Web3Forms: Portfolyo iletişim formu */
  var WEB3FORMS_ACCESS_KEY = "9953d564-0f48-4317-ae46-0e2756963b77";
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form && status) {
    var submitButton = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var name = document.getElementById("senderName").value.trim();
      var email = document.getElementById("senderEmail").value.trim();
      var subject = document.getElementById("mailSubject").value.trim();
      var message = document.getElementById("mailMessage").value.trim();
      if (!name || !email || !subject || message.length < 10) {
        status.textContent = "Lütfen bütün zorunlu alanları doldurun (mesaj en az 10 karakter olmalı).";
        return;
      }

      if (submitButton) submitButton.disabled = true;
      status.textContent = "Mesaj gönderiliyor...";
      try {
        var response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name,
            email: email,
            subject: "Portfolyo: " + subject,
            konu: subject,
            message: message,
            from_name: "Ferdi Portfolio"
          })
        });
        var result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Form servisi isteği kabul etmedi.");
        }
        status.textContent = "Mesajınız başarıyla alındı! Teşekkür ederim.";
        form.reset();
      } catch (error) {
        status.textContent = "Mesaj gönderilemedi. " + (error && error.message ? error.message : "Lütfen daha sonra tekrar deneyin.");
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  /* kaydırınca açılma */
  var rv = [].slice.call(document.querySelectorAll(".rv"));
  function show(el) { el.classList.add("in"); }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    rv.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rv.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) show(el); }); }, 1200);
  } else { rv.forEach(show); }

  /* sayaçlar: fare üzerine gelince 0'dan hedefe sayar; ekrana ilk girişte de bir kez çalışır */
  var stats = [].slice.call(document.querySelectorAll(".stat"));
  function runCount(s) {
    var to = +s.dataset.count, from = +(s.dataset.from || 0);
    if (REDUCED) { s.textContent = to; return; }
    cancelAnimationFrame(+s.dataset.raf || 0);
    var t0 = null;
    function f(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
      s.textContent = Math.round(from + (to - from) * e);
      if (k < 1) s.dataset.raf = requestAnimationFrame(f);
    }
    s.dataset.raf = requestAnimationFrame(f);
  }
  stats.forEach(function (st) {
    var s = st.querySelector("strong[data-count]"); if (!s) return;
    s.textContent = REDUCED ? s.dataset.count : (s.dataset.from || 0);
    var busy = false;
    function play() { if (busy) return; busy = true; runCount(s); setTimeout(function () { busy = false; }, 1500); }
    st.addEventListener("pointerenter", play);
    st.addEventListener("focus", play);
    st.addEventListener("click", play);
    if ("IntersectionObserver" in window) {
      var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { play(); so.unobserve(st); } }); }, { threshold: 0.6 });
      so.observe(st);
    } else { s.textContent = s.dataset.count; }
  });

  /* ilerleme çubuğu, fotoğraf kayması, imleç ışığı */
  var bar = document.getElementById("progress"), photo = document.querySelector("#photo img"), ticking = false;
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
    if (!REDUCED && photo && window.scrollY < 1200) photo.style.transform = "translateY(" + (window.scrollY * 0.12) + "px) scale(1.08)";
    if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
    ticking = false;
  }
  var toTop = document.getElementById("toTop");
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }); });
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (canHover) window.addEventListener("pointermove", function (e) { document.body.style.setProperty("--mx", e.clientX + "px"); document.body.style.setProperty("--my", e.clientY + "px"); }, { passive: true });
})();
