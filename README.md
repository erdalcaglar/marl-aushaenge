# Marl Aushänge – çok dilli QR afiş sistemi

Her afiş/Aushang için tek bir veri dosyası (`notices/<slug>.json`) yazılır; geri kalanı otomatik üretilir.

```
python3 tools/build.py notices/<slug>.json   # sayfa + QR + afiş HTML
node tools/render.js a/<slug>                 # poster.pdf, label.pdf, önizlemeler
```

Üretilenler (`a/<slug>/`):
- `index.html` – QR'ın açtığı sayfa: önce 10 dil seçimi, sonra o dilde duyuru + arka plan bilgisi + Wikipedia/video linkleri (Arapça ve Farsça sağdan sola)
- `poster.pdf` – QR kodlu Almanca A4 afiş
- `label.pdf` – mevcut bir afişin üstüne yapıştırmak için A6 QR etiketi
- `qr.svg`, `qr.png` – sadece QR kod

Diller: de, ar, en, fr, ku (Kurmancî), tr, sq, ru, fa, zh.
Temalar (`theme`): night, warm, fresh, info.

QR adresi: `<base_url>/a/<slug>/` (`tools/config.json`). Adres değişmesin diye `slug` bir kez verildikten sonra değiştirilmez.
Gizlilik: sayfalar herkese açıktır; isim, oda numarası, telefon gibi kişisel bilgi yazılmaz.
