using System.Text.RegularExpressions;
using Anthropic;
using Anthropic.Models.Messages;

// Kullanım: dotnet run -- "soru"   (model: claude-haiku-5-5)
var soru = args.Length > 0 ? args[0] : "Fiyatlarınız ne kadar?";
var model = "claude-haiku-5-5";

// 1) Talimat: senin yazdığın kurallar (talimat.txt, bu klasörde).
var talimat = File.ReadAllText("talimat.txt");

// 2) Site bilgisi: canlı sitenin metni (yalnız okunur; HTML etiketleri ve CSS atılır).
//    Yol göreli: repodaki kod/ornek-veri/site-index.html (kendi sitenle denemek için değiştir).
var proje = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", ".."));
var siteYolu = new[] { @"..\ornek-veri\site-index.html" }
    .Select(y => Path.GetFullPath(Path.Combine(proje, y))).First(File.Exists);
var html = File.ReadAllText(siteYolu);
html = Regex.Replace(html, @"<(style|script)[\s\S]*?</\1>", " ");
var siteMetni = Regex.Replace(Regex.Replace(html, "<[^>]+>", " "), @"\s+", " ").Trim();

AnthropicClient client = new();

var response = await client.Messages.Create(new MessageCreateParams
{
    Model = model,
    MaxTokens = 1024,
    // Sabit kısım önce: talimat + site bilgisi. Önbelleğe (cache) bu girer.
    System = new List<TextBlockParam>
    {
        new()
        {
            Text = talimat + "\n\n<site_bilgisi>\n" + siteMetni + "\n</site_bilgisi>",
            CacheControl = new CacheControlEphemeral(),
        },
    },
    // Değişen kısım sonra: ziyaretçinin sorusu.
    Messages = [new UserMessageParam { Content = soru }],
});

foreach (var text in response.Content.Select(b => b.Value).OfType<TextBlock>())
    Console.WriteLine(text.Text);

var u = response.Usage;
Console.WriteLine();
Console.WriteLine($"Normal giden: {u.InputTokens}, önbelleğe yazılan: {u.CacheCreationInputTokens}, önbellekten okunan: {u.CacheReadInputTokens}, gelen: {u.OutputTokens}");