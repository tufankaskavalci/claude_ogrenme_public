# Seviye 4 · Claude'u kendine göre ayarla

Amaç: Claude Code'u kendi çalışma biçimine göre ayarlamak: izinler, hafıza, skill'ler, eklentiler, hook'lar, durum satırı ve uygulama içi modlar.

Örnek dosyalar: `../seviye-1-7/` altındaki ders klasörleri. Kopyalamadan önce her dosyayı oku; özellikle hook ve mod dosyaları senin bilgisayarında kod çalıştırır.

## 4.1 Ayarlar ve izinler (settings.json, izin listeleri)

**Kavram:** Ayarlar üç dosyada durabilir: kullanıcı ayarı `~/.claude/settings.json` (her projede), proje ayarı `.claude/settings.json` (git ile paylaşılır) ve kişisel proje ayarı `.claude/settings.local.json` (yalnız bu projede, yalnız sende, commit edilmez). İzin kuralları `allow`, `ask` ve `deny` listeleridir. Tek değerli bir ayarda en özel dosya kazanır; izin listelerinde ise bütün dosyalar birleşir ve herhangi bir yerdeki `deny` her zaman kazanır. Böylece klonladığın bir repo, senin globalde yasakladığın bir şeye kendine izin veremez.

**Alıştırma:**
1. Örneği oku: [../seviye-1-7/4.1-izinler/settings.json](../seviye-1-7/4.1-izinler/settings.json) (okuma amaçlı git komutlarına izin, `rm` yasak).
2. Sitende bir PR ile benzerini `.claude/settings.json` olarak ekletip birleştir.
3. Yeni bir oturumda `git status` iste; izin sorulmadan çalıştığını gör.
4. Zararsız bir test yap: "rm yok.txt çalıştır" de; komutun engellendiğini gör.
5. Engelleyenin Claude'un tercihi değil, harness'ın kuralı olduğunu not et.

**Geçti ölçütü:** Global ayarında `Bash(curl *)` yasak, klonladığın bir açık kaynak reponun `.claude/settings.json` dosyası ise `Bash(curl *)` için allow veriyor. O repoda çalışırken curl çalışır mı? Bir de: o repoda varsayılan modeli kendin için değiştirmek istiyorsun ama ekibi etkilemek istemiyorsun; hangi dosyaya yazarsın?

**Benzetme:** Genel müdürlük "9'da başla" der, fabrika "8'de" der: tek değerde en yakın kural geçerli. Ama "kasaya kimse girmez" yasağını fabrika müdürü delemez.

**Sık hata:** `deny Bash(rm *)` kuralını tam bir duvar sanmak. Başka silme yolları (`del`, PowerShell `Remove-Item`, `git rm`, silen bir betik) bu kalıba uymaz; kural emniyet kemeridir, duvar değil. `settings.local.json` dosyasını da makine geneli sanmak yaygındır: yalnız o proje içindir.

## 4.2 Hafıza düzeni: global CLAUDE.md, notlar, proje dosyası

**Kavram:** Her oturumda otomatik yüklenen her satır, her turda token harcar ve dikkati dağıtır. Bu yüzden hafızayı ikiye ayır: **her oturum yüklenen** (global `~/.claude/CLAUDE.md`, projenin CLAUDE.md'si ve bunlara `@dosya` ile bağlanan dosyalar) ve **gerektiğinde okunan** (yalnız yolu ve "ne zaman okunacağı" yazılan ayrı dosyalar). Ölçü: her projede lazım ve kısaysa globale; tek projeye aitse o projenin CLAUDE.md'sine; uzun ve ara sıra lazımsa ayrı bir dosyaya, yeri yazılarak.

**Alıştırma:**
1. Global CLAUDE.md'ni ve projenin CLAUDE.md'sini aç; `@` ile bağlanan dosyaları da listele.
2. Claude'dan her oturumda yüklenen toplam kelime sayısını ölçmesini iste.
3. Her bölüm için karar ver: "her oturum" mu, "gerektiğinde" mi?
4. "Gerektiğinde" olanları ayrı bir dosyaya taşı; CLAUDE.md'de yerine tek satır bırak: "X konusu açılınca `<yol>` dosyasını oku."
5. Önce yedek al, değişikliği yap, sonra yeni bir oturumda taşınan bilgiyi gerektiren bir soru sor ve hâlâ doğru cevaplandığını gör.

**Geçti ölçütü:** Bir müşteri projesinin 2.000 kelimelik teknik şartnamesi var; o projede her gün çalışıyorsun ama diğer projelerde hiç lazım değil. Şartnameyi nereye koyarsın, CLAUDE.md'ye ne yazarsın?

**Benzetme:** Sık kullanılan bilgi önbellekte (cache), ara sıra lazım olan veritabanında durur; her şeyi önbelleğe koyarsan bellek dolar.

**Sık hata:** `@` ile bağlanan dosyanın "gerektiğinde" yüklendiğini sanmak. `@` ile bağlanan dosya her oturumda yüklenir; gerektiğinde okunması için yalnız yolunu yaz. Tersi riski de var: yalnız yolu yazılan dosyayı bir oturum okumayı unutabilir, satırdaki "ne zaman okunacağı" tarifi bu yüzden net olmalı.

## 4.3 Slash komutları ve kendi skill'ini yazmak

**Kavram:** Hazır slash komutları (`/init`, `/clear`, `/compact`, `/model` gibi) oturumu yönetir. Skill ise `SKILL.md` içeren bir klasördür: `~/.claude/skills/<ad>/` (global) ya da `<proje>/.claude/skills/<ad>/` (proje). Skill'in açıklaması (description) her oturumda görünür, adımları (gövdesi) yalnız çağrılınca okunur; 4.2'deki "gerektiğinde okunan" hafızanın bir örneği. `/ad` ile ya da isteğin açıklamaya uymasıyla çağrılır; `$ARGUMENTS` parametre taşır.

**Alıştırma:**
1. Örneği oku: [../seviye-1-7/4.3-skill/bolum-ekle/SKILL.md](../seviye-1-7/4.3-skill/bolum-ekle/SKILL.md) (siteye yeni bölüm ekleme yordamı).
2. Kendi sitende tekrar eden bir iş seç ve adımlarını sen yaz (ör. branch aç, bölümü ekle, önizlemede kontrol et, PR aç, birleştirme).
3. Claude'a bunu PR ile `.claude/skills/<ad>/SKILL.md` olarak ekletip birleştir.
4. Yeni bir oturumda `/<ad> <konu>` ile çalıştır.
5. Bir de slash kullanmadan, açıklamaya uyan doğal bir cümleyle iste; kendiliğinden tetiklenip tetiklenmediğini gör.

**Geçti ölçütü:** "Bütün metinler 'siz' hitabıyla yazılır" ve "yeni blog yazısı ekleme adımları": bunlardan hangisi CLAUDE.md'ye, hangisi skill'e gider? Neden?

**Benzetme:** CLAUDE.md şirket yönetmeliği, skill ise adı konmuş bir stored procedure: EXEC dediğinde çalışır.

## 4.4 Eklentiler (plugin) ve marketplace

**Kavram:** Eklenti; skill, alt ajan, hook ve MCP sunucusu gibi parçaları bir arada getiren pakettir. Marketplace bu paketlerin kataloğudur (genelde bir git reposu). Kurmak kolaydır, ama içindeki hook'lar her oturumda kod çalıştırabilir, açıklamaları ve talimatları bağlamına eklenir ve Claude'un davranışını değiştirebilir. Bu yüzden kurmadan önce incelenir; kullanılmayan eklenti kapatılır ya da kaldırılır.

**Alıştırma:**
1. Kurulu eklentileri listele (`claude plugin list` ya da `/plugin`).
2. Birini seç ve şu kontrol listesiyle incele: ne ekliyor (skill, ajan, hook, MCP), her oturumda kod çalıştırıyor mu, bağlama ne kadar metin ekliyor, gerçekten kullanıyor musun, başka bir şeyle çakışıyor mu, lisansı ne.
3. Hook'u varsa betiğini aç ve ne yaptığını Claude'a açıklat.
4. Tut / kapat / kaldır kararı ver ve gerekçesini bir satırla yaz.

**Geçti ölçütü:** Çok yıldızlı bir eklenti "her oturumda otomatik çalışır, bütün geçmiş oturum kayıtlarını okuyup istatistik çıkarır" diyor. Kurmadan önce hangi üç soruyu sorarsın?

**Benzetme:** NuGet paketi kurmak gibi: kolaydır ama içindeki kod senin projende çalışır, önce ne yaptığına bakarsın.

## 4.5 Hook'lar: otomatik davranış

**Kavram:** Hook = olay + filtre + komut. Örnek: `PostToolUse` (bir araç kullanıldıktan sonra) olayında, `matcher: "Edit|Write"` filtresine uyan her çağrıdan sonra bir komut çalıştırmak. Hook `settings.json` içinde durur ve harness tarafından zorla çalıştırılır; CLAUDE.md ise bir tavsiyedir, Claude unutabilir. Hook çıktısı her zaman ekrana gelmez; sonucu, komutun yazdırdığı yerde (ör. bir log dosyasında) ararsın.

**Alıştırma:**
1. Örneği oku: [../seviye-1-7/4.5-hook/settings.json](../seviye-1-7/4.5-hook/settings.json) (her Edit/Write sonrası bir log dosyasına saatli satır).
2. Ayrı bir deneme klasöründe `.claude/settings.json` olarak benzerini kur; log dosyasının yolunu kendine göre değiştir.
3. Oturumu o klasörde aç (başka bir klasörde açılan oturum bu proje ayarını almaz).
4. Claude'dan bir dosya oluşturup sonra değiştirmesini iste.
5. Log dosyasını aç; satırların saatlerinin işlem saatleriyle eşleştiğini gör.

**Geçti ölçütü:** Her commit'ten önce bir biçim denetimi (formatter) çalışsın istiyorsun. Bunu CLAUDE.md'ye "commit'ten önce formatter çalıştır" diye yazmakla hook olarak kurmak arasında ne fark olur? Hook'un çalıştığını nasıl kanıtlarsın?

**Benzetme:** Gece çalışan zamanlanmış görev: kimse hatırlatmasa da her gece çalışır, sonucunu log dosyasında ararsın.

**Sık hata:** Hook'un çıktısının ekrana düşmesini beklemek ve görmeyince "çalışmadı" ya da görmeden "çalıştı" demek. Kanıt, hook'un yazdığı dosyadır.

## 4.6 Çıktı stilleri ve durum satırı (status line)

**Kavram:** Çıktı stili, Claude'un nasıl konuştuğunu değiştiren bir sistem talimatıdır (Default, Explanatory, Learning ya da `~/.claude/output-styles/<ad>.md` içinde kendi stilin). CLAUDE.md "ne bilmeli, ne yapmalı" sorusunu, stil "nasıl anlatmalı" sorusunu cevaplar. Durum satırı ise `settings.json` içindeki `statusLine` komutudur: Claude Code bu komuta JSON (model, klasör, maliyet gibi bilgiler) verir, komutun yazdığı satır terminaldeki `claude` ekranının altında görünür.

**Alıştırma:**
1. Bir oturumda Learning stilini seç, aynı soruyu Default stilde de sor; farkı bir cümleyle yaz.
2. Örneği oku: [../seviye-1-7/4.6-durum-satiri/statusline.js](../seviye-1-7/4.6-durum-satiri/statusline.js) ve [../seviye-1-7/4.6-durum-satiri/settings-parcasi.json](../seviye-1-7/4.6-durum-satiri/settings-parcasi.json).
3. Terminalde `claude` aç ve `/statusline` ile model + klasör + git branch gösteren bir satır kurdur (ya da örnek betiği `~/.claude/` altına koyup parçayı `~/.claude/settings.json` içine ekle).
4. Farklı bir proje klasöründe `claude` açıp satırın değiştiğini gör.

**Geçti ölçütü:** Ekibin için "kod incelemelerinde önce riskleri, sonra önerileri yaz; kısa cümleler kullan" kuralı istiyorsun. Bu CLAUDE.md'ye mi, bir çıktı stiline mi gider? Ya "bu projede veritabanı şemasına dokunma" kuralı?

**Benzetme:** Mutfak kuralları aynı kalır, değişen servis biçimidir; durum satırı ERP ekranının altındaki şirket/dönem çubuğudur.

## 4.7 Mod: Claude uygulamasının arayüzünü değiştirmek

**Kavram:** Mod, Claude masaüstü uygulamasının içine eklenen küçük bir programdır: yanda duran bir panel, istem kutusunun üstünde bir bant, bir bildirim (toast), bir slash komutu ya da araç çağrılarına bağlanan bir hook olabilir. Eklentiyle aynı paket yapısını kullanır, ama içinde arayüz kodu vardır ve onu model değil uygulama çalıştırır. Eklenti paketin adıdır; mod o paketin içindeki ekranlı parça olabilir; hook ise ekranı olmayan bir otomatik görevdir.

**Alıştırma:**
1. Örneği incele: [../seviye-1-7/4.7-mod/site-durumu/](../seviye-1-7/4.7-mod/site-durumu/) (sitenin canlı adresine istek atıp HTTP kodunu ve yanıt süresini gösteren panel; site adresi kodda değil, ayardan okunur).
2. Panelin ne göstereceğini 2.1 kurallarıyla tarif et: ne görünsün, ne zaman yenilensin, "yeşil" ne demek.
3. Claude'dan bu tarife göre bir mod yazmasını iste.
4. Uygulama modu açmak için onay isterse cevabı sen ver.
5. Paneli gör, Yenile düğmesinin çalıştığını ve değerlerin doğru olduğunu kontrol et.

**Geçti ölçütü:** Ekibin her sabah "açık PR sayısı ve son başarısız yayın" bilgisini görmek istiyor. Bunu mod mu, hook mu, düz bir skill mi olarak yaparsın? Neden?

**Benzetme:** ERP ana ekranına eklenen dashboard kutucuğu (widget): sürekli görünür, canlı veri gösterir, düğmesi vardır.

**Sık hata:** Modu paylaşmadan önce içindeki kişisel bilgileri (adres, kullanıcı adı) koddan çıkarmamak. Değişen değerler kullanıcı ayarından okunmalı.
