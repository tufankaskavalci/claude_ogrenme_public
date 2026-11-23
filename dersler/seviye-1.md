# Seviye 1 · Temel: Claude Code'u tanı

Amaç: Claude Code'un bir klasörde nasıl çalıştığını, ne kadar serbest bırakılacağını ve neyi hatırlayıp neyi unuttuğunu kendi gözünle görmek.

Bu seviyede kullanacağın proje: küçük bir statik web sitesi klasörü (birkaç HTML/CSS dosyası yeter). Henüz git ya da GitHub gerekmiyor.

## 1.1 Oturum, çalışma klasörü, araçlar

**Kavram:** Claude Code her zaman bir çalışma klasöründe açılır ve o klasörde araçlarla çalışır. Read dosya okur, Edit dosya değiştirir, Grep metin arar, Bash komut çalıştırır. Claude ne yaptığını bu araç çağrılarıyla gösterir; ekranda hangi aracın hangi girdiyle çağrıldığını izleyebilirsin. Oturum = o klasörde başlayan bir konuşma.

**Alıştırma:**
1. Sitenin klasöründe yeni bir Claude Code oturumu aç.
2. "Bu klasörde ne var? Kısaca anlat." de.
3. Cevap gelirken hangi araçların (Read, Grep, Bash, Glob) çağrıldığını not et.
4. "index.html'de kaç başlık (h1, h2) var?" diye sor; bu sefer hangi aracı seçtiğine bak.
5. Klasör dışındaki bir dosyayı sor ve Claude'un ne yaptığını gözle.

**Geçti ölçütü:** Bir arkadaşın "Claude benim bilgisayarımdaki her dosyayı görüyor mu?" diye soruyor. Çalışma klasörü ve araçlar üzerinden ne cevap verirsin?

**Benzetme:** Yeni işe başlayan bir çalışana bir ofis (klasör) ve bir alet çantası (araçlar) verirsin; o ofisin dışına kendiliğinden çıkmaz.

## 1.2 İzin modları

**Kavram:** İzin modu, Claude'un ne kadar sormadan çalışacağını belirler: her işi sorarak, dosya düzenlemelerini kabul ederek, önce yalnız plan yaparak ya da otomatik. Risk arttıkça (müşteri projesi, canlı sistem) daha çok sorduran mod seçilir; kendi deneme klasöründe daha serbest bir mod uygundur. Mod varsayılanı belirler; ileride (4.1) yazacağın izin kuralları bunun üstüne çıkar.

**Alıştırma:**
1. Sitenin bir kopyasını ayrı bir deneme klasörüne al.
2. "Sor" modunda "index.html'deki başlığı değiştir" iste; gelen izin sorusunu gör, onayla.
3. Değişikliği geri al (dosyayı eski haline getir).
4. Aynı işi "düzenlemeleri kabul et" ya da otomatik modda iste; sorulmadan yapıldığını gör.
5. İki deneyimi bir cümleyle karşılaştır.

**Geçti ölçütü:** Yarın bir müşterinin canlı sunucusuna bağlı bir klasörde çalışacaksın, öğleden sonra da kendi oyuncak projende. Her biri için hangi modu seçersin ve neden?

**Benzetme:** Stajyere ilk hafta her işi sorarak yaptırırsın, güvendiğin kıdemliye "sen hallet" dersin.

**Sık hata:** Otomatik modu "Claude zaten dikkatli" diye her yerde açık bırakmak. Mod, hatanın bedeline göre seçilir.

## 1.3 Bağlam (context)

**Kavram:** Bağlam, oturumun geçici hafızasıdır: o konuşmada okunan dosyalar, verilen cevaplar, senin söylediklerin. Oturum kapanınca gider; yeni oturum önceki konuşmayı bilmez. Kalıcı olması gereken bilgi bir dosyaya, git geçmişine ya da CLAUDE.md'ye (1.4) yazılır.

**Alıştırma:**
1. Bir oturumda Claude'a sitenle ilgili bir karar söyle: "Ana renk lacivert olacak."
2. Aynı oturumda "ana renk neydi?" diye sor; hatırladığını gör.
3. Oturumu kapat, aynı klasörde yeni bir oturum aç.
4. Aynı soruyu sor; bilmediğini (ya da dosyalardan tahmin etmeye çalıştığını) gör.
5. Kararı bir dosyaya yazdır ve yeni bir oturumda yeniden sor.

**Geçti ölçütü:** Üç gün sürecek bir iş üzerinde her gün yeni bir oturumla çalışacaksın. Birinci gün alınan kararların üçüncü gün de geçerli olması için ne yaparsın?

**Benzetme:** Toplantıda konuşulanlar akılda kalır ama yazılmazsa ertesi gün unutulur; kalıcı olan tutanaktır.

## 1.4 CLAUDE.md: projenin kalıcı talimatı

**Kavram:** CLAUDE.md, proje klasöründe duran ve her oturum açılırken otomatik okunan talimat dosyasıdır. İçine projenin amacı, kuralları, dokunulmaması gereken yerler, dil ve üslup gibi her oturumda geçerli bilgiler yazılır. Bir kez yazarsın, her yeni oturum o bilgiyle başlar. Kişisel, her projede geçerli kurallar için bir de global CLAUDE.md vardır (4.2).

**Alıştırma:**
1. Sitenin klasöründe `/init` çalıştır ya da Claude'dan bir CLAUDE.md taslağı iste.
2. Taslağı oku; yanlış ya da gereksiz satırları düzelt.
3. Kendi kurallarından ikisini ekle (örnek: "Metinler Türkçe ve 'siz' hitabıyla", "Fiyat bilgisi uydurma").
4. Yeni bir oturum aç ve bu kurallardan birini test eden bir istek ver.
5. Kuralın uygulandığını cevapta gör.

**Geçti ölçütü:** Projene ikinci bir yazılımcı katılacak ve kendi Claude oturumunu açacak. Onun Claude'unun da senin kurallarına uyması için ne yaparsın, ve hangi bilgiyi CLAUDE.md'ye koymazsın?

**Benzetme:** İşe yeni giren herkesin ilk gün okuduğu şirket el kitabı.
