# Claude ustalık yol haritası

Hedef: Claude'u (Claude Code, Claude uygulamaları ve Claude API) usta seviyesinde kullanmak
ve sonunda bir şirkete bunun üzerine çözüm önerebilecek, kurabilecek hale gelmek.

Kimin için: yazılım geçmişi olan ama ajanlar, MCP, Agent SDK gibi kavramlara yeni olan geliştiriciler.

Yöntem: Her derste bir kavram, bir alıştırma. Alıştırmayı kendin yaparsın; ders anlatımı
[dersler/](dersler/) klasöründe, tek cümlelik özetler [HATIRLATICILAR.md](HATIRLATICILAR.md) içinde.
Uygulama projesi olarak kendi küçük bir web siten (statik bir sayfa yeter) ve bir GitHub hesabın olsun.

Toplam: **9 seviye, 46 ders.** Bitirdiğin dersin kutucuğunu kendi kopyanda işaretle: [ ] → [x].

---

## Seviye 1 · Temel: Claude Code'u tanı

| # | Ders | |
|---|------|---|
| [ ] 1.1 | Oturum, çalışma klasörü, araçlar (Read, Edit, Bash, Grep) | |
| [ ] 1.2 | İzin modları (sor / düzenlemeleri kabul et / plan / otomatik) | |
| [ ] 1.3 | Bağlam (context): geçici hafıza, oturumlar arası bilgi taşıma | |
| [ ] 1.4 | CLAUDE.md: projenin kalıcı talimatı | |

## Seviye 2 · İş tarif etme

| # | Ders | |
|---|------|---|
| [ ] 2.1 | İyi istek: amaç, kapsam, kısıt, bitti ölçütü | |
| [ ] 2.2 | Plan modu | |
| [ ] 2.3 | Görsel, dosya, link vermek | |
| [ ] 2.4 | Doğrulama: kanıt istemek | |
| [ ] 2.5 | Hata ve geri alma (restore, revert) | |

## Seviye 3 · Gerçek proje: siteyi yayına al

| # | Ders | |
|---|------|---|
| [ ] 3.1 | Branch (dal) ve birleştirme | |
| [ ] 3.2 | GitHub: remote, push, pull request | |
| [ ] 3.3 | Yayına alma (Cloudflare Workers); alan adı, alan adı alınınca | |
| [ ] 3.4 | Kod incelemesi (code review): Claude'a PR inceletmek | |

## Seviye 4 · Claude'u kendine göre ayarla

| # | Ders | Alıştırma |
|---|------|-----------|
| [ ] 4.1 | Ayarlar ve izinler (settings.json, izin listeleri) | Sık kullanılan komuta kalıcı izin |
| [ ] 4.2 | Hafıza düzeni: global CLAUDE.md, notlar, proje dosyası, tekrarı temizlemek | Notlarını toparla |
| [ ] 4.3 | Slash komutları ve kendi skill'ini yazmak | "Siteye bölüm ekle" skill'i |
| [ ] 4.4 | Eklentiler (plugin) ve marketplace: ne zaman kurulur, nasıl incelenir | Bir eklentiyi incele, karar ver |
| [ ] 4.5 | Hook'lar: otomatik davranış | Her düzenlemeden sonra kontrol |
| [ ] 4.6 | Çıktı stilleri ve durum satırı (status line) | Kendi durum satırın |
| [ ] 4.7 | Mod: Claude uygulamasının arayüzünü değiştirmek (panel, bant, bildirim) | Siteyi izleyen küçük bir panel |

## Seviye 5 · Ajanlar ve ekip

| # | Ders | Alıştırma |
|---|------|-----------|
| [ ] 5.1 | Harness'ın içi: Claude Code nasıl çalışır (sistem talimatı, araçlar, ajan döngüsü, bağlam özetleme) | Bir oturumun "röntgenini" çek |
| [ ] 5.2 | MCP ve bağlayıcılar (connectors): GitHub, Drive, Slack… | Bir bağlayıcı kur, sınırlarını test et |
| [ ] 5.3 | Alt ajanlar (subagent): işi paralel parçalara bölmek | Siteyi 3 açıdan paralel inceletme |
| [ ] 5.4 | Kendi alt ajanını tanımlamak (`.claude/agents`) | "SEO denetçisi" ajanı |
| [ ] 5.5 | Paralel oturumlar ve worktree | İki özelliği aynı anda geliştir |
| [ ] 5.6 | Ajan takımı: rol dağıtımı, oturumlar arası mesaj, onay kuralları | Kendi oturum düzenini resmîleştir |
| [ ] 5.7 | Model seçimi, düşünme derinliği (effort), hızlı mod, maliyet ve limitler | Aynı işi farklı ayarlarla yap, karşılaştır |

## Seviye 6 · Claude'un diğer elleri

| # | Ders | Alıştırma |
|---|------|-----------|
| [ ] 6.1 | Tarayıcı: yerleşik tarayıcı ve Claude in Chrome | Sitenin canlı testini tarayıcıda yaptır |
| [ ] 6.2 | Computer use: masaüstü uygulamalarını kullandırmak | Bir masaüstü işini yaptır |
| [ ] 6.3 | Artifact'ler ve dokümanlar: yayınlamak, paylaşmak | Müşteriye sunum sayfası |
| [ ] 6.4 | Bulut oturumları, uzaktan kontrol, telefondan takip | İşi buluta ver, telefondan izle |
| [ ] 6.5 | Claude ailesi: claude.ai, Projects, Cowork, mobil; hangi iş hangisinde | Kendi iş akışı haritan |

## Seviye 7 · Otomasyon

| # | Ders | Alıştırma |
|---|------|-----------|
| [ ] 7.1 | Zamanlanmış görevler ve rutinler | Her pazartesi site raporu |
| [ ] 7.2 | `/loop` ve izleme | Bir şeyi düzenli kontrol ettir |
| [ ] 7.3 | Komut satırından Claude (`claude -p`) ve betikler | Betiğin içinden Claude çağır |
| [ ] 7.4 | GitHub Actions ile Claude | PR açılınca otomatik inceleme |

## Seviye 8 · Usta: Claude ile ürün geliştir

| # | Ders | Alıştırma |
|---|------|-----------|
| [ ] 8.1 | Claude API temelleri: mesaj, model, token, fiyat | Siteye "bize sorun" asistanı |
| [ ] 8.2 | Prompt tasarımı ve prompt caching | Asistanın talimatını iyileştir, maliyeti düşür |
| [ ] 8.3 | Tool use ve ajan döngüsünü kendin yazmak | Asistan randevu formunu doldurabilsin |
| [ ] 8.4 | Kendi MCP sunucunu yazmak | Müşteri için örnek MCP sunucusu |
| [ ] 8.5 | Agent SDK | Küçük bir müşteri ajanı |
| [ ] 8.6 | Çoklu ajan sistemleri: orkestratör, iş akışı grafikleri (graph) | Araştır → yaz → denetle zinciri |
| [ ] 8.7 | Değerlendirme (eval) ve güvenlik: prompt injection, veri sızıntısı, "onay sadece insandan" | Kendi asistanını kandırmaya çalış |

## Seviye 9 · Danışman: müşteriye satabilmek

| # | Ders | Alıştırma |
|---|------|-----------|
| [ ] 9.1 | Bir şirkette yapay zekâ fırsatı bulmak | Eski bir müşteri senaryosu üzerinde analiz |
| [ ] 9.2 | Fiyat, risk, KVKK, veri gizliliği | Teklif taslağı |
| [ ] 9.3 | Demo ve teslim | 8. seviyedeki asistanı müşteriye sunar gibi demo |

---

## Kurallar

- Bir derste en fazla bir yeni kavram.
- Takıldığında Claude'a "anlamadım, başka bir örnekle anlat" de.
- Önce temel, sonra araç: eklenti ve aracı ihtiyaç olunca kur.
- Hız sende.
