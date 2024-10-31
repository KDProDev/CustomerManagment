// Alias for the Customer entity in Customer.Core.Entities
using CustomerEntity = Customer.Core.Entities.Customers;
using Customer.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Customer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _repository;

        public CustomersController(ICustomerRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Customers with pagination
        [HttpGet]
        [HttpGet]
        public async Task<ActionResult> GetCustomers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var customers = await _repository.GetAllPaginatedAsync(pageNumber, pageSize);
            var totalCount = await _repository.GetTotalCountAsync();

            // Return both paginated customers and total count in a structured object
            return Ok(new { customers, total = totalCount });
        }
        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerEntity>> GetCustomer(int id)
        {
            var customer = await _repository.GetByIdAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult> CreateCustomer([FromBody] CustomerEntity customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _repository.AddAsync(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CustomerEntity customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.Id)
            {
                return BadRequest("Customer ID in the URL does not match the ID in the request body.");
            }

            await _repository.UpdateAsync(customer);
            return NoContent();
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _repository.GetByIdAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
