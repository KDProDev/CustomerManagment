using Customer.Core.Entities;

namespace Customer.Core.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customers>> GetAllAsync();
        Task<Customers> GetByIdAsync(int id);
        Task AddAsync(Customers customer);
        Task UpdateAsync(Customers customer);
        Task<int> GetTotalCountAsync();
        Task DeleteAsync(int id);
        Task<IEnumerable<Customers>> GetAllPaginatedAsync(int pageNumber, int pageSize);

    }
}
