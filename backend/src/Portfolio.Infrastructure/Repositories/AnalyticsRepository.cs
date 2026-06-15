using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class AnalyticsRepository(PortfolioDbContext db) : IAnalyticsRepository
{
    public async Task TrackVisitAsync(PageVisit visit, CancellationToken cancellationToken = default)
    {
        db.PageVisits.Add(visit);
        await db.SaveChangesAsync(cancellationToken);
    }

    public async Task TrackResumeDownloadAsync(ResumeDownload download, CancellationToken cancellationToken = default)
    {
        db.ResumeDownloads.Add(download);
        await db.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> GetTotalVisitsAsync(CancellationToken cancellationToken = default) =>
        await db.PageVisits.CountAsync(cancellationToken);

    public async Task<int> GetResumeDownloadCountAsync(CancellationToken cancellationToken = default) =>
        await db.ResumeDownloads.CountAsync(cancellationToken);

    public async Task<IEnumerable<PageVisit>> GetRecentVisitsAsync(int count = 50, CancellationToken cancellationToken = default) =>
        await db.PageVisits
            .OrderByDescending(x => x.VisitedAt)
            .Take(count)
            .ToListAsync(cancellationToken);
}
