// Ders 8.5: Agent SDK ile müşteri ajanı.
// 8.3'te ajan döngüsünü (istek → tool_use → aracı çalıştır → tool_result → tekrar) kendimiz yazmıştık.
// Burada döngüyü Agent SDK yürütüyor; araç da 8.4'teki MCP sunucusundan geliyor.
import { query } from "@anthropic-ai/claude-agent-sdk";
import readline from "node:readline/promises";
import { anahtarKontrol, musteriAjaniAyarlari } from "./ortak.mjs"; // talimat, site metni, MCP, emniyet kemerleri

anahtarKontrol();

// 8.7: araç allowedTools'ta DEĞİL. Her çağrı önce bu izin fonksiyonuna (2. kapıya) gelir.
// Özeti MODEL değil KOD gösterir, cevabı KOD okur: model kandırılsa bile onaysız kayıt açılamaz.
const ayarlar = musteriAjaniAyarlari(async (aracAdi, girdi) => {
    if (aracAdi !== "mcp__randevu__randevu_kaydet") {
      return { behavior: "deny", message: "Bu araç kullanılamaz." };
    }
    console.log("\n[ONAY - program soruyor, model değil]");
    console.log(`  Ad:     ${girdi.ad}`);
    console.log(`  E-posta: ${girdi.eposta}`);
    console.log(`  Konu:   ${girdi.konu}`);
    console.log(`  Tercih: ${girdi.tercih ?? "-"}`);
    const cevap = (await rl.question("Bu bilgilerle kaydedilsin mi? (e/h): ").catch(() => "")).trim().toLowerCase();
    if (cevap === "e" || cevap === "evet") return { behavior: "allow", updatedInput: girdi };
    return { behavior: "deny", message: "Müşteri kaydı onaylamadı. Kayıt açılmadı; neyi değiştirmek istediğini sor." };
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let oturumNo; // ilk turdan sonra dolar; sonraki turlar aynı konuşmaya devam eder

console.log("Müşteri ajanı hazır. Çıkmak için boş satır gönder.\n");
while (true) {
  const soru = (await rl.question("Siz: ").catch(() => "")).trim();
  if (!soru) break;

  try {
  for await (const mesaj of query({ prompt: soru, options: { ...ayarlar, resume: oturumNo } })) {
    if (mesaj.type === "system" && mesaj.subtype === "init") {
      oturumNo = mesaj.session_id;
    } else if (mesaj.type === "assistant") {
      for (const blok of mesaj.message.content) {
        if (blok.type === "text") console.log(`\nAsistan: ${blok.text}`);
        if (blok.type === "tool_use") console.log(`\n[ARAÇ İSTEĞİ] ${blok.name} ${JSON.stringify(blok.input)}`);
      }
    } else if (mesaj.type === "result" && !mesaj.is_error) {
      console.log(`\n[tur bitti: model turu ${mesaj.num_turns}, bu oturumun toplam tahmini maliyeti $${mesaj.total_cost_usd.toFixed(4)}]\n`);
    }
  }
  } catch (hata) {
    console.error(`\n[HATA] ${hata.message.split("\n")[0]}\n`);
  }
}
rl.close();
