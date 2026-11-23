// Kullanım:  node sablon-eposta.mjs 4     (4 = randevular.csv'deki talep numarası)
// Zincirin (araştır → yaz → denetle) yerine şablonla "talebiniz alındı" taslağı üretir. Hiçbir şey GÖNDERİLMEZ.
import { readFileSync } from "node:fs";
import { anahtarKontrol, YOL } from "./ortak.mjs";
import { hizmetSec, temizAd, talepAlindiEpostasi } from "./sablon.mjs";

anahtarKontrol();
const no = Number(process.argv[2] ?? 4);
const satir = readFileSync(YOL.randevular, "utf8").split(/\r?\n/).filter(Boolean)[no - 1];
if (!satir) { console.error(`${no} numaralı talep yok.`); process.exit(1); }
const [, ad, , konu] = satir.split(";");

try {
  const { hizmet, hamCevap, maliyet } = await hizmetSec(konu);
  const temiz = temizAd(ad);
  console.log(`Konu (müşterinin sözü): ${konu}`);
  console.log(`Model seçimi: "${hamCevap}" → kod onayı: ${hizmet}`);
  console.log(`Ad: "${ad}" → ${temiz ? "geçerli" : "REDDEDİLDİ, selamda ad kullanılmayacak"}\n`);
  console.log(talepAlindiEpostasi({ no, ad: temiz, hizmet }));
  console.log(`\n[tahmini maliyet: $${maliyet.toFixed(4)}]`);
} catch (h) {
  console.error(`[HATA] ${h.message.split("\n")[0]}`);
}
