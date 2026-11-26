# Claude ustalık programı (Türkçe)

Claude'u (Claude Code, Claude masaüstü uygulaması ve Claude API) sıfırdan usta seviyesine kadar öğrenmek için
**9 seviye, 46 derslik**, uygulamalı bir program. Her derste bir kavram, bir alıştırma ve "anladım mı?" diye
kendini sınayacağın bir soru var.

Kimin için: yazılım geçmişi olan, Copilot gibi araçları kullanmış ama ajan, MCP, Agent SDK gibi kavramlara yeni
olan geliştiriciler. Program gerçek bir kişisel öğrenme sürecinden derlendi; kişisel bilgiler çıkarıldı,
örnek şirket ve veriler kurgusaldır.

## Nasıl takip edilir

1. [YOL-HARITASI.md](YOL-HARITASI.md): 46 dersin listesi. Kendi kopyanda bitirdiğin dersi işaretle.
2. [dersler/](dersler/): her seviyenin ayrıntılı anlatımı: kavram, alıştırma, geçti ölçütü, benzetme.
3. [HATIRLATICILAR.md](HATIRLATICILAR.md): her dersin tek cümlelik özeti. Dersi bitirince ve haftalar sonra tekrar oku.
4. [seviye-1-7/](seviye-1-7/README.md): Seviye 4–7 alıştırmalarının örnek dosyaları (izin ayarı, skill, hook, durum satırı, mod, alt ajan, takım kuralları, zamanlanmış görev, GitHub Actions).
5. [kod/](kod/): Seviye 8'in çalışan kodu (C# ve Node).
6. **[Görsel tekrar sayfası](https://tufankaskavalci.github.io/claude_ogrenme_public/gorsel/)** (kaynağı [gorsel/](gorsel/)): 46 dersin her biri adım adım hareketli bir çizimle ve bir benzetmeyle anlatılır. Yanında `kurallar.html` (Claude ile çalışırken 12 kural) ve `tekrar.html` (hızlı tekrar) var. Simgeler ve yazı tipi internetten yüklenir.

Kural: bir dersi, sonundaki "geçti ölçütü" sorusunu kendi cümlelerinle yeni bir duruma uygulayabildiğinde bitmiş say.
Ezberden tekrar etmek geçmek değildir.

## Seviyeler

| Seviye | Konu |
|---|---|
| 1 | Temel: oturum, araçlar, izin modları, bağlam, CLAUDE.md |
| 2 | İş tarif etme: iyi istek, plan modu, görsel vermek, doğrulama, geri alma |
| 3 | Gerçek proje: branch, GitHub, PR, yayına alma, kod incelemesi |
| 4 | Claude'u kendine göre ayarla: izinler, hafıza düzeni, skill, eklenti, hook, durum satırı, mod |
| 5 | Ajanlar ve ekip: harness'ın içi, MCP, alt ajanlar, worktree, ajan takımı, model seçimi |
| 6 | Claude'un diğer elleri: tarayıcı, computer use, artifact, bulut, Claude ailesi |
| 7 | Otomasyon: zamanlanmış görev, `/loop`, `claude -p`, GitHub Actions |
| 8 | Claude ile ürün geliştir: API, talimat ve önbellek, araç kullanımı, MCP sunucusu, Agent SDK, çoklu ajan, eval ve güvenlik |
| 9 | Danışman: fırsat bulmak, fiyat ve risk, demo |

## Seviye 8 kodu

| Ders | Klasör | Ne yapar |
|---|---|---|
| 8.1–8.2 | [kod/api-deneme](kod/api-deneme) | C# konsoldan Claude API çağrısı; talimat dosyası ve prompt caching |
| 8.3 | [kod/api-randevu](kod/api-randevu) | Araç (tool) kullanan asistan; ajan döngüsü elle yazılmış |
| 8.4 | [kod/mcp-randevu](kod/mcp-randevu) | Aynı araç C# MCP sunucusu olarak; Claude Code'a bağlanır |
| 8.5 | [kod/ajan-randevu/ajan.mjs](kod/ajan-randevu/ajan.mjs) | Agent SDK ile müşteri ajanı; kod düzeyinde onay kapısı |
| 8.6 | [kod/ajan-randevu/zincir.mjs](kod/ajan-randevu/zincir.mjs) | Araştır → yaz → kod kontrolü → söz filtresi → denetle zinciri |
| 8.7 | [kod/ajan-randevu/eval.mjs](kod/ajan-randevu/eval.mjs) | Saldırıları N kez çalıştırıp ölçen eval; şablon (beyaz liste) yolu |

Ölçüm sonuçları ve parçaların başka projede kullanımı: [kod/ajan-randevu/README.md](kod/ajan-randevu/README.md).

### Kurulum

1. .NET 9 SDK ve Node 24 kur.
2. `kod/mcp-randevu` içinde `dotnet build -c Release`.
3. `kod/ajan-randevu` içinde `npm install`.
4. Claude Console'dan (platform.claude.com) bir API anahtarı al, bir harcama sınırı koy ve anahtarı **yalnız o terminal penceresinde** tanımla:
   `$env:ANTHROPIC_API_KEY = "..."` (PowerShell) ya da `export ANTHROPIC_API_KEY=...` (bash).
   Kalıcı ortam değişkeni yapma: Claude Code aboneliğin yerine API'den faturalanabilir.
   Anahtarı hiçbir dosyaya yazma, commit etme, sohbete yapıştırma.

Kodlar `kod/ornek-veri/site-index.html` dosyasındaki **kurgusal** "Örnek Mobilya Atölyesi" sitesini okur (mutfak dolabı, gardırop, tamir; ücretsiz keşif randevusu).
Kendi sitenle denemek için `kod/ajan-randevu/ortak.mjs` içindeki `YOL.site` değerini ve C# projelerindeki site yolunu değiştir.
Model olarak ucuz olan `claude-haiku-5-5` kullanılır; bir eval çalıştırması birkaç sent tutar.

## Lisans

[MIT](LICENSE). Kullan, değiştir, paylaş.
