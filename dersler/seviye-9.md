# Seviye 9 · Danışman: müşteriye satabilmek

Amaç: Öğrendiklerini bir şirketin gerçek ihtiyacına çevirmek: fırsatı bulmak, riski ve fiyatı konuşmak, çalışan bir demoyla teslim etmek.

## 9.1 Bir şirkette yapay zekâ fırsatı bulmak

**Kavram:** Müşteri "yapay zekâ ile ne yapabiliriz?" diye sorduğunda araç önerme; önce insanların her hafta tekrar tekrar yaptığı işleri listele, sonra her birini dört süzgeçten geçir:

| Süzgeç | Soru | Seviye 8 bağlantısı |
|---|---|---|
| Hacim | Haftada kaç kez, kaç kişi-saat? | Maliyet hesabı (8.1) |
| Girdi türü | Metin, belge, e-posta, serbest form mu; yoksa kesin hesap ve kural mı? | Kod mu, model mi (8.6) |
| Hata maliyeti | Yanlış çıkarsa ne olur? Geri alınabilir mi, insan onayı konabilir mi? | Onay kapısı ve insan (8.5, 8.7) |
| Ölçülebilirlik | Önce/sonra neyle ölçülecek: dakika, hata oranı, bekleme süresi? | Eval (8.7) |

Dört süzgeçten geçen iş iyi bir fırsattır. Birinde takılırsa çözüm başka bir şeydir: bir iş akışı kuralı, bir rapor, bir süreç değişikliği. **"Burada yapay zekâ gerekmiyor" demek de bir sonuçtur** ve çoğu zaman müşterinin güvenini kazandıran sonuç odur. En kolay satılan fırsat genelde yeni bir ürün değil, müşterinin zaten kullandığı sistemin üstüne eklenen bir yapay zekâ katmanıdır.

**Örnek analiz (bir şirketin İK süreçleri):**

| İş | Süzgeç sonucu | Karar |
|---|---|---|
| Bekleyen onayları hatırlatma, ilerletme | Kural tabanlı ("3 gündür bekleyene hatırlat") | Yapay zekâ değil: iş akışı kuralı |
| Onay / red kararı | Hata maliyeti yüksek | Kararı insan verir; model en fazla uyarır |
| Organizasyon şeması | Veri tablodan, çıktı çizim | Klasik raporlama |
| İK'ya doğal dilde anlık rapor ("geçen çeyrek hangi birimde en çok terfi önerisi reddedildi?") | Sık istenir, soru serbest metin, yalnız okur, bekleme süresi ölçülür | Güçlü fırsat |
| Performans değerlendirme yorumlarının özeti ve tema analizi | Dönem sonunda yüzlerce serbest metin; çıktıyı insan okur | Güçlü fırsat (kişisel veri: 9.2) |

**Alıştırma:**
1. Geçmişte çalıştığın ya da tanıdığın bir şirketi seç. Şirket ve kişi adı yazma; sektör, büyüklük ve roller yeterli.
2. O şirkette her hafta tekrar eden 5–8 işi listele.
3. Her işi dört süzgeçten geçir ve tabloya yaz: fırsat, yapay zekâ değil, ya da önce başka bir sorun çözülmeli.
4. En iyi fırsatı seç ve dört süzgeçten nasıl geçtiğini birer cümleyle yaz.

**Geçti ölçütü:** Bir üretim firmasında hatalı ürünün kaynağı izlenemiyor: işçiler depodan karışık hammadde çekiyor ve hangi tedarikçi partisinin hangi üretime girdiğini kaydetmiyor. Aynı firmada müşterilerden haftada onlarca serbest metin şikâyet geliyor ve kalite sorumlusu hepsini okuyup sınıflıyor. Hangisi yapay zekâ fırsatı, hangisi değil? Fırsat olanda yanlış sınıflandırma riskini nasıl yönetirsin, neyi ölçersin?

**Benzetme:** ERP projesinde modül satmadan önce süreç analizi yaparsın. Fişsiz harcamayı tahminle deftere işlemezsin; fişsiz ödeme yapılamayan bir kasa kurarsın.

**Sık hata:** Eksik kaydedilen veriyi yapay zekâyla "tahmin ettirmeye" çalışmak. Kaynağında kaydedilmeyen veriyi hiçbir model güvenilir şekilde üretemez; önce veri toplama düzeltilir (barkod, okutma, okutmadan işe başlanamayan bir kural), yapay zekâ projesi sonra gelir.

## 9.2 Fiyat, risk, KVKK, veri gizliliği

**Kavram:** Bir yapay zekâ teklifinin üç ayağı vardır:

| Ayak | Özü |
|---|---|
| Fiyat | Token çoğu zaman en küçük kalemdir (ör. günde 200 soru, orta sınıf bir modelle ayda onlarca dolar). Fiyat emek ve müşteriye sağlanan değer üzerinden kurulur; token "şu tavana kadar dahil, aşım maliyetine" diye şeffaf yazılır. |
| Risk | Modele değil mimariye güven: salt okunur veritabanı kullanıcısı, yetkinin veritabanı görünümünde (view) çözülmesi, raporun altında çalışan sorgunun görünmesi, gerçek sorulardan oluşan bir eval seti, serbest metin alanlarından gelebilecek dolaylı injection'a karşı önlem (8.7). |
| Veri | Çalışan ve müşteri verisi kişisel veridir. Müşteri veri sorumlusu, sen veri işleyensin. Veriyi bir bulut modeline göndermek çoğu zaman yurt dışına aktarımdır; bunun hukuka uygunluğunu müşterinin hukukçusu teyit eder, sen değil. |

**Örnek (İK'ya doğal dilde rapor asistanı, 9.1'deki fırsat):**

| Bölüm | İçerik |
|---|---|
| Kapsam: yapar | Soruyu rapora çevirir; yalnız okur; herkes kendi biriminin verisini görür; raporun altında sorgu görünür |
| Kapsam: yapmaz | Veri değiştirmez; karar vermez; resmî rapor ya da bordro üretmez; kişi hakkında yorum yapmaz |
| Fiyat | Kurulum = adam-gün × günlük ücret. Aylık = birkaç adam-gün bakım + token (tavanlı) |
| Risk 1: yanlış rapor | Sorgu görünür, eval seti, ilk aylarda kritik raporları bir uzman teyit eder |
| Risk 2: veri sızıntısı | Yetki modelde değil veritabanında; modele kimlik bilgisi gitmez |
| Ölçüm | Bir raporun hazırlanma süresi (önce/sonra), kullanım sayısı, eval doğruluğu |

"Yapmaz" listesi en az "yapar" listesi kadar önemlidir. "Önce" ölçümü işe başlamadan alınır; yoksa üç ay sonra kıyaslayacak bir şey kalmaz.

**Alıştırma:** 9.1'de seçtiğin fırsat için dört başlıklı bir teklif iskeleti yaz:
1. Kapsam: ne yapacak, ne yapmayacak?
2. Fiyat: kurulum ve aylık hizmet için kendi piyasana göre birer rakam; token'ı teklifte nasıl göstereceksin?
3. Müşteri için en önemli iki risk ve önlemleri.
4. Üç ay sonra "işe yaradı" demek için ne ölçülecek?

**Geçti ölçütü:** Müşterinin hukukçusu "çalışan verisi yurt dışına çıkamaz" dedi. Projeyi iptal etmeden mimariyi nasıl değiştirirsin? (Beklenen yön: kimlik bilgisi içeride kalır, modele takma ID gider ve gösterim sırasında içeride ada çevrilir; daha iyisi modele yalnız tablo şeması gider, sorgu içeride çalışır, modele en fazla toplu sonuç döner.)

**Benzetme:** Dış danışmana canlı veritabanının yedeğini vermezsin; tablo şemasını verirsin, sorguyu o yazar, sen içeride çalıştırırsın. Token ise eski tekliflerdeki "barındırma gideri" satırıdır.

**Sık hata:** Takma adlandırılmış veriyi "anonim" sanmak. Eşleştirme tablosu sende olduğu sürece veri hâlâ kişisel veridir; risk küçülür, yükümlülük kalkmaz. Bir diğeri: teklifi token maliyeti üzerinden fiyatlamak; müşteri token değil, kazandığı zamanı satın alır.

## 9.3 Demo ve teslim

Seviye 8'de kurduğun asistanı müşteriye sunar gibi göstermek ve teslim etmek. Alıştırma: bir müşteriye yapılan demo provası.

*Yakında.*
