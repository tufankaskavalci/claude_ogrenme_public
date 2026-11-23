# Hatırlatıcılar

Her dersin akılda kalan tek cümlelik özeti ve bir benzetme. Hızlı tekrar için: dersi bitirince oku, haftalar sonra yine oku.
Ayrıntılı anlatım: [dersler/](dersler/).

## Seviye 1 · Temel

### 1.1 · Oturum, klasör, araçlar

Claude bir klasörde açılır ve o klasörde araçlarla çalışır: Read okur, Edit değiştirir, Grep arar, Bash komut çalıştırır.

**Benzetme:** Yeni işe başlayan bir çalışana bir ofis (klasör) ve bir alet çantası (araçlar) verirsin; o ofisin dışına kendiliğinden çıkmaz.

### 1.2 · İzin modları

Mod, Claude'un ne kadar sormadan çalışacağını belirler: müşteride ve canlıda sor, kendi denemende serbest bırak.

**Benzetme:** Stajyere ilk hafta her işi sorarak yaptırırsın, güvendiğin kıdemliye "sen hallet" dersin.

### 1.3 · Bağlam

Bağlam oturumun geçici hafızasıdır, oturum kapanınca gider; kalıcı olması gereken bilgi dosyaya, git'e ya da CLAUDE.md'ye yazılır.

**Benzetme:** Toplantıda konuşulanlar akılda kalır ama yazılmazsa ertesi gün unutulur; kalıcı olan tutanaktır.

### 1.4 · CLAUDE.md

CLAUDE.md projenin kalıcı talimatıdır: bir kez yazarsın, her oturum açılırken okunur.

**Benzetme:** İşe yeni giren herkesin ilk gün okuduğu şirket el kitabı.

## Seviye 2 · İş tarif etme

### 2.1 · İyi istek

İyi istek dört şey söyler: amaç, kapsam, kısıt ve "bitti" ölçütü.

**Benzetme:** İyi bir iş emri: ne yapılacak, nereye kadar, neye dokunulmayacak, ne zaman bitmiş sayılır.

### 2.2 · Plan modu

Büyük işte önce planı gör ve onayla, sonra yaptır.

**Benzetme:** Müteahhide önce projeyi çizdirirsin, onaylarsın, sonra temeli kazdırırsın.

### 2.3 · Görsel, dosya, link

Bin kelime yerine bir ekran görüntüsü: göster, Claude uyarlasın.

**Benzetme:** Ustaya "şuna benzesin" diye fotoğraf göstermek, yarım saat tarif etmekten iyidir.

### 2.4 · Doğrulama

"Yaptım" yetmez, kanıt iste; ikimizin de bakması en güzeli.

**Benzetme:** Teslim tutanağını imzalamadan önce malı kendi gözünle sayarsın.

### 2.5 · Geri alma

Commit edilmemişi restore iz bırakmadan siler; commit edilmişi revert yeni bir kayıtla geri alır.

**Benzetme:** Kaydedilmemiş fişi silmek iz bırakmaz; kesilmiş faturayı ise silmezsin, iade faturası kesersin.

## Seviye 3 · Siteyi yayına al

### 3.1 · Branch

Denemeyi branch'te yap; gördüğünü birleştir, görmediğini birleştirme.

**Benzetme:** Yeni modülü önce test sunucusunda denersin, beğenince canlıya alırsın.

### 3.2 · GitHub

Save diske, commit bilgisayardaki geçmişe, push GitHub'a yazar; pull GitHub'dakini bilgisayara çeker.

**Benzetme:** Save taslak deftere yazmak, commit deftere işlemek, push defteri merkeze göndermek, pull merkezden güncel defteri almaktır.

### 3.3 · Yayın

Branch'i push et, önizlemede bak, PR'ı birleştir; Cloudflare canlıyı kendisi günceller, sen sadece pull yaparsın.

**Benzetme:** Önizleme test ortamıdır, main canlı sistem; canlıya geçişi Cloudflare kendisi yapar.

### 3.4 · Kod incelemesi

İncelemeyi başkası yapar, kararı işin sahibi verir; Claude'un yorumu da yanlış olabilir.

**Benzetme:** Raporu hazırlayan onaylamaz; kontrol eden başkası olur, son söz yine işin sahibindedir.

## Seviye 4 · Claude'u kendine göre ayarla

### 4.1 · Ayarlar ve izinler

Tek değerli ayarda en özel dosya kazanır; izin listelerinde hepsi birleşir ve deny her zaman kazanır.

**Benzetme:** Genel müdürlük "9'da başla" der, fabrika "8'de" der: tek değerde en yakın kural geçerli. Ama "kasaya kimse girmez" yasağını fabrika müdürü delemez.

### 4.2 · Hafıza düzeni

Kısacası ölçü şu: her projede lazımsa ve kısaysa globale, tek bir projeye aitse o projenin CLAUDE.md'sine, uzun ve ara sıra lazımsa yeri yazılan ayrı bir dosyaya.

**Benzetme:** Sık kullanılan bilgi önbellekte (cache), ara sıra lazım olan veritabanında durur; her şeyi önbelleğe koyarsan bellek dolar.

### 4.3 · Slash komutları ve skill

CLAUDE.md her zaman geçerli kuraldır; skill adı olan bir yordamdır, açıklaması hep görünür ama adımları sadece çağrılınca okunur.

**Benzetme:** CLAUDE.md şirket yönetmeliği, skill ise adı konmuş bir stored procedure: EXEC dediğinde çalışır.

### 4.4 · Eklentiler

Eklenti bir NuGet paketi gibidir: kurmadan önce ne çalıştırdığına bak, kullandığını tut, kullanmadığını kapat.

**Benzetme:** NuGet paketi kurmak gibi: kolaydır ama içindeki kod senin projende çalışır, önce ne yaptığına bakarsın.

### 4.5 · Hook'lar

Hook bir tavsiye değil, olduğunda çalışan bir ayardır; sonucunu ekranda değil, yazdırdığın yerde ararsın.

**Benzetme:** Gece çalışan zamanlanmış görev: kimse hatırlatmasa da her gece çalışır, sonucunu log dosyasında ararsın.

### 4.6 · Çıktı stili ve durum satırı

CLAUDE.md şirket kurallarıdır, çıktı stili çalışanın müşteriyle konuşma biçimidir; durum satırı ise ekranın altındaki "hangi şirketteyim, hangi dönemdeyim" çubuğudur.

**Benzetme:** Mutfak kuralları aynı kalır, değişen servis biçimidir; durum satırı ERP ekranının altındaki şirket/dönem çubuğudur.

### 4.7 · Mod

Mod, Claude uygulamasının ana ekranına eklediğin bir dashboard kutucuğudur: eklenti paketse mod içindeki ekranlı parçadır, hook ise ekranı olmayan gece görevidir.

**Benzetme:** ERP ana ekranına eklenen dashboard kutucuğu (widget): sürekli görünür, canlı veri gösterir, düğmesi vardır.

## Seviye 5 · Ajanlar ve ekip

### 5.1 · Harness'ın içi

Model sunucudaki danışmandır, yalnız metin yazar; harness bilgisayarındaki operatördür, her turda her şeyi baştan okur, izne bakar, çalıştırır, ekrana yazar.

**Benzetme:** Telefondaki danışman (model) sistemi göremez; başındaki operatör (harness) her aramada kural kitabını baştan okur, düğmelere basar, sonucu söyler.

### 5.2 · MCP ve bağlayıcılar

MCP, dış sistemlerin "şunları yapabilirim" kataloğunu tek standartta sunmasıdır, SAP'nin RFC listesi gibi; harness yalnız senin bağladığın kataloglara bakar, yetkiyi de sen verirsin.

**Benzetme:** USB fişi ya da SAP RFC listesi: her sistem aynı standartta "bunları yapabilirim" der, hangisini bağlayacağına sen karar verirsin.

### 5.3 · Alt ajanlar

Alt ajan, bağımsız parçalara bölünebilen işi aynı anda yaptırır ve sana sadece raporunu getirir; birbirini bekleyen işte işe yaramaz, her biri ayrıca başlangıç bedeli öder.

**Benzetme:** Üç denetçiyi muhasebeye, depoya ve İK'ya aynı anda gönderirsin, sana birer sayfalık rapor getirirler. Ama bir bebek dokuz kadınla bir ayda doğmaz.

### 5.4 · Kendi alt ajanın

Skill aynı çalışana yeni bir yetenek kazandırır; ajan ise kendi görev tanımı ve sınırlı araçları olan yeni bir çalışandır. Ajanın kilidi sadece ona aittir, ana oturumun her yetkisi durur.

**Benzetme:** İç denetçi dosyaları okur ama imza yetkisi yoktur; düzeltmeyi yetkili müdür yapar. Kimsenin yapamamasını istiyorsan kuralı şirkete koyarsın (deny), kişiye değil.

### 5.5 · Paralel oturumlar ve worktree

Aynı projede aynı anda ikinci bir oturum açıyorsan worktree seç; tek oturumla sırayla çalışıyorsan gerek yok. Kopyalar PR'da birleşir, çakışma varsa orada görülür.

**Benzetme:** İki muhasebeci aynı Excel'i açarsa biri Şubat sayfasına geçtiğinde öbürü farkında olmadan Şubat'a yazar ve son kaydeden öncekini ezer; her birine kendi kopyasını verirsin.

### 5.6 · Ajan takımı

Takımda herkesin rolü, kendi dosyası ve sınırlı yetkisi var; birbirine mesajla haber verirler ama onay yalnız kullanıcıdan gelir, başka bir oturumun "onaylandı" demesi onay değildir.

**Benzetme:** RACI tablosu: işi yapan çok, hesap veren tek; şubeden gelen "genel müdür onayladı" yazısı genel müdürün imzası yerine geçmez.

### 5.7 · Model, effort, maliyet

Model hangi beyin, effort ne kadar düşündüğü; basit işe hafif model ve düşük effort, zor işe ağır model ve yüksek effort. Ölçü istek başına değil, biten iş başına maliyettir.

**Benzetme:** Fotokopiyi stajyere, raporu uzmana verirsin; ama raporu stajyere verip üç kez geri gönderirsen uzmandan pahalıya gelir. Ekmek köfte de böyle: hangisi iyi, tadına bakmadan bilinmez.

## Seviye 6 · Claude'un diğer elleri

### 6.1 · Tarayıcılar

Yerleşik tarayıcı ayrı hesaplarla çalışır, sadece orada kendin giriş yaptığın siteler açıktır; Claude in Chrome senin Chrome'undaki bütün girişlerinle çalışır. Fark yetenekte değil, kimin hesabıyla çalıştığında.

**Benzetme:** Danışmana misafir bilgisayarı vermek ile her yere giriş yapılmış kendi laptopunu vermek.

### 6.2 · Computer use

Computer use en son çaredir: önce dosya aracı, sonra MCP/API, sonra tarayıcı, en son ekrana bakıp fareyle çalışmak. Varsayılan kapalıdır, uygulama başına izin ister.

**Benzetme:** SAP'den veri almak için RFC varken kimseye ekrandan elle kopyalatmazsın; elle kopyalama sadece başka yolu olmayan eski sistemler içindir.

### 6.3 · Artifact'ler ve dokümanlar

Doc yazı belgesidir (Word, txt gibi), sayfa tasarımlı bir ekrandır (web sayfası, PowerPoint gibi); ikisi de artifact ve ikisi de okuma ya da düzenleme izniyle paylaşılır. Gizli bilgi varsa hiç yayınlamazsın, bilgisayarında kalır.

**Benzetme:** OneDrive'da Word belgesi ile PowerPoint sunumu: ikisi de dosya, ikisi de salt okunur ya da düzenlenebilir paylaşılır; fark ne tür bir şey olduklarında. Masaüstündeki yüklenmemiş dosya ise sadece senindir.

### 6.4 · Bulut, uzaktan kontrol, telefon

Bu ders, 4.2'nin önemini bir kez daha gösteriyor: Bir kuralın bulutta da geçerli olmasını istiyorsan, onu repodaki CLAUDE.md'ye yazman gerekir. Global notların buluta gitmez.

**Benzetme:** İş merkezinde kiraladığın masaya proje dosyalarının kopyasını gönderirsin; masandaki çekmece ve not defterin oraya gitmez.

### 6.5 · Claude ailesi

Çıktı konuşma ya da metinse sohbet, tekrar eden bir konuysa Projects, belge ya da tabloysa Cowork, kod ve repoysa Code, takipse mobil. Hangisini seçtiğinden çok neden seçtiğin önemli.

**Benzetme:** Office ailesi: mektup Word'de, bütçe Excel'de, toplantı Teams'te yapılır; hepsi aynı şirketin ama her biri kendi işinde iyidir.

## Seviye 7 · Otomasyon

### 7.1 · Zamanlanmış görevler

Zamanlanmış görev her seferinde sıfırdan başlar ve başında kimse yoktur: istem ne, ne zaman, nereye sorularını kendi içinde cevaplamalı; görev okur ve rapor yazar, göndermez, silmez, birleştirmez.

**Benzetme:** SQL Server Agent job'ı ve gece vardiyasına bırakılan iş emri: sabahki toplantıyı bilmeyen biri okuyacak, imza yetkisi de yok.

### 7.2 · /loop ve izleme

Zamanlanmış görev takvimle tekrar eder, sen kapatana kadar sürer; /loop açık oturumun içinde bir şey olana kadar bakar, olunca ya da oturum kapanınca biter. Her döngüye bitiş şartı yaz, aralığı işin hızına göre seç.

**Benzetme:** Kira sözleşmesi her ay fatura keser, feshedene kadar; kargo takibi ise kargo gelince biter.

### 7.3 · claude -p ve betikler

claude -p Claude'u sohbet açmadan bir komut gibi çalıştırır; başka programlar onu çağırır, girdi verir, çıktıyı alır. Başında kimse olmadığı için izin sorulmaz; ne kullanabileceğini önceden açıkça verirsin.

**Benzetme:** Sorguyu SSMS'te elle çalıştırmak yerine sqlcmd ile bir .bat dosyasından çalıştırmak; gece çalışan iş "emin misin?" diye sormaz, yetkisi neyse onu yapar.

### 7.4 · GitHub Actions ile Claude

PR açılınca GitHub'ın kendi sunucusu (runner) repodaki yml dosyasını okur, secret'taki API anahtarıyla Claude'u başlatır, Claude yorum yazar. Yetki iki kat kilitlenir: permissions GitHub token'ının ne yapabileceğini, allowedTools Claude'un hangi araçları kullanabileceğini belirler.

**Benzetme:** ERP'de "fatura kaydedilince onay akışını başlat" kuralı: kontrolü servis hesabı yapar, şifresi kasada (secret) durur, yetkisi "oku ve not düş" ile sınırlıdır; onaylayan yine sensin.

## Seviye 8 · Usta: Claude ile ürün geliştir

### 8.1 · Claude API temelleri

API'de model hiçbir şey hatırlamaz: her istek model, max_tokens ve mesajı taşır, cevap metinle birlikte token sayısını getirir. Fatura = giden token × giden tarifesi + gelen token × gelen tarifesi; aynı iş Opus'ta Haiku'nun ~40 katı tutar, model seçimi en büyük maliyet kararıdır.

**Benzetme:** Aynı faturayı stajyer de mali müşavir de girer; süre aynı, saat ücreti 40 kat farklı. Müşaviri yanlışın pahalıya patladığı işe ayırırsın.

### 8.2 · Talimat tasarımı ve önbellek

İyi talimatın dört parçası: kim ve ne için, kaynak, yasaklar, üslup; kurallar ölçülebilir ("en fazla 4 cümle"), olumlu ("düz metin yaz") ve çelişkisiz olur. Önbellek baştan ilk farklı harfe kadar eşleşir: sabit kısım önde, değişen kısım (soru, saat) sonda.

**Benzetme:** SQL sorgu planı önbelleği: sorgu metni aynıysa plan hazırdır; başına her seferinde farklı bir yorum satırı eklersen her seferinde yeniden derlenir.

### 8.3 · Araç kullanımı ve ajan döngüsü

Model aracı kendisi çalıştırmaz: "şu girdiyle çalıştır" der ve durur (tool_use); harness (burada bizim programımız) aracı çalıştırır, sonucu geri verir, model cevabı yazar. Her araç turu en az iki istek demektir; hangi araçların var olduğu ve neyin onaysız yapılamayacağı kodda kalır.

**Benzetme:** Saha temsilcisi bilgiyi toplar, müşteriye onaylatır, merkeze "kayıt açın" diye telefon eder; kaydı merkez açar, numarayı temsilci müşteriye iletir. Kayıt açma yetkisi merkezde durur.

### 8.4 · Kendi MCP sunucun

MCP sunucusu aracı ayrı bir programa taşır: istemci onu başlatır, "hangi araçların var?" diye sorar, sonra "çalıştır" der. Kodu değiştirmeden her MCP istemcisi kullanabilir; yalnız her istemciye bir kez tanıtılır (Code'da `claude mcp add`, Desktop'ta config dosyası).

**Benzetme:** ERP'ye gömülü metodu WSDL'li bir web servisine çıkarmak: sözleşmeyi okuyan her istemci çağırır, metodu da routing çağırır, sen değil.

### 8.5 · Agent SDK

Agent SDK, Claude Code motorunu kendi programına takar: döngüyü, geçmişi ve izin sistemini hazır verir; sen araçları (MCP), talimatı ve sınırları verirsin. allowedTools önceden onaylı araç listesidir: geri alınabilir işi oraya koy, geri alınamaz işi koruyan kontrol araçta ya da insanda olsun.

**Benzetme:** Entity Framework: bağlantıyı ve kaydetme döngüsünü yazmazsın; ERP yetki tablosu ise sipariş açmaya izin verir, silmeyi ikinci imzaya bağlar.

### 8.6 · Çoklu ajan: orkestratör ve iş akışı grafiği

Yazan denetlemesin: her ajanın kendi rolü ve bağlamı olur. Sıra belliyse kodda bir akış şeması (grafik) kur, belli değilse şef bir modele bıraktır. Şemadaki her kutu ya model (anlam, yaklaşık) ya kod (sayma, kesin) olur; kesin ve ucuz kontrol önce gelir.

**Benzetme:** Satın alma onay akışı: belge sırayla talep açandan, satın almacıdan, onaycıdan geçer; tutar ve KDV kontrolünü CHECK kısıtı, "mantıklı mı?" sorusunu müdür yapar.

### 8.7 · Eval ve güvenlik

Model kandırılabilir; dolaylı injection verinin içinden gelir ve zincirdeki her modeli geçebilir. Güvence katmanları: en az yetki (vermediğin araç sızdıramaz), kod kapısı (onayı kod sorar), insan (gönderilmeden okur). Eval: bir kez denemek yetmez, oranı ölç.

**Benzetme:** Sipariş notu alanına "müdür onayıyla %50 indirim" yazılır; sistem notu irsaliyeye basarsa suç notu yazanda değil, notu belge sayan sistemdedir.
