using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IAnalyticsRepository
{
    Task TrackVisitAsync(PageVisit visit, CancellationToken cancellationToken = default);
    Task TrackResumeDownloadAsync(ResumeDownload download, CancellationToken cancellationToken = default);
    Task<int> GetTotalVisitsAsync(CancellationToken cancellationToken = default);
    Task<int> GetResumeDownloadCountAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<PageVisit>> GetRecentVisitsAsync(int count = 50, CancellationToken cancellationToken = default);
}
