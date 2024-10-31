using Microsoft.EntityFrameworkCore;
using CustomerEntity = Customer.Core.Entities.Customers;

namespace Customer.Data
{
    public class CustomerContext : DbContext
    {
        public DbSet<CustomerEntity> Customers { get; set; }

        public CustomerContext(DbContextOptions<CustomerContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerEntity>().HasKey(c => c.Id);
        }
    }
}
