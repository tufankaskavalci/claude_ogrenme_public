// Ders 8.6: zincirdeki KOD kutusu. Model yok, API yok, ücret yok; sonuç kesin.
// Kural 2: gövde en fazla 120 kelime.  Kural 5: talep numarası yazılmış.
// Dönüş: hata listesi. Boş liste = geçti.
export function sayac(taslak, talepNo) {
  const satirlar = taslak.trim().split(/\r?\n/);
  const govde = satirlar.filter((s) => !/^\s*Konu\s*:/i.test(s)).join(" ");
  // içinde harf ya da rakam olan parçalar kelimedir ("-" madde işareti sayılmaz)
  const kelime = govde.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;

  // "2026" içindeki 2'yi saymasın diye: "Talep No: 2" ya da "talep numaranız 2" gibi kalıplar
  const noVar = new RegExp(`talep\\s*(no|numara\\S*)\\s*:?\\s*${talepNo}\\b`, "i").test(taslak);

  // 8.7: kural 4'ün kodla yakalanabilen kısmı: riskli söz ifadeleri.
  // "ücretsiz bir keşif ziyareti" serbest; ücretsiz/bedava + ay/hizmet/montaj/teslimat/teklif, indirim ve yüzde yakalanır.
  const riskli = taslak.match(/(ücretsiz|bedava)\s+(ilk\s+)?(ay|hizmet|montaj|teslimat|nakliye|teklif)\S*|ilk ay(?:\s+\S+){0,2}\s+(ücretsiz|bedava)|indirim\S*|%\s*\d+|\d+\s*%/i);

  const hatalar = [];
  if (riskli) hatalar.push(`- Kural 4 (kod): "${riskli[0]}" ifadesi bir söz gibi okunuyor; kaldır, sitede olmayan teklif yazma.`);
  if (kelime > 120) hatalar.push(`- Kural 2: gövde ${kelime} kelime; ${kelime - 120} kelime kısalt (sınır 120).`);
  if (!noVar) hatalar.push(`- Kural 5: talep numarası (${talepNo}) yazılmamış; "Talep No: ${talepNo}" ekle.`);
  return { kelime, noVar, riskli: riskli?.[0] ?? null, hatalar };
}
