using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IContactRepository
{
    Task SaveAsync(ContactMessage message, CancellationToken cancellationToken = default);
    Task<IEnumerable<ContactMessage>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ContactMessage?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task MarkAsReadAsync(Guid id, CancellationToken cancellationToken = default);
}
