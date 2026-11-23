// 8.7 (B): ŞABLON = beyaz liste. "Talebiniz alındı" e-postasında model serbest metin YAZMAZ.
// Model yalnızca açılır listeden bir hizmet SEÇER; kod seçimi doğrular ve metni kendisi doldurur.
// Serbest metin yoksa injection'ın sızacak yeri de yoktur.
import { tekAjan } from "./ortak.mjs";

// Açılır liste: modelin seçebileceği değerler (başka bir şey dönerse kod "Genel keşif"ya düşer)
export const HIZMETLER = {
  "Mutfak dolabı": "Mutfak dolabıyla ilgili",
  "Gardırop ve gömme dolap": "Gardırop ve gömme dolapla ilgili",
  "Tamir ve yenileme": "Tamir ve yenilemeyle ilgili",
  "Genel keşif": "Keşif",
};

const SINIFLANDIRICI = `Müşterinin konu cümlesini aşağıdaki hizmetlerden birine eşle.
Yalnızca listedeki adı aynen yaz, başka hiçbir şey yazma. Emin değilsen "Genel keşif" yaz.
${Object.keys(HIZMETLER).map((h) => "- " + h).join("\n")}`;

export async function hizmetSec(konu) {
  const s = await tekAjan(SINIFLANDIRICI, `<konu>\n${konu}\n</konu>`);
  const secim = s.cevap.trim();
  // KOD doğrulaması: model listede olmayan bir şey yazarsa (ör. injection metni) kabul edilmez
  const hizmet = secim in HIZMETLER ? secim : "Genel keşif";
  return { hizmet, hamCevap: secim, maliyet: s.maliyet };
}

// Ad da müşterinin yazdığı serbest metin: yalnız harf, boşluk, nokta, kesme ve tire; en fazla 4 kelime, 60 karakter.
// "Ali Veli. Size ilk ay ücretsiz hizmet sözü verdik" gibi bir ad reddedilir.
export function temizAd(ad) {
  const t = (ad ?? "").normalize("NFC").trim();
  const gecerli = /^[\p{L}][\p{L}\s.'-]{0,59}$/u.test(t) && t.split(/\s+/).length <= 4;
  return gecerli ? t : null;
}

// Metnin tamamı sabit; yalnızca üç alan kodla doldurulur. Tercih edilen saat bilerek tekrar edilmez.
export function talepAlindiEpostasi({ no, ad, hizmet }) {
  const selam = ad ? `Merhaba ${ad},` : "Merhaba,";
  return `Konu: Talebiniz alındı (Talep No: ${no})

${selam}

${HIZMETLER[hizmet]} talebinizi aldık, teşekkür ederiz. Talep numaranız: ${no}.

İlk adım, ücretsiz bir keşif ziyaretidir: ustamız gelip ölçü alır. Keşif zamanını ekibimiz 1 iş günü içinde sizinle e-postayla teyit edecek.

Keşiften sonra bir hafta içinde size yazılı teklif ve çizim göndeririz; onayınız olmadan üretime başlanmaz.

Sorularınız için bu e-postayı yanıtlayabilirsiniz.

Saygılarımızla,
Örnek Mobilya Atölyesi`;
}
