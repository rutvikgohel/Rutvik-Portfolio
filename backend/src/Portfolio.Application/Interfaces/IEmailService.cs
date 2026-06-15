namespace Portfolio.Application.Interfaces;

public interface IEmailService
{
    Task SendContactNotificationAsync(
        string name,
        string email,
        string subject,
        string message,
        CancellationToken cancellationToken = default
    );

    Task SendAutoReplyAsync(
        string toEmail,
        string toName,
        CancellationToken cancellationToken = default
    );
}
