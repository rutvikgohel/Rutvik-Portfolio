using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Portfolio.Application.Interfaces;

namespace Portfolio.Infrastructure.Services;

public class EmailService(IConfiguration config, ILogger<EmailService> logger) : IEmailService
{
    private readonly string _smtpHost = config["Email:SmtpHost"] ?? "smtp.gmail.com";
    private readonly int _smtpPort = int.Parse(config["Email:SmtpPort"] ?? "587");
    private readonly string _smtpUser = config["Email:SmtpUser"] ?? "";
    private readonly string _smtpPass = config["Email:SmtpPass"] ?? "";
    private readonly string _ownerEmail = config["Email:OwnerEmail"] ?? "rutvikgohel2002@gmail.com";

    public async Task SendContactNotificationAsync(
        string name,
        string email,
        string subject,
        string message,
        CancellationToken cancellationToken = default)
    {
        var body = $"""
            <html>
            <body style="font-family: Inter, sans-serif; background: #030712; color: #ffffff; padding: 32px;">
              <div style="max-width: 600px; margin: 0 auto; background: #0F172A; border: 1px solid #1E293B; border-radius: 16px; padding: 32px;">
                <h2 style="color: #3B82F6; margin-bottom: 24px;">📬 New Contact from Portfolio</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="color: #64748B; padding: 8px 0; font-size: 13px; width: 100px;">Name</td><td style="color: #ffffff; font-weight: 600;">{name}</td></tr>
                  <tr><td style="color: #64748B; padding: 8px 0; font-size: 13px;">Email</td><td style="color: #3B82F6;"><a href="mailto:{email}" style="color: #3B82F6;">{email}</a></td></tr>
                  <tr><td style="color: #64748B; padding: 8px 0; font-size: 13px;">Subject</td><td style="color: #ffffff;">{subject}</td></tr>
                </table>
                <hr style="border: 1px solid #1E293B; margin: 24px 0;" />
                <h3 style="color: #94A3B8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Message</h3>
                <p style="color: #cbd5e1; line-height: 1.7;">{message.Replace("\n", "<br/>")}</p>
                <hr style="border: 1px solid #1E293B; margin: 24px 0;" />
                <p style="color: #475569; font-size: 12px;">Received via rutvikgohel.dev contact form</p>
              </div>
            </body>
            </html>
            """;

        await SendEmailAsync(_ownerEmail, $"[Portfolio] {subject}", body, cancellationToken);
    }

    public async Task SendAutoReplyAsync(
        string toEmail,
        string toName,
        CancellationToken cancellationToken = default)
    {
        var body = $"""
            <html>
            <body style="font-family: Inter, sans-serif; background: #030712; color: #ffffff; padding: 32px;">
              <div style="max-width: 600px; margin: 0 auto; background: #0F172A; border: 1px solid #1E293B; border-radius: 16px; padding: 32px;">
                <h2 style="color: #ffffff; margin-bottom: 8px;">Hey {toName}, got your message!</h2>
                <p style="color: #94A3B8; line-height: 1.7;">Thanks for reaching out. I've received your message and will get back to you within 24 hours.</p>
                <p style="color: #94A3B8; line-height: 1.7;">In the meantime, feel free to connect with me on <a href="https://linkedin.com/in/rutik-gohel-a8215a340" style="color: #3B82F6;">LinkedIn</a>.</p>
                <hr style="border: 1px solid #1E293B; margin: 24px 0;" />
                <p style="color: #64748B; font-size: 12px;">— Rutvik Gohel | Full Stack Developer | Ahmedabad, India</p>
              </div>
            </body>
            </html>
            """;

        await SendEmailAsync(toEmail, "Got your message — Rutvik Gohel", body, cancellationToken);
    }

    private async Task SendEmailAsync(string to, string subject, string htmlBody, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_smtpUser))
        {
            logger.LogWarning("SMTP not configured. Email to {To} not sent.", to);
            return;
        }

        try
        {
            using var client = new SmtpClient(_smtpHost, _smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_smtpUser, _smtpPass),
            };

            using var mail = new MailMessage(_smtpUser, to, subject, htmlBody)
            {
                IsBodyHtml = true,
            };

            await client.SendMailAsync(mail, cancellationToken);
            logger.LogInformation("Email sent to {To}", to);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send email to {To}", to);
        }
    }
}
