using MediatR;
using Microsoft.Extensions.Logging;
using Portfolio.Application.Common;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Features.Contact.Commands;

public class SendContactMessageHandler(
    IContactRepository contactRepository,
    IEmailService emailService,
    ILogger<SendContactMessageHandler> logger
) : IRequestHandler<SendContactMessageCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(SendContactMessageCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var message = new ContactMessage
            {
                Name = request.Name,
                Email = request.Email,
                Subject = request.Subject,
                Message = request.Message,
                IpAddress = request.IpAddress,
                UserAgent = request.UserAgent,
            };

            await contactRepository.SaveAsync(message, cancellationToken);

            await emailService.SendContactNotificationAsync(
                name: request.Name,
                email: request.Email,
                subject: request.Subject,
                message: request.Message,
                cancellationToken: cancellationToken
            );

            await emailService.SendAutoReplyAsync(
                toEmail: request.Email,
                toName: request.Name,
                cancellationToken: cancellationToken
            );

            logger.LogInformation("Contact message received from {Email}", request.Email);
            return BaseResponse.Ok("Message sent successfully.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to process contact message from {Email}", request.Email);
            return BaseResponse.Fail("Failed to send message. Please try again or contact via email.");
        }
    }
}
