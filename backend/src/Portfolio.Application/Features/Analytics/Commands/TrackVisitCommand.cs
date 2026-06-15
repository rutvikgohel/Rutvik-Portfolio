using MediatR;

namespace Portfolio.Application.Features.Analytics.Commands;

public record TrackVisitCommand(
    string Page,
    string? Referrer,
    string? IpAddress,
    string? UserAgent
) : IRequest;

public record TrackResumeDownloadCommand(
    string? IpAddress,
    string? UserAgent,
    string? Referrer
) : IRequest;
