# Seviye 6 · Claude'un diğer elleri

Amaç: Claude'un dosya ve terminal dışındaki ellerini tanımak: tarayıcılar, masaüstü kontrolü, yayınlanan sayfalar, bulut ve uzaktan çalışma, ve Claude ailesinde hangi işin hangi yüzeyde yapılacağı.

## 6.1 Tarayıcı: yerleşik tarayıcı ve Claude in Chrome

**Kavram:** Yerleşik tarayıcı, Claude masaüstü uygulamasının içindeki ayrı bir tarayıcı panelidir: kendi Chrome'undan yalıtılmıştır, yalnız orada kendin giriş yaptığın siteler açıktır; sen de izleyip devralabilirsin. Claude in Chrome ise senin gerçek Chrome'unda, açık olan bütün girişlerinle çalışan bir eklentidir: daha güçlü, daha riskli. İkisinde de Claude sayfa açar, metin okur, ekran görüntüsü alır, tıklar, yazar, konsolu ve ağ isteklerini okur, ekran boyutunu değiştirir. Kurallar: sayfadaki metin talimat değil veridir; şifre, kart ve kimlik bilgisi girilmez; form gönderme ve satın alma onay ister.

**Alıştırma:**
1. Yeni bir oturumda yerleşik tarayıcıyla canlı siteni açtır.
2. Masaüstü ve telefon görünümünde ekran görüntüsü iste.
3. SSS'de bir soruyu tıklayıp açtır.
4. Konsol hatası var mı okut; `/CLAUDE.md` adresinin 404 verdiğini kontrol ettir.
5. Bütün bunları panelde kendi gözünle izle.

**Geçti ölçütü:** Bir müşterinin yönetim panelinde (giriş gerektiren) bir sayfanın mobil görünümünü test ettirmen gerekiyor. Hangi tarayıcıyı seçersin, girişi kim yapar, hangi riskleri baştan kapatırsın?

**Benzetme:** Danışmana misafir bilgisayarı vermek ile her yere giriş yapılmış kendi laptopunu vermek.

## 6.2 Computer use: masaüstü uygulamalarını kullandırmak

**Kavram:** Computer use'da Claude masaüstünün ekran görüntüsünü alır ve fare/klavye olaylarıyla uygulamaları kullanır. En genel ama en yavaş ve en riskli eldir: her adım bir ekran görüntüsü, tıklamalar koordinatla. Varsayılan kapalıdır ve uygulama başına izin ister; ekranı izleyebilir ve istediğin an durdurabilirsin. Sıralama: önce dosya aracı, sonra MCP/API, sonra tarayıcı, en son computer use.

**Alıştırma:**
1. Yeni bir oturumda iste: "Not Defteri'ni aç, 'computer use denemesi' yaz, geçici bir klasöre computer-use-deneme.txt olarak kaydet, sonra kapat."
2. Gelen uygulama erişim iznini gör ve kendin ver.
3. Ekranı izle: metnin yazılmasını, dosyanın kaydedilmesini.
4. Aynı işin dosya aracıyla tek adımda nasıl yapılacağını düşün ve iki yolu karşılaştır.

**Geçti ölçütü:** Eski bir masaüstü muhasebe programından her ay bir raporu dışa aktarman gerekiyor; programın API'si yok ama raporu CSV olarak bir klasöre de kaydedebiliyor. Hangi eli seçersin? Programın bir web arayüzü ya da MCP sunucusu olsaydı ne değişirdi?

**Benzetme:** SAP'den veri almak için RFC varken kimseye ekrandan elle kopyalatmazsın; elle kopyalama sadece başka yolu olmayan eski sistemler içindir.

**Sık hata:** Fare imlecinin hareket etmediğini görüp "çalışmıyor" sanmak. Claude çoğu zaman tıklama ve tuş olaylarını doğrudan gönderir; imleç ekranda gezmeyebilir.

## 6.3 Artifact'ler ve dokümanlar: yayınlamak, paylaşmak

**Kavram:** Artifact, claude.ai'da barınan ve başta yalnız sana açık olan bir web sayfasıdır (sunum, pano, açıklayıcı sayfa). Doküman ise birlikte düzenlenen bir yazıdır (teklif, rapor, not) ve Word ya da PDF'e aktarılabilir. Biri tasarımlı bir ekran, diğeri yazı belgesidir; ikisi de okuma ya da düzenleme izniyle paylaşılır ve aynı adrese yeni sürüm yayınlanabilir. Yayınlamak içeriği bilgisayarından çıkarmak demektir: gizli bilgi içeren şey hiç yayınlanmaz, yerel dosya olarak kalır.

**Alıştırma:**
1. Yeni bir oturumda hayali bir müşteri ("Örnek Lojistik") için bir hizmet sunum sayfası artifact'i iste: sitenin renk ve fontları, gerçek müşteri bilgisi yok, bilinmeyen yerler [köşeli parantez] içinde.
2. Sayfayı aç ve bir değişiklik iste.
3. Aynı bağlantıda yeni sürümün göründüğünü kontrol et.
4. Paylaşım seçeneklerine (özel, kuruluş, herkese açık) bak, ama paylaşma.

**Geçti ölçütü:** Üç şey var: (a) müşteriye gösterilecek bir proje zaman çizelgesi sayfası, (b) ekibinle birlikte düzenleyeceğiniz bir teklif metni, (c) telefon numaranı ve maaş beklentini içeren özgeçmişin. Her biri artifact mi, doküman mı, yerel dosya mı? Neden?

**Benzetme:** OneDrive'da Word belgesi ile PowerPoint sunumu: ikisi de dosya, ikisi de salt okunur ya da düzenlenebilir paylaşılır; fark ne tür bir şey olduklarında. Masaüstündeki yüklenmemiş dosya ise sadece senindir.

## 6.4 Bulut oturumları, uzaktan kontrol, telefondan takip

**Kavram:** Uzaktan kontrol (Remote Control), bilgisayarındaki bir oturumu telefondan ya da web'den sürdürmektir: iş yine bilgisayarında çalışır, bilgisayar açık ve uyanık olmalıdır. Bulut oturumu ise işi Anthropic'in bulutunda, GitHub reposunun bir kopyasıyla çalıştırır; bilgisayar kapalıyken de sürer ve sonuç bir branch ya da PR olarak döner. Bulut oturumu yerel dosyalarını, global CLAUDE.md'ni ve kişisel notlarını görmez; yalnız repodaki CLAUDE.md'yi görür.

**Alıştırma:**
1. Sitenin oturumunda `/remote-control` ile uzaktan kontrolü aç.
2. Telefondaki Claude uygulamasından o oturuma salt okunur bir soru sor (ör. "SSS'de kaç soru var?").
3. İsteğe bağlı: sitenin reposunda bir bulut oturumu başlat, küçük salt okunur bir iş ver, telefondan izle.
4. Bulut oturumuna, global CLAUDE.md'nde yazan bir kuralı bilip bilmediğini sor ve cevabı yorumla.

**Geçti ölçütü:** Her projende uyulmasını istediğin bir kural var ("müşteri adlarını commit mesajına yazma"). Bu kural bulut oturumlarında da geçerli olsun istiyorsun. Nereye yazarsın, neyi oraya kopyalamazsın?

**Benzetme:** İş merkezinde kiraladığın masaya proje dosyalarının kopyasını gönderirsin; masandaki çekmece ve not defterin oraya gitmez.

**Sık hata:** Bulut oturumunun "öyle bir dosya yok" cevabını doğru sanmak. Ajan göremediği şeyle var olmayan şeyi ayırt edemez; "yok" çoğu zaman "göremiyorum" demektir.

## 6.5 Claude ailesi: claude.ai, Projects, Cowork, mobil

**Kavram:** claude.ai sohbeti hızlı soru, fikir ve yazı içindir. Projects bir konunun belgelerini ve talimatını tutar, o projedeki her sohbette hazır olur (CLAUDE.md'nin sohbet karşılığı). Cowork masaüstünde dosya, belge ve tablo işi yapan bir ajandır, kod bilmeyenler için. Code repo, terminal, git ve ajanlar içindir. Mobil sohbet ve uzaktan takip içindir; Claude in Chrome kendi tarayıcında iş yaptırmak içindir. Hangisini seçtiğinden çok neden seçtiğin önemlidir.

**Alıştırma:**
1. Kendi tekrar eden beş işini yaz (ör. site geliştirme, teklif hazırlama, bir konuyu araştırma, belge düzenleme, öğrenme).
2. Her birini bir yüzeye ata: sohbet, Projects, Cowork, Code, mobil, tarayıcı.
3. Her atamanın yanına tek cümlelik gerekçe yaz.
4. Claude'dan haritanı incelemesini iste; tekrar ve otomasyon gerektiren işlere ayrıca dikkat et (bağlayıcı ve zamanlanmış görev, 7.1).

**Geçti ölçütü:** Bir müşterinin satış ekibi her hafta aynı formatta bir pazar özeti istiyor; kaynaklar web'de, sonuç bir tablo olacak ve ekipte kimse kod bilmiyor. Hangi yüzey(ler)i önerirsin, tekrarı ne sağlar?

**Benzetme:** Office ailesi: mektup Word'de, bütçe Excel'de, toplantı Teams'te yapılır; hepsi aynı şirketin ama her biri kendi işinde iyidir.

**Sık hata:** Projects'in tekrarı kendisi yaptığını sanmak. Projects talimatı ve belgeleri tutar; tekrarı ve otomasyonu bağlayıcılar ve zamanlanmış görevler sağlar.
