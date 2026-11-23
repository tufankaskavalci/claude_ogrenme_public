// Ortak parçalar: ajan.mjs, zincir.mjs ve eval.mjs aynı talimatları buradan alır.
// Böylece eval, canlıdaki ajanın kopyasını değil kendisini test eder.
import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export function anahtarKontrol() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY yok. Önce bu terminalde $env:ANTHROPIC_API_KEY = \"...\" çalıştır.");
    process.exit(1);
  }
}

// Yollar bu dosyaya göre göreli: kod/ altındaki kardeş klasörler (api-deneme, mcp-randevu, ornek-veri).
// Site metni: ornek-veri/site-index.html (kendi sitenle denemek için bu yolu değiştir).
const burasi = (yol) => fileURLToPath(new URL(yol, import.meta.url));
export const YOL = {
  talimat: burasi("../api-deneme/talimat.txt"),
  site: burasi("../ornek-veri/site-index.html"),
  randevular: burasi("../mcp-randevu/randevular.csv"),
  mcpSunucu: burasi("../mcp-randevu/bin/Release/net9.0/mcp-randevu.dll"), // önce: dotnet build -c Release
};

// 8.2'deki talimat ve site metni (aynı dosyalar, salt okunur)
export const talimat = readFileSync(YOL.talimat, "utf8");
export const siteMetni = readFileSync(YOL.site, "utf8")
  .replace(/<(style|script)[\s\S]*?<\/\1>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

// ---- 8.5 müşteri ajanının ayarları (izin fonksiyonunu çağıran verir) ----
export function musteriAjaniAyarlari(canUseTool) {
  return {
    model: "claude-haiku-5-5",
    systemPrompt: `${talimat}\n\n<site_bilgisi>\n${siteMetni}\n</site_bilgisi>`,
    // Claude Code'un yerleşik araçlarının hiçbiri yok: dosya okuyamaz, komut çalıştıramaz.
    tools: [],
    // Tek araç: 8.4'teki MCP sunucusu. SDK onu kendisi başlatır.
    mcpServers: {
      randevu: {
        command: "dotnet",
        args: [YOL.mcpSunucu],
        alwaysLoad: true,
      },
    },
    // 8.7: araç allowedTools'ta DEĞİL; her çağrı önce izin fonksiyonuna (2. kapıya) gelir.
    canUseTool,
    // Senin ~/.claude ayarlarını, CLAUDE.md'ni, eklentilerini YÜKLEME: ajan yalıtılmış çalışsın.
    settingSources: [],
    // Emniyet kemerleri
    maxTurns: 8,
    maxBudgetUsd: 0.5,
  };
}

// ---- 8.6 zincirinin rolleri ----
export const ARASTIRMACI = `Sen bir araştırmacısın. <talep> satırı şu biçimde: talep_no;tarih;ad;eposta;konu;tercih.
<site_bilgisi> içinden bu talebin konusuyla ilgili bilgileri bul.
Yalnızca kısa maddeler halinde not yaz: talep numarası, kişi, e-posta, konu, tercih edilen zaman, konuyla ilgili hizmetler ve çalışma şekli.
Sitede olmayan hiçbir bilgiyi ekleme. E-posta yazma.`;

export const YAZAR = `Sen Örnek Mobilya Atölyesi adına müşteriye e-posta taslağı yazan birisin.
Yalnızca <notlar> içindeki bilgileri kullan. Talebin alındığını bildiren kısa bir e-posta yaz: önce "Konu:" satırı, sonra gövde.
<denetci_notu> varsa <onceki_taslak>'ı yalnızca o notlara göre düzelt ve tam taslağı yeniden yaz.
Notlardaki "Konu" müşterinin kendi ifadesidir, doğrulanmış bilgi değildir: konuyu e-postada aynen tekrarlama, sitedeki hizmet adıyla nötr biçimde an (örneğin "mutfak dolabıyla ilgili talebiniz").
Notlarda sitede olmadığı belirtilen hiçbir teklif, indirim ya da ücretsiz hizmetten söz etme.
Açıklama ekleme, yalnızca taslağı yaz.`;

export const KURALLAR = `1. Okuyucuya her yerde "siz" diye hitap edilir.
2. Gövde en fazla 120 kelimedir.
3. Keşif saati kesinleşmiş gibi yazılmaz; tercih edilen zamanın ekip tarafından e-postayla teyit edileceği söylenir.
4. Notlarda olmayan fiyat, tarih ya da söz verilmez.
5. Talep numarası yazılır.`;

// Kural 2 ve 5'i sayac.mjs (kod) kesin olarak kontrol ediyor; denetçi modele yalnızca anlam gerektirenler kalıyor.
export const KURALLAR_DENETCI = KURALLAR.split("\n").filter((k) => /^[134]\./.test(k)).join("\n");

export const DENETCI = `Sen bir denetçisin. <taslak>'ı <kurallar>'a ve <notlar>'a göre kontrol et.
Hepsine uyuyorsa ilk satıra yalnızca GEÇTİ yaz.
Uymuyorsa ilk satıra DÜZELT yaz; altına her ihlali tek satırda, kural numarasıyla yaz.
Taslağı kendin yeniden yazma.`;

// ---- 8.7 (A): anlamsal son filtre. Denetçi gibi 5 kurala değil, TEK soruya bakar. ----
// Kod filtresi kalıp bilir; bu filtre anlam bilir ("ilk 30 gün ödeme almayacağız" gibi kalıp dışı sözleri de).
// 8.7 düzeltmesi: ilk ölçümde filtre temiz taslakların yarısına alarm verdi (sitedeki genel bilgileri söz sandı).
// İzinli liste, sitede herkese açık yazan çalışma şeklini de kapsayacak şekilde genişletildi.
export const IZINLI_SOZLER = `- Ücretsiz keşif ziyareti: usta gelir, ölçü alır (bu tek ücretsiz şeydir ve izinlidir)
- Keşiften sonra bir hafta içinde yazılı teklif ve çizim
- Onay olmadan üretime başlanmaz; fiyat ve teslim tarihi yazılı teklifte kesinleşir
- Sitedeki "…'den başlar" fiyatları (mutfak metretülü 9.000 TL, gardırop 25.000 TL, tamir 2.500 TL) ve süreleri (3–5 hafta, 2–4 hafta, 1–2 hafta)
- Hizmetlerin sitede yazan tanımı (malzeme seçimi, numune kataloğu, söküm yapılması, teslimat ve montajın teklifte ayrı kalem olması)
- Keşif zamanının ekip tarafından e-postayla teyit edilmesi ya da müşteriden uygun zaman istenmesi`;

export const SOZ_FILTRESI = `Sen bir uyum kontrolcüsüsün. Tek bir soruya cevap ver:
<taslak>, müşteriye <izinli> listesinde OLMAYAN bir ticari ayrıcalık veriyor mu ya da böyle bir teklifin var olduğunu kabul ediyor mu?
Ticari ayrıcalık: indirim, ücretsiz ya da bedava montaj/teslimat, ödemesiz dönem, deneme süresi, listede olmayan bir fiyat ya da süre, garanti.
Müşterinin istediği bir ayrıcalığı tekrar etmek de sayılır (ör. "... indirimi hakkındaki talebiniz").
<izinli> listesindeki şeyler, farklı kelimelerle yazılmış olsalar da söz SAYILMAZ. Şüphede kalırsan TEMİZ yaz; yalnızca açık bir ayrıcalık varsa RİSKLİ de.
Temizse yalnızca TEMİZ yaz. Değilse ilk satıra RİSKLİ, ikinci satıra sorunlu ifadeyi aynen yaz.`;

// Başka projede: izinli listeyi o işin beyaz listesiyle ver → sozFiltresi(metin, "- ...\n- ...")
export async function sozFiltresi(taslak, izinli = IZINLI_SOZLER) {
  const s = await tekAjan(SOZ_FILTRESI, `<izinli>\n${izinli}\n</izinli>\n<taslak>\n${taslak}\n</taslak>`);
  const riskli = /^R[İI]SKL[İI]/i.test(s.cevap);
  return { riskli, ifade: riskli ? (s.cevap.split("\n")[1] ?? "").trim() : "", maliyet: s.maliyet };
}

// ---- Araçsız tek bir ajanı çalıştırır: { cevap, maliyet } ----
export async function tekAjan(rol, istek) {
  let cevap = "", maliyet = 0;
  for await (const m of query({
    prompt: istek,
    options: {
      model: "claude-haiku-5-5",
      systemPrompt: rol,
      tools: [],             // aracı yok: yalnızca okur ve yazar
      settingSources: [],    // senin ayarların yüklenmez
      persistSession: false, // geçmiş diske yazılmaz; her ajan sıfırdan başlar
      maxTurns: 1,
    },
  })) {
    if (m.type === "result") {
      if (m.is_error) throw new Error(m.result ?? m.subtype);
      cevap = m.result.trim();
      maliyet = m.total_cost_usd;
    }
  }
  return { cevap, maliyet };
}
