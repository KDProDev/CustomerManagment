using Customer.Core.Entities;
using Customer.Data;
using Customer.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Customer.Tests
{
    public class CustomerRepositoryTests
    {
        private readonly CustomerContext _context;
        private readonly CustomerRepository _repository;

        public CustomerRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<CustomerContext>()
                .UseInMemoryDatabase(databaseName: "CustomerDatabase")
                .Options;

            _context = new CustomerContext(options);
            _repository = new CustomerRepository(_context);
        }

        [Fact]
        public async Task AddCustomer_ShouldAddCustomer()
        {
            // Arrange
            var customer = new Customers { FirstName = "John", LastName = "Doe", Email = "johndoe@example.com" };

            // Act
            await _repository.AddAsync(customer);

            // Assert
            Assert.Equal(1, await _context.Customers.CountAsync());
        }

        [Fact]
        public async Task GetCustomer_ShouldReturnCustomer()
        {
            // Arrange
            var customer = new Customers { FirstName = "Jane", LastName = "Smith", Email = "janesmith@example.com" };
            await _repository.AddAsync(customer);

            // Act
            var retrievedCustomer = await _repository.GetByIdAsync(customer.Id);

            // Assert
            Assert.Equal(customer.Email, retrievedCustomer.Email);
        }

        
    }
}
