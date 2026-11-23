# Seviye 3 · Gerçek proje: siteyi yayına al

Amaç: Claude ile çalışırken branch, GitHub, pull request, otomatik yayın ve kod incelemesi alışkanlıklarını kurmak.

Gerekenler: bir GitHub hesabı, sitenin git deposu, ücretsiz katmanı olan bir barındırma hizmeti (bu kılavuzdaki örnekte Cloudflare Workers; GitHub reposuna bağlanan başka bir statik site barındırıcısı da olur).

## 3.1 Branch (dal) ve birleştirme

**Kavram:** Branch, ana çizgiyi (main) bozmadan deneme yapabileceğin ayrı bir çalışma hattıdır. Bir branch'e geçince dosyalar o branch'in haline döner; main'e dönünce eski haline. Beğendiğin denemeyi main'e birleştirirsin (merge), beğenmediğini silersin. Temel kural: görmediğin değişikliği birleştirme.

**Alıştırma:**
1. Claude'dan `deneme/renk` adında bir branch açmasını iste.
2. Bu branch'te belirgin bir değişiklik yaptır (ör. arka plan rengi) ve commit ettir.
3. main'e geri dön, sayfayı tarayıcıda yenile; değişikliğin kaybolduğunu gör.
4. Branch'e geri dön, yenile; değişikliğin geri geldiğini gör.
5. Beğenirsen birleştir, beğenmezsen branch'i sil.

**Geçti ölçütü:** Bir branch'e geçtin ama sayfada hiçbir fark göremedin. Birleştirmeden önce hangi iki olasılığı kontrol edersin?

**Benzetme:** Yeni modülü önce test sunucusunda denersin, beğenince canlıya alırsın.

**Sık hata:** Fark görmeden birleştirmek. Değişiklik çok küçükse ya da sayfa yenilenmediyse "bir şey olmadı" sanılır; önce `git diff main..<branch>` ile neyin değiştiğine bak.

## 3.2 GitHub: remote, push, pull request

**Kavram:** Save dosyayı diske yazar; commit değişikliği bilgisayarındaki git geçmişine işler; push o geçmişi GitHub'a (remote) gönderir; pull GitHub'dakini bilgisayarına çeker. Pull request (PR), bir branch'i main'e birleştirmeden önce değişikliklerin görüldüğü ve tartışıldığı yerdir. Kişisel ya da müşteri projelerinde repoyu private açmak iyi bir varsayılandır.

**Alıştırma:**
1. GitHub CLI'ı kur ve `gh auth login` ile kendin giriş yap (şifreyi Claude'a verme).
2. Claude'dan GitHub'da private bir repo oluşturmasını ve main'i push etmesini iste.
3. Yeni bir branch'te bir README.md ekletip push ettir ve PR açtır.
4. github.com'da PR'ın "Files changed" sekmesini kendin oku, birleştir.
5. Claude'a `git pull` yaptır; yerel main'in güncellendiğini gör.

**Geçti ölçütü:** PR'ı GitHub'da birleştirdin ama yerelde pull yapmadın, sonra yerelde aynı dosyayı değiştirdin. Ne olur, nasıl önlersin?

**Benzetme:** Save taslak deftere yazmak, commit deftere işlemek, push defteri merkeze göndermek, pull merkezden güncel defteri almaktır.

**Sık hata:** Branch koruması gibi özelliklerin her plan için ücretsiz olduğunu varsaymak. Private repolarda bazıları ücretli planda gelir; "main'e doğrudan commit yok, her şey PR ile" kuralını CLAUDE.md'ye yazmak ücretsiz bir alternatiftir.

## 3.3 Yayına alma

**Kavram:** Barındırma hizmetini GitHub reposuna bağladığında main'e her birleştirme canlı siteyi kendiliğinden yeniden yayınlar. Push edilmiş her branch için de ayrı bir önizleme adresi oluşabilir; PR'ı birleştirmeden önce orada bakarsın. Yalnız yayınlanacak dosyaları ayrı bir klasörde (ör. `public/`) tutmak, CLAUDE.md ve README gibi iç dosyaların sitede görünmesini engeller.

**Alıştırma:**
1. Claude'a bir PR ile site dosyalarını `public/` klasörüne taşıt; taslak aşamasındaysan sayfaya `noindex` ekletebilirsin.
2. Barındırma hizmetinde hesap aç, yalnız bu repoyu bağla, yayın klasörü olarak `public` seç.
3. Canlı adresi aç; ayrıca `/CLAUDE.md` adresinin 404 verdiğini kontrol et.
4. Yeni bir branch'te küçük bir değişiklik yaptır, push ettir, önizleme adresinde gör.
5. PR'ı birleştir, canlının kendiliğinden güncellendiğini gör, yerelde `git pull` yap.

**Geçti ölçütü:** Bir arkadaşın "değişikliği yaptım, main'i push ettim, ama önizleme hiç görmedim" diyor. Doğru akışı baştan sona sırala ve önizlemenin neden çıkmadığını açıkla.

**Benzetme:** Önizleme test ortamıdır, main canlı sistem; canlıya geçişi barındırma hizmeti kendisi yapar.

**Sık hata:** Önizleme için branch'i push etmeyi unutmak; ya da PR GitHub'da birleştikten sonra yerelde main'i "push" etmeye çalışmak. Birleştirme GitHub'da olduysa yerelde yapılacak iş `git pull`'dur.

## 3.4 Kod incelemesi (code review)

**Kavram:** İşi yapan ile inceleyen farklı olmalıdır; Claude'a bir PR'ı inceletebilirsin, ama tercihen işi yazan oturumdan farklı bir oturumda. İnceleyen bulgu ve öneri sunar; her bulguyu kabul ya da ret, gerekçesiyle, işin sahibi verir. Claude'un yorumu da yanlış olabilir, çünkü elindeki bilgi eksik ya da yanlış olabilir.

**Alıştırma:**
1. İçerik değiştiren gerçek bir PR açtır (ör. "Hakkımızda" metni).
2. Önce PR'ın "Files changed" sekmesini ve önizlemesini kendin oku.
3. Ayrı bir oturumda Claude'dan bu PR'ı salt okunur incelemesini iste (dosya değiştirmeden, bulgu listesi olarak).
4. Her bulgu için "kabul / ret ve neden" yaz.
5. Kabul ettiklerini yazar oturuma uygulat, sonra birleştir.

**Geçti ölçütü:** İnceleme bir bulgunda "bu cümle yanlış, şöyle olmalı" diyor, ama sen o konuyu inceleyenden daha iyi biliyorsun. Ne yaparsın ve kararını nasıl kayda geçirirsin?

**Benzetme:** Raporu hazırlayan onaylamaz; kontrol eden başkası olur, son söz yine işin sahibindedir.

**Sık hata:** İncelemeyi beklemeden PR'ları birleştirmek. İnceleme, birleştirmeden önce yapıldığında anlamlıdır.
