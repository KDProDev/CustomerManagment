using Microsoft.EntityFrameworkCore;
using Customer.Core.Entities;
using Customer.Core.Interfaces;

namespace Customer.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CustomerContext _context;

        public CustomerRepository(CustomerContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Customers>> GetAllAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customers> GetByIdAsync(int id)
        {
            return await _context.Customers.FindAsync(id);
        }

        public async Task AddAsync(Customers customer)
        {
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Customers customer)
        {
            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Customers>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            return await _context.Customers
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Customers.CountAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer != null)
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
            }
        }
    }
}
