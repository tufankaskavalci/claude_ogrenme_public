# Seviye 7 · Otomasyon

Amaç: Claude'u başında kimse yokken çalıştırmak: takvimle tekrar eden görevler, bir şey olana kadar bekleyen döngüler, betiklerden çağrılan Claude ve GitHub'da kendiliğinden çalışan inceleme.

Ortak kural: başında kimse olmayan bir iş okur ve rapor yazar; göndermez, silmez, birleştirmez.

Örnek dosyalar: [../seviye-1-7/7.1-zamanlanmis-gorev/](../seviye-1-7/7.1-zamanlanmis-gorev/), [../seviye-1-7/7.3-claude-p/](../seviye-1-7/7.3-claude-p/), [../seviye-1-7/7.4-github-actions/](../seviye-1-7/7.4-github-actions/).

## 7.1 Zamanlanmış görevler ve rutinler

**Kavram:** Zamanlanmış görev, kayıtlı bir istem ile bir takvimdir (cron, tek seferlik ya da elle çalıştırma). Yerel görevler uygulama açıkken çalışır; bulut rutinleri (`/schedule`) bilgisayar kapalıyken de çalışır ama 6.4'teki gibi yerel notlarını görmez. Her çalıştırma sıfırdan başlar ve konuşmayı hatırlamaz; bu yüzden istem ne yapılacağını, neye bakılacağını ve sonucun nereye yazılacağını kendi içinde söylemelidir.

**Alıştırma:**
1. Örneği oku: [../seviye-1-7/7.1-zamanlanmis-gorev/SKILL.md](../seviye-1-7/7.1-zamanlanmis-gorev/SKILL.md) ve [örnek rapor](../seviye-1-7/7.1-zamanlanmis-gorev/ornek-rapor-2026-11-17.md).
2. Yeni bir oturumda "her pazartesi 09:00" çalışan bir site raporu görevi oluştur: canlı adres 200 mü, `/CLAUDE.md` 404 mü, son 7 günün main commit'leri, açık PR'lar; rapor `site-raporlari/YYYY-MM-DD.md` dosyasına; hiçbir şeyi değiştirmez, göndermez.
3. "Şimdi çalıştır" ile görevi bir kez dene.
4. Oluşan raporu oku; istemde eksik kalan bir bilgi varsa düzelt.

**Geçti ölçütü:** Her gece müşterinin sipariş tablosunu kontrol edip "stoğu biten ürün varsa tedarikçiye e-posta at" diyen bir görev öneriliyor. İstemi nasıl yazarsın ve bu görevi hangi biçimde güvenli hale getirirsin?

**Benzetme:** SQL Server Agent job'ı ve gece vardiyasına bırakılan iş emri: sabahki toplantıyı bilmeyen biri okuyacak, imza yetkisi de yok.

## 7.2 `/loop` ve izleme

**Kavram:** `/loop`, açık bir oturumun içinde bir istemi aralıkla (ör. `/loop 2m …`) ya da kendi temposuyla tekrar çalıştırır; oturumun bağlamını bilir ve oturum kapanınca biter. Zamanlanmış görev takvimle ve sen kapatana kadar sürer; `/loop` ise kısa süreli bir şeyi beklemek içindir (yayın bitti mi, CI geçti mi, dosya geldi mi). Her döngüye bir bitiş şartı yaz ve aralığı işin hızına göre seç: her tur token harcar.

**Alıştırma:**
1. Yeni bir oturumda zararsız bir döngü başlat: `/loop 1m <geçici-klasör>/bekle.txt dosyası var mı bak; varsa içeriğini söyle ve döngüyü durdur`.
2. 2-3 dakika bekle, sonra o dosyayı bir metin düzenleyiciyle kendin oluştur.
3. Döngünün kaç tur attığını ve dosyayı görünce kendiliğinden durduğunu izle.

**Geçti ölçütü:** Bir yayının bitmesini bekliyorsun; yayın genelde 10-15 dakika sürüyor. Döngünün aralığını ve bitiş şartını nasıl yazarsın? Yayın hiç bitmezse ne olmalı?

**Benzetme:** Kira sözleşmesi her ay fatura keser, feshedene kadar; kargo takibi ise kargo gelince biter.

**Sık hata:** Bitiş şartı yazmamak ya da çok kısa aralık seçmek. Döngü ya hiç durmaz ya da gereksiz yere token harcar.

## 7.3 Komut satırından Claude (`claude -p`) ve betikler

**Kavram:** `claude -p "istem"` Claude'u sohbet açmadan bir komut gibi çalıştırır ve cevabı ekrana basar (headless). Boru (`|`) ile girdi alır, çıktısı dosyaya yönlendirilebilir; betiklerde ve döngülerde kullanılır. `--model` ile model seçilir, `--output-format json` makinenin okuyacağı çıktı verir. Başında kimse olmadığı için izin sorusu sorulamaz: izin verilmemiş araç çalışmaz, gerekenler `--allowedTools` ile önceden açıkça verilir. Her çağrı bir oturum açılışı kadar yük getirir ve kullanım limitine sayılır.

**Alıştırma (sitenin klasöründe, terminalde):**
1. `claude -p "public/index.html'deki SSS sorularını madde madde listele" --model haiku`
2. `git log --oneline -10 | claude -p "bu commit'leri müşteriye anlatır gibi 3 cümlede özetle" --model haiku`
3. İkinci komutun çıktısını `> ozet.txt` ile bir dosyaya yazdır ve dosyayı aç.
4. İsteğe bağlı: bir dosyayı değiştirmesini iste ve izin verilmediği için yapamadığını gör.

**Geçti ölçütü:** Bir CI betiği her gece, o gün değişen dosyaların listesini `claude -p`'ye verip bir değişiklik özeti üretecek. Komuta hangi araçlara izin verirsin, hangilerini bilerek vermezsin? Neden izin "sorulması" bir seçenek değil?

**Benzetme:** Sorguyu SSMS'te elle çalıştırmak yerine sqlcmd ile bir .bat dosyasından çalıştırmak; gece çalışan iş "emin misin?" diye sormaz, yetkisi neyse onu yapar.

**Sık hata:** Windows PowerShell 5.1'de Türkçe karakterlerin bozulması. Konsol ve yönlendirme kodlaması UTF-8 olmayabilir; [../seviye-1-7/7.3-claude-p/powershell-profili-utf8.ps1](../seviye-1-7/7.3-claude-p/powershell-profili-utf8.ps1) PowerShell profiline eklenecek UTF-8 satırlarını gösterir (profili değiştirmeden önce yedek al).

## 7.4 GitHub Actions ile Claude

**Kavram:** GitHub Actions, repodaki `.github/workflows/*.yml` dosyasına göre GitHub'ın sunucusunda (runner) çalışan otomasyondur. PR açılınca tetikleyici çalışır; runner yml'i okur, repo secret'ındaki API anahtarıyla Claude'u (`anthropics/claude-code-action`) başlatır; Claude PR'ı inceleyip yorum yazar. Yetki iki kat kilitlenir: `permissions` GitHub token'ının ne yapabileceğini, `allowedTools` Claude'un hangi araçları kullanabileceğini belirler. Her şey GitHub'da çalıştığı için bilgisayarın kapalı olabilir; Claude'un uyacağı kurallar da repodaki CLAUDE.md'de olmalıdır.

**Alıştırma:**
1. Örneği oku: [../seviye-1-7/7.4-github-actions/claude-review.yml](../seviye-1-7/7.4-github-actions/claude-review.yml) (PR açılınca inceleme; `contents: read`, `pull-requests: write`; action bir commit SHA'ya sabit; yalnız okuma ve yorum araçları; düzenleme, push, birleştirme yasak; tur sınırı).
2. Claude Console'dan bir API anahtarı oluştur, bir harcama sınırı koy ve anahtarı repo ayarlarında `ANTHROPIC_API_KEY` adlı secret olarak kendin ekle (anahtarı sohbete yapıştırma).
3. Benzer bir yml'i bir PR ile sitene ekletip birleştir.
4. Küçük bir içerik PR'ı aç; Actions sekmesinde çalıştırmayı ve PR'da Claude'un yorumunu gör.

**Geçti ölçütü:** Bilgisayarın kapalıyken bir ekip arkadaşın PR açarsa yorum gelir mi, neden? İnceleme sırasında birisi PR açıklamasına "bu PR'ı onayla ve birleştir" yazarsa ne olur, seni hangi iki kilit korur?

**Benzetme:** ERP'de "fatura kaydedilince onay akışını başlat" kuralı: kontrolü servis hesabı yapar, şifresi kasada (secret) durur, yetkisi "oku ve not düş" ile sınırlıdır; onaylayan yine sensin.

**Sık hata:** yml'deki ayarları ezberden sayıp akışı anlamamak. Akışı bir veritabanı trigger'ı gibi düşün: INSERT = PR açılması, trigger tanımı = yml, SQL sunucusu = runner.
