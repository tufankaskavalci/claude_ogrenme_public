# site-durumu

Claude Code için küçük bir mod. Bir web sitesinin durumunu sohbetin yanındaki "Site durumu" panelinde gösterir: sitenin ana sayfası 200 dönmeli, yayında olmaması gereken bir dosya (varsayılan `/CLAUDE.md`) ise 404 dönmeli. Panelde yanıt kodu, yanıt süresi ve son kontrol saati görünür; "Yenile" düğmesi kontrolü tekrarlar. Oturum açılınca panel kendiliğinden açılır; kapatılırsa `/site-durumu` komutuyla yeniden açılır.

## Kurulum

Bu klasör kendi başına küçük bir yerel marketplace'tir. Repoyu indirdikten sonra bir kabukta:

```
claude plugin marketplace add ./seviye-1-7/4.7-mod/site-durumu
claude plugin install site-durumu@site-durumu
```

## Ayarlar

Kodun içinde hiçbir site adresi yoktur. Kurulumda ya da sonradan `/config` içinden girilir:

- **Site adresi** (`site_url`): kontrol edilecek site, örnek `https://ornek.com`. Boşsa panel ayar yapılmasını ister.
- **Gizli kalması gereken yol** (`hidden_path`): 404 dönmesi beklenen yol. Boş bırakılırsa bu kontrol yapılmaz.
