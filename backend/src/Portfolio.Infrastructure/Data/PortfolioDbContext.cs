using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data;

public class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<PageVisit> PageVisits => Set<PageVisit>();
    public DbSet<ResumeDownload> ResumeDownloads => Set<ResumeDownload>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<ContactMessage>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.Property(x => x.Email).HasMaxLength(200).IsRequired();
            e.Property(x => x.Subject).HasMaxLength(200).IsRequired();
            e.Property(x => x.Message).HasMaxLength(5000).IsRequired();
            e.Property(x => x.IpAddress).HasMaxLength(50);
            e.Property(x => x.UserAgent).HasMaxLength(500);
            e.HasIndex(x => x.CreatedAt);
            e.HasIndex(x => x.IsRead);
        });

        builder.Entity<PageVisit>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Page).HasMaxLength(200).IsRequired();
            e.Property(x => x.Referrer).HasMaxLength(500);
            e.Property(x => x.IpAddress).HasMaxLength(50);
            e.Property(x => x.UserAgent).HasMaxLength(500);
            e.Property(x => x.Country).HasMaxLength(100);
            e.HasIndex(x => x.VisitedAt);
            e.HasIndex(x => x.Page);
        });

        builder.Entity<ResumeDownload>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.IpAddress).HasMaxLength(50);
            e.Property(x => x.UserAgent).HasMaxLength(500);
            e.Property(x => x.Referrer).HasMaxLength(500);
            e.HasIndex(x => x.DownloadedAt);
        });
    }
}
