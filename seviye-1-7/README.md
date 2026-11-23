# Seviye 1–7 örnek dosyaları

Ders anlatımları [../dersler/](../dersler/) klasöründe. Burada, alıştırmalarda üretilen dosyaların kopyalanabilir örnekleri var.
Seviye 1–3 ve 6'nın alıştırmaları dosya üretmez (oturum, istek yazma, git ve GitHub akışı, tarayıcı); onlar için ders anlatımına bak.

| Ders | Dosya | Nereye konur | Ne yapar |
|---|---|---|---|
| 4.1 İzinler | [4.1-izinler/settings.json](4.1-izinler/settings.json) | Projede `.claude/settings.json` | Okuma amaçlı git komutlarına sormadan izin, `rm` yasak. Tek değerde en özel dosya kazanır; izin listeleri birleşir ve deny her zaman kazanır |
| 4.3 Skill | [4.3-skill/bolum-ekle/SKILL.md](4.3-skill/bolum-ekle/SKILL.md) | Projede `.claude/skills/bolum-ekle/` | `/bolum-ekle <ne>`: branch aç, bölümü ekle, PR aç, birleştirmeyi insana bırak |
| 4.5 Hook | [4.5-hook/settings.json](4.5-hook/settings.json) | Projede `.claude/settings.json` | Her Edit/Write sonrası `hook.log` dosyasına bir satır. Kanıt: log'daki saatler |
| 4.6 Durum satırı | [4.6-durum-satiri/statusline.js](4.6-durum-satiri/statusline.js) + [settings-parcasi.json](4.6-durum-satiri/settings-parcasi.json) | `~/.claude/statusline.js` ve `~/.claude/settings.json` | Alt satırda model, klasör ve git dalı |
| 4.7 Mod | [4.7-mod/site-durumu/](4.7-mod/site-durumu/) | Kendi README'sine bak | Claude uygulamasında bir siteyi izleyen panel (200 / 404 kontrolü) |
| 5.4 Alt ajan | [5.4-alt-ajan/seo-denetcisi.md](5.4-alt-ajan/seo-denetcisi.md) | Projede `.claude/agents/` | Yalnız okuyan SEO denetçisi; araçları Read, Grep, Glob ile sınırlı |
| 5.6 Ajan takımı | [5.6-ajan-takimi/takim.md](5.6-ajan-takimi/takim.md) | `~/.claude/CLAUDE.md` içinden `@` ile | Oturum rolleri, onay yalnız kullanıcıdan, bir dosyayı tek oturum değiştirir |
| 7.1 Zamanlanmış görev | [7.1-zamanlanmis-gorev/SKILL.md](7.1-zamanlanmis-gorev/SKILL.md) | Uygulamanın zamanlanmış görevleri | Her pazartesi salt-okunur site raporu. `<...>` yerlerini doldur |
| 7.3 `claude -p` | [7.3-claude-p/powershell-profili-utf8.ps1](7.3-claude-p/powershell-profili-utf8.ps1) | PowerShell profili (`$PROFILE`) | Windows PowerShell'de Türkçe karakterlerin bozulmaması için UTF-8 |
| 7.4 GitHub Actions | [7.4-github-actions/claude-review.yml](7.4-github-actions/claude-review.yml) | Projede `.github/workflows/` | PR açılınca Claude inceler, yalnız yorum yazar. Repo secret'ı: `ANTHROPIC_API_KEY` |

Dosyaları kopyalamadan önce oku: hook'lar ve modlar her seferinde çalışan koddur.
