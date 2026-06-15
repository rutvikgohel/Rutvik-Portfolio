using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Features.Contact.Commands;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> SendMessage([FromBody] ContactRequest request)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();

        var command = new SendContactMessageCommand(
            Name: request.Name,
            Email: request.Email,
            Subject: request.Subject,
            Message: request.Message,
            IpAddress: ipAddress,
            UserAgent: userAgent
        );

        var result = await mediator.Send(command);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}

public record ContactRequest(
    string Name,
    string Email,
    string Subject,
    string Message
);
