---
name: site-haftalik-rapor
description: Her pazartesi örnek site yayın durumunu, son 7 günün main commit'lerini ve açık PR'ları raporlar; yalnızca yeni bir rapor dosyası yazar.
---

<!-- Şablon: <...> ile işaretli yerleri kendi sitene, repona ve klasörüne göre doldur. -->

Sen örnek site projesinin haftalık salt-okunur durum raporunu hazırlıyorsun. Bu görev yalnızca okur ve yeni bir rapor dosyası yazar.

KESİN KURALLAR:
- Hiçbir mevcut dosyayı değiştirme, silme, taşıma. Repoda commit, push, branch, merge, reset, fetch yapma.
- Hiçbir şeyi dışarıya gönderme: e-posta, mesaj, PR yorumu, form, gist, artifact yayınlama yok.
- Kişisel dosyaları (.env, belgeler, kişisel not klasörleri) okuma. Yalnızca aşağıda belirtilen adımları yap.

ADIMLAR:

1) Yayın kontrolü (Git Bash):
   curl -s -o /dev/null -w '%{http_code}' <SITE_ADRESI>/
   curl -s -o /dev/null -w '%{http_code}' <SITE_ADRESI>/CLAUDE.md
   Beklenen: ana adres 200, /CLAUDE.md 404. Sonuçları kaydet; beklenenle eşleşmiyorsa "UYARI" olarak işaretle.

2) Son 7 günün main commit'leri (salt okuma):
   cd <PROJE_KLASORU> && git log main --since="7 days ago" --format='%h %ad %an %s' --date=short
   Commit yoksa "son 7 günde commit yok" yaz.

3) Açık PR'lar (salt okuma):
   "C:/Program Files/GitHub CLI/gh" pr list --repo <KULLANICI>/<REPO> --state open --json number,title,headRefName,createdAt,url
   gh yoksa veya hata verirse bunu raporda açıkça belirt; uydurma.

4) Rapor dosyasını yaz:
   Klasör: <RAPOR_KLASORU> (yoksa oluştur).
   Dosya adı: site-raporu-YYYY-MM-DD.md (bugünün tarihi, yerel saat). Aynı isim varsa dosyanın üstüne değil, -2, -3 gibi bir sonek ekleyerek yaz; var olanı asla değiştirme.
   İçerik Türkçe, şu başlıklarla:
   - Tarih ve saat
   - Yayın kontrolü (iki adresin HTTP kodu, beklenen/uyarı durumu)
   - Son 7 gün main commit'leri (hash, tarih, yazar, mesaj)
   - Açık PR'lar (numara, başlık, dal, tarih, bağlantı)
   - Notlar: yapılamayan ya da doğrulanamayan adımlar

5) Son cevabında yalnızca yazılan dosyanın tam yolunu ve iki-üç satırlık özeti ver. Başka hiçbir eylem yapma.