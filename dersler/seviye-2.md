# Seviye 2 · İş tarif etme

Amaç: Claude'a işi doğru tarif etmeyi, büyük işi önce planlatmayı, kanıt istemeyi ve bir hatayı güvenle geri almayı öğrenmek.

Bu seviyeden itibaren sitenin klasörü bir git deposu olsun (`git init`, ilk commit). GitHub henüz gerekmiyor.

## 2.1 İyi istek: amaç, kapsam, kısıt, bitti ölçütü

**Kavram:** İyi bir istek dört şey söyler: amaç (neden), kapsam (nereye kadar), kısıt (neye dokunulmayacak) ve "bitti" ölçütü (ne zaman bitmiş sayılır). Belirsiz istek de çoğu zaman bir sonuç üretir, ama Claude boşlukları kendi tahminiyle doldurur ve odak dağılır. Net istek hem sonucu hem kontrolü kolaylaştırır.

**Alıştırma:**
1. Belirsiz bir istek ver: "Siteyi daha güzel yap."
2. Ne değiştiğini `git diff` ile gör, sonra geri al.
3. Aynı işi dört parçayla yaz: "Amaç: ziyaretçi ilk ekranda ne iş yaptığımızı anlasın. Kapsam: yalnız giriş bölümü. Kısıt: renklere ve diğer bölümlere dokunma. Bitti: başlık en fazla 8 kelime, altında tek cümlelik açıklama."
4. Sonucu ilk denemeyle karşılaştır: neyin değiştiği, neyin değişmediği.

**Geçti ölçütü:** Sitenin iletişim formuna e-posta doğrulaması eklenecek. Bu işi dört parçalı bir istek olarak yaz; özellikle "bitti" ölçütü ölçülebilir olsun.

**Benzetme:** İyi bir iş emri: ne yapılacak, nereye kadar, neye dokunulmayacak, ne zaman bitmiş sayılır.

**Sık hata:** "Bitti" ölçütünü yazmamak. O zaman işin bittiğine Claude karar verir.

## 2.2 Plan modu

**Kavram:** Plan modunda Claude dosya değiştirmez; önce okur, araştırır ve ne yapacağını bir plan olarak sunar. Sen planı okur, düzeltir, onaylarsın; ancak ondan sonra uygulama başlar. Büyük ya da çok dosyaya yayılan işlerde sürprizleri baştan yakalamanın en ucuz yoludur.

**Alıştırma:**
1. Plan moduna geç.
2. Orta büyüklükte bir iş iste: "Hizmetler bölümünü üç kart halinde yeniden tasarla."
3. Gelen planı oku: hangi dosyalar, hangi adımlar, kapsam dışına çıkan bir şey var mı?
4. En az bir noktayı düzelterek planı geri gönder.
5. Onayla, uygulat ve sonucu planla karşılaştır (plan dışına çıkıldı mı?).

**Geçti ölçütü:** Claude'a "bütün sayfaları yeni bir tasarım sistemine geçir" diyeceksin. Plan modunu kullanmazsan neyi kaçırma riskin var, plan modunda özellikle neye bakarsın?

**Benzetme:** Müteahhide önce projeyi çizdirirsin, onaylarsın, sonra temeli kazdırırsın.

**Sık hata:** Planı okumadan onaylamak. Plan küçük bir bölüm için istenip bütün sayfaya yayılabilir; bunu planda yakalamak, commit'te yakalamaktan ucuzdur.

## 2.3 Görsel, dosya, link vermek

**Kavram:** Claude'a metin dışında ekran görüntüsü, dosya ya da bağlantı da verebilirsin. "Şuna benzesin" demek için bir görsel, uzun tarif yazmaktan çoğu zaman daha iyi sonuç verir. Claude görseli birebir kopyalamaz, kendi projene uyarlar; bunu istekte açıkça söylemek iyi olur.

**Alıştırma:**
1. Beğendiğin bir sitenin bir bölümünün (ör. bir animasyon ya da kart düzeni) ekran görüntüsünü al.
2. Görseli oturuma ekle ve iste: "Bu düzeni bizim sitenin renk ve fontlarına uyarlayarak hizmetler bölümüne uygula."
3. Sonucu tarayıcıda aç ve görselle karşılaştır.
4. Bir de projedeki bir dosyayı (ör. bir metin belgesi) gösterip ondan içerik çıkarmasını iste.

**Geçti ölçütü:** Bir müşteri sana elle çizilmiş bir ekran taslağının fotoğrafını gönderdi. Bunu Claude'a verirken isteğine hangi kısıtları eklersin ki birebir kopya ya da alakasız bir sonuç çıkmasın?

**Benzetme:** Ustaya "şuna benzesin" diye fotoğraf göstermek, yarım saat tarif etmekten iyidir.

## 2.4 Doğrulama: kanıt istemek

**Kavram:** "Yaptım" bir kanıt değildir. Komut çıktısı, ekran görüntüsü, log satırı, test sonucu gibi kanıtlar iste; mümkünse sen de kendi gözünle bak. Claude da yanılabilir, sen de yanılabilirsin; en güvenilir sonuç ikinizin de baktığı sonuçtur.

**Alıştırma:**
1. Sitede küçük bir değişiklik iste (ör. telefon ekranında bir bölümün görünmesi).
2. "Bitti" cevabı gelince kanıt iste: "Telefon genişliğinde ekran görüntüsü ve değişen satırlar."
3. Sayfayı kendin de telefonda ya da tarayıcının mobil görünümünde aç.
4. Kanıtla kendi gözlemin örtüşüyor mu, not et.

**Geçti ölçütü:** Claude "veritabanı yedekleme betiği hazır ve çalışıyor" diyor. Buna inanmadan önce hangi kanıtı istersin ve kendin neye bakarsın?

**Benzetme:** Teslim tutanağını imzalamadan önce malı kendi gözünle sayarsın.

**Sık hata:** Ekranda "oldu" yazısını kanıt saymak. Kanıt, işin sonucunun kendisidir (dosya, çıktı, görüntü).

## 2.5 Hata ve geri alma (restore, revert)

**Kavram:** Commit edilmemiş bir değişikliği `git restore` iz bırakmadan siler. Commit edilmiş bir değişikliği ise `git revert` yeni bir commit ile geri alır; geçmiş silinmez, üstüne "geri alındı" kaydı eklenir. Geçmişi yeniden yazmak (commit'leri silmek, değiştirmek) yalnız henüz kimseyle paylaşılmamış yerel geçmişte güvenlidir.

**Alıştırma:**
1. Claude'dan bir başlığın rengini kırmızı yapmasını iste; commit etme.
2. `git status` ile değişikliği gör, `git restore <dosya>` ile geri al; `git log`'da iz olmadığını gör.
3. Başka küçük bir değişiklik yaptır ve bu sefer commit et.
4. `git revert <commit>` ile geri al; `git log`'da hem asıl commit'in hem de geri alma commit'inin durduğunu gör.

**Geçti ölçütü:** Bir commit'i GitHub'a göndermişsin ve iki arkadaşın onu çekmiş. Sonra içinde hata olduğunu fark ettin. restore mu, revert mi, geçmişi yeniden yazmak mı? Neden?

**Benzetme:** Kaydedilmemiş fişi silmek iz bırakmaz; kesilmiş faturayı ise silmezsin, iade faturası kesersin.
