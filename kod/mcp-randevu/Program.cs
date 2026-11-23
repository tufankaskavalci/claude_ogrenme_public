// Ders 8.4: randevu_kaydet aracını ayrı bir MCP sunucusuna taşıdık.
// Bu program modeli çağırmaz, API anahtarı da istemez.
// Claude Code (ya da başka bir MCP istemcisi) bu programı kendisi başlatır
// ve stdin/stdout üzerinden JSON mesajlarıyla konuşur.
using System.ComponentModel;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

// ÖNEMLİ: stdout protokol hattıdır. Loglar stderr'e gitmeli,
// yoksa istemci bozuk mesaj alır. (Console.WriteLine da kullanma.)
builder.Logging.ClearProviders();
builder.Logging.AddConsole(o => o.LogToStandardErrorThreshold = LogLevel.Trace);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly();

await builder.Build().RunAsync();

[McpServerToolType]
public static class RandevuAraclari
{
    // Göreli yol: proje klasörü = bin\<Debug|Release>\net9.0\ klasörünün üç üstü
    // (Claude Code sunucuyu başka bir klasörden başlatsa da doğru dosyayı bulur).
    static readonly string Dosya = Path.GetFullPath(
        Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "randevular.csv"));

    [McpServerTool(Name = "randevu_kaydet"),
     Description("Ziyaretçinin ücretsiz keşif (ölçü alma) randevusu talebini kaydeder. " +
                 "Ad, e-posta ve konuyu ziyaretçiden öğrenip bilgileri ona özetledikten " +
                 "ve onay aldıktan sonra çağır.")]
    public static string RandevuKaydet(
        [Description("Ziyaretçinin adı soyadı")] string ad,
        [Description("Ziyaretçinin e-posta adresi")] string eposta,
        [Description("Yaptırmak istediği iş, bir cümle")] string konu,
        [Description("Keşif için tercih ettiği gün ve saat, varsa")] string? tercih = null)
    {
        var satir = string.Join(";", DateTime.Now.ToString("yyyy-MM-dd HH:mm"), ad, eposta, konu, tercih ?? "");
        File.AppendAllText(Dosya, satir + Environment.NewLine);
        var no = File.ReadAllLines(Dosya).Count(s => s.Length > 0);
        return $"Kaydedildi. Talep numarası: {no}. Ekibimiz 1 iş günü içinde e-postayla dönecek.";
    }
}
