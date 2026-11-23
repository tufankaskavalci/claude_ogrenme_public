using System.Text.Json;
using System.Text.RegularExpressions;
using Anthropic;
using Anthropic.Models.Messages;

// Ders 8.3: araç (tool) kullanan asistan ve ajan döngüsü.
// Çalıştır: dotnet run   (çıkmak için boş satır gönder)

var model = "claude-haiku-5-5";

// Sabit kısım: 8.2'deki talimat + site metni (önbelleğe girer).
// Yollar göreli: proje klasörü = bin\<Debug|Release>\net9.0\ klasörünün üç üstü.
var proje = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", ".."));
string Bul(params string[] adaylar) =>
    adaylar.Select(y => Path.GetFullPath(Path.Combine(proje, y))).First(File.Exists);
var talimat = File.ReadAllText(Bul(@"..\api-deneme\talimat.txt"));
var html = File.ReadAllText(Bul(@"..\ornek-veri\site-index.html"));
html = Regex.Replace(html, @"<(style|script)[\s\S]*?</\1>", " ");
var siteMetni = Regex.Replace(Regex.Replace(html, "<[^>]+>", " "), @"\s+", " ").Trim();

// Aracın tarifi: model yalnız bu tarifi görür, kodun kendisini görmez.
Tool randevuAraci = new()
{
    Name = "randevu_kaydet",
    Description = "Ziyaretçinin ücretsiz keşif (ölçü alma) randevusu talebini kaydeder. "
        + "Ad, e-posta ve konuyu ziyaretçiden öğrenip bilgileri ona özetledikten ve onay aldıktan sonra çağır.",
    InputSchema = new()
    {
        Properties = new Dictionary<string, JsonElement>
        {
            ["ad"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Ziyaretçinin adı soyadı" }),
            ["eposta"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Ziyaretçinin e-posta adresi" }),
            ["konu"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Yaptırmak istediği iş, bir cümle" }),
            ["tercih"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Keşif için tercih ettiği gün/saat; belirtmediyse boş" }),
        },
        Required = ["ad", "eposta", "konu"],
    },
};

// Aracın kendisi: senin kodun. Şimdilik yalnız yerel bir dosyaya yazar, kimseye göndermez.
string RandevuKaydet(IReadOnlyDictionary<string, JsonElement> girdi)
{
    string Al(string k) => girdi.TryGetValue(k, out var v) ? v.ToString().Replace(";", ",") : "";
    var satir = $"{DateTime.Now:yyyy-MM-dd HH:mm};{Al("ad")};{Al("eposta")};{Al("konu")};{Al("tercih")}";
    File.AppendAllLines("randevular.csv", [satir]);
    var no = File.ReadAllLines("randevular.csv").Length;
    return $"Kaydedildi. Talep numarası: {no}. Ekibimiz 1 iş günü içinde e-postayla dönecek.";
}

AnthropicClient client = new();
List<MessageParam> gecmis = [];   // API hatırlamaz; konuşmayı biz tutarız.

Console.WriteLine("Örnek Mobilya Atölyesi asistanı. Sorunuzu yazın (çıkmak için boş satır).");
while (true)
{
    Console.Write("\nSiz: ");
    var soru = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(soru)) break;
    gecmis.Add(new UserMessageParam { Content = soru });

    // Ajan döngüsü: model araç istedikçe çalıştır, sonucu geri ver, tekrar sor.
    while (true)
    {
        var cevap = await client.Messages.Create(new MessageCreateParams
        {
            Model = model,
            MaxTokens = 2048,
            System = new List<TextBlockParam>
            {
                new() { Text = talimat + "\n\n<site_bilgisi>\n" + siteMetni + "\n</site_bilgisi>", CacheControl = new CacheControlEphemeral() },
            },
            Tools = [randevuAraci],
            Messages = gecmis,
        });

        List<ContentBlockParam> asistanParcalari = [];
        List<ContentBlockParam> aracSonuclari = [];
        foreach (var blok in cevap.Content)
        {
            if (blok.TryPickText(out TextBlock? metin))
            {
                Console.WriteLine($"\nAsistan: {metin.Text}");
                asistanParcalari.Add(new TextBlockParam { Text = metin.Text });
            }
            else if (blok.TryPickThinking(out ThinkingBlock? dusunce))
            {
                asistanParcalari.Add(new ThinkingBlockParam { Thinking = dusunce.Thinking, Signature = dusunce.Signature });
            }
            else if (blok.TryPickRedactedThinking(out RedactedThinkingBlock? gizli))
            {
                asistanParcalari.Add(new RedactedThinkingBlockParam { Data = gizli.Data });
            }
            else if (blok.TryPickToolUse(out ToolUseBlock? arac))
            {
                Console.WriteLine($"\n[ARAÇ İSTEĞİ] {arac.Name} {JsonSerializer.Serialize(arac.Input)}");
                asistanParcalari.Add(new ToolUseBlockParam { ID = arac.ID, Name = arac.Name, Input = arac.Input });
                var sonuc = arac.Name == "randevu_kaydet" ? RandevuKaydet(arac.Input) : "Bilinmeyen araç.";
                Console.WriteLine($"[ARAÇ SONUCU] {sonuc}");
                aracSonuclari.Add(new ToolResultBlockParam { ToolUseID = arac.ID, Content = sonuc });
            }
        }
        gecmis.Add(new AssistantMessageParam { Content = asistanParcalari });

        var u = cevap.Usage;
        Console.WriteLine($"   (bitiş: {cevap.StopReason} · giden {u.InputTokens} · önbellek okunan {u.CacheReadInputTokens} · yazılan {u.CacheCreationInputTokens} · gelen {u.OutputTokens})");

        if (aracSonuclari.Count == 0) break;                      // araç istemedi: tur bitti, sıra sizde
        gecmis.Add(new UserMessageParam { Content = aracSonuclari });  // sonucu modele geri ver, döngü sürer
    }
}
