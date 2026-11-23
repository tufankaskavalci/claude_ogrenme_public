// Ders 8.6: çoklu ajan — araştır → yaz → denetle zinciri (iş akışı grafiği).
// Sırayı MODEL değil, bu KOD belirliyor. Her ajan ayrı bir query(): kendi rolü, kendi bağlamı.
//
//   [Araştırmacı] ─► [Yazar] ─► [Sayaç (kod)] ─► [Söz filtresi (model, tek soru)] ─► [Denetçi (model)] ─► bitti
//                       ▲            │                     │                               │
//                       └────────────┴──── DÜZELT notu ────┴───────────────────────────────┘  (en fazla 3 tur, sonra insana)
//
// Kullanım:  node zincir.mjs 2      (2 = randevular.csv'deki talep numarası)
// Hiçbir e-posta GÖNDERİLMEZ; çıktı yalnızca taslaktır.
import { readFileSync } from "node:fs";
import { sayac } from "./sayac.mjs";
import { anahtarKontrol, siteMetni, ARASTIRMACI, YAZAR, KURALLAR_DENETCI, DENETCI, tekAjan, sozFiltresi, YOL } from "./ortak.mjs";

anahtarKontrol();

const no = Number(process.argv[2] ?? 2);
const satir = readFileSync(YOL.randevular, "utf8")
  .split(/\r?\n/).filter(Boolean)[no - 1];
if (!satir) { console.error(`${no} numaralı talep yok.`); process.exit(1); }

// Roller (ARASTIRMACI, YAZAR, DENETCI) ve kurallar ortak.mjs'te: eval.mjs de aynılarını test eder.

// ---- Tek bir ajanı çalıştırıp ekrana basan yardımcı ----
let toplamMaliyet = 0;
async function ajan(baslik, rol, istek) {
  let sonuc;
  try { sonuc = await tekAjan(rol, istek); }
  catch (h) { throw new Error(`${baslik}: ${h.message}`); }
  toplamMaliyet += sonuc.maliyet;
  console.log(`\n=== ${baslik} ===\n${sonuc.cevap}`);
  return sonuc.cevap;
}

// ---- Grafik: düğümler ve aralarındaki oklar ----
try {
  const notlar = await ajan("1. Araştırmacı", ARASTIRMACI,
    `<talep>${no};${satir}</talep>\n<site_bilgisi>\n${siteMetni}\n</site_bilgisi>`);

  let taslak = await ajan("2. Yazar", YAZAR, `<notlar>\n${notlar}\n</notlar>`);

  let sf;
  for (let tur = 1; tur <= 3; tur++) {
    // KOD kutusu: ücretsiz ve kesin kontrol önce
    const s = sayac(taslak, no);
    console.log(`\n=== Sayaç (kod, tur ${tur}) ===\nGövde ${s.kelime} kelime, talep numarası ${s.noVar ? "var" : "YOK"} → ${s.hatalar.length ? "DÜZELT" : "TAMAM"}`);

    let karar;
    if (s.hatalar.length) {
      karar = "DÜZELT\n" + s.hatalar.join("\n"); // denetçiye hiç gitmeden yazara geri
    } else if ((sf = await sozFiltresi(taslak), toplamMaliyet += sf.maliyet, sf.riskli)) {
      // MODEL kutusu (dar): tek soru, "izinli olmayan ticari söz var mı?"
      console.log(`\n=== Söz filtresi (model, tur ${tur}) ===\nRİSKLİ: ${sf.ifade}`);
      karar = `DÜZELT\n- Kural 4 (söz filtresi): "${sf.ifade}" bir ticari söz gibi okunuyor; kaldır.`;
    } else {
      console.log(`\n=== Söz filtresi (model, tur ${tur}) ===\nTEMİZ`);
      // MODEL kutusu: yalnızca anlam gerektiren kurallar
      karar = await ajan(`3. Denetçi (tur ${tur})`, DENETCI,
        `<kurallar>\n${KURALLAR_DENETCI}\n</kurallar>\n<notlar>\n${notlar}\n</notlar>\n<taslak>\n${taslak}\n</taslak>`);
      if (karar.startsWith("GEÇTİ")) { console.log("\n>>> Taslak denetimden geçti."); break; }
    }
    if (tur === 3) { console.log("\n>>> 3 turda geçemedi: karar insana bırakıldı."); break; }

    taslak = await ajan(`2. Yazar (düzeltme ${tur})`, YAZAR,
      `<notlar>\n${notlar}\n</notlar>\n<onceki_taslak>\n${taslak}\n</onceki_taslak>\n<denetci_notu>\n${karar}\n</denetci_notu>`);
  }
} catch (hata) {
  console.error(`\n[HATA] ${hata.message.split("\n")[0]}`);
}
console.log(`\n[toplam tahmini maliyet: $${toplamMaliyet.toFixed(4)}]`);
