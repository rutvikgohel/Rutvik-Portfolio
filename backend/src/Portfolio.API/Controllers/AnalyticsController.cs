using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Analytics.Commands;
using Portfolio.Application.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController(IMediator mediator, IAnalyticsRepository analyticsRepository) : ControllerBase
{
    [HttpPost("visit")]
    public async Task<IActionResult> TrackVisit([FromBody] TrackVisitRequest request)
    {
        var command = new TrackVisitCommand(
            Page: request.Page,
            Referrer: request.Referrer,
            IpAddress: HttpContext.Connection.RemoteIpAddress?.ToString(),
            UserAgent: Request.Headers.UserAgent.ToString()
        );
        await mediator.Send(command);
        return Ok();
    }

    [HttpPost("resume-download")]
    public async Task<IActionResult> TrackResumeDownload()
    {
        var command = new TrackResumeDownloadCommand(
            IpAddress: HttpContext.Connection.RemoteIpAddress?.ToString(),
            UserAgent: Request.Headers.UserAgent.ToString(),
            Referrer: Request.Headers.Referer.ToString()
        );
        await mediator.Send(command);
        return Ok();
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var visits = await analyticsRepository.GetTotalVisitsAsync();
        var downloads = await analyticsRepository.GetResumeDownloadCountAsync();
        return Ok(new { totalVisits = visits, resumeDownloads = downloads });
    }
}

public record TrackVisitRequest(string Page, string? Referrer);
