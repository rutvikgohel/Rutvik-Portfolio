namespace Portfolio.Domain.Entities;

public class PageVisit
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Page { get; set; }
    public string? Referrer { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? Country { get; set; }
    public DateTime VisitedAt { get; set; } = DateTime.UtcNow;
    public int DurationSeconds { get; set; }
}
