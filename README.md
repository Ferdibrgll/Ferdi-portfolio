# Ferdi Birgül – Portfolyo

Statik, derleme gerektirmeyen tek sayfalık portfolyo sitesi (HTML + CSS + JS).

## Klasör yapısı

```
ferdi-portfolio/
├─ index.html                  Sayfa iskeleti ve içerik
├─ assets/
│  ├─ css/style.css            Tüm stiller
│  ├─ js/main.js               Uzmanlık, sertifika, repo/yazı listeleri, iletişim formu, animasyonlar
│  ├─ js/featured.js           "Öne Çıkan İçerikler" kartları (yazının kendi kapak görseli)
│  └─ img/ferdi-profile.jpg    Profil fotoğrafı
├─ data/posts.json             Otomatik üretilir (GitHub Actions)
├─ scripts/update-posts.mjs    Medium/Hashnode akışlarından yazıları ve kapakları çeker
└─ .github/workflows/update-posts.yml   6 saatte bir scripti çalıştırır
```

## VS Code'da çalıştırma

1. Klasörü VS Code'da aç (`File > Open Folder`).
2. Önerilen eklenti **Live Server**'ı kur (`.vscode/extensions.json` zaten öneriyor).
3. `index.html` üzerinde sağ tık → **Open with Live Server**.

> `data/posts.json` okunduğu için dosyayı çift tıklayıp açmak yerine Live Server (veya `npx serve`) kullan.

## Öne çıkan içerik kartları

- Kartlar yazının kendi sayfasındaki kapak görselini (`og:image`) kullanır; stok görsel yoktur.
- Yeni bir yazı yayımladığında GitHub Actions `data/posts.json` dosyasını günceller ve kart otomatik görünür.
- Elle çalıştırmak için: `node scripts/update-posts.mjs` (Node 20+).
- Akış adresleri `scripts/update-posts.mjs` içindeki `FEEDS` listesindedir; başka platform eklemek için satır ekle.

## Yayınlama (GitHub Pages)

Repo ayarlarında **Settings → Pages → Deploy from a branch → main / (root)** seç.
