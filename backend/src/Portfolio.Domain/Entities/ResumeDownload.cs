namespace Portfolio.Domain.Entities;

public class ResumeDownload
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? Referrer { get; set; }
    public DateTime DownloadedAt { get; set; } = DateTime.UtcNow;
}
