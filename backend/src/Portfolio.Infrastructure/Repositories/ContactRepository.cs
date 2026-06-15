using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ContactRepository(PortfolioDbContext db) : IContactRepository
{
    public async Task SaveAsync(ContactMessage message, CancellationToken cancellationToken = default)
    {
        db.ContactMessages.Add(message);
        await db.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<ContactMessage>> GetAllAsync(CancellationToken cancellationToken = default) =>
        await db.ContactMessages
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task<ContactMessage?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        await db.ContactMessages.FindAsync([id], cancellationToken);

    public async Task MarkAsReadAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var message = await db.ContactMessages.FindAsync([id], cancellationToken);
        if (message is not null)
        {
            message.IsRead = true;
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}
