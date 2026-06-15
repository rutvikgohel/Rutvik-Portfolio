using MediatR;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Features.Analytics.Commands;

public class TrackVisitHandler(IAnalyticsRepository analyticsRepository)
    : IRequestHandler<TrackVisitCommand>
{
    public async Task Handle(TrackVisitCommand request, CancellationToken cancellationToken)
    {
        var visit = new PageVisit
        {
            Page = request.Page,
            Referrer = request.Referrer,
            IpAddress = request.IpAddress,
            UserAgent = request.UserAgent,
        };
        await analyticsRepository.TrackVisitAsync(visit, cancellationToken);
    }
}

public class TrackResumeDownloadHandler(IAnalyticsRepository analyticsRepository)
    : IRequestHandler<TrackResumeDownloadCommand>
{
    public async Task Handle(TrackResumeDownloadCommand request, CancellationToken cancellationToken)
    {
        var download = new ResumeDownload
        {
            IpAddress = request.IpAddress,
            UserAgent = request.UserAgent,
            Referrer = request.Referrer,
        };
        await analyticsRepository.TrackResumeDownloadAsync(download, cancellationToken);
    }
}
