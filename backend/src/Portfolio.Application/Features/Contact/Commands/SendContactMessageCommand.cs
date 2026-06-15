using MediatR;
using Portfolio.Application.Common;

namespace Portfolio.Application.Features.Contact.Commands;

public record SendContactMessageCommand(
    string Name,
    string Email,
    string Subject,
    string Message,
    string? IpAddress,
    string? UserAgent
) : IRequest<BaseResponse>;
