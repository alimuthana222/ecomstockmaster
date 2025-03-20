
using InventoryApi.Models;
using InventoryApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionsController(TransactionService transactionService) =>
            _transactionService = transactionService;

        [HttpGet]
        public async Task<List<InventoryTransaction>> Get() =>
            await _transactionService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<InventoryTransaction>> Get(string id)
        {
            var transaction = await _transactionService.GetAsync(id);

            if (transaction is null)
                return NotFound();

            return transaction;
        }
        
        [HttpGet("product/{productId:length(24)}")]
        public async Task<List<InventoryTransaction>> GetByProduct(string productId) =>
            await _transactionService.GetByProductAsync(productId);

        [HttpPost]
        public async Task<IActionResult> Post(InventoryTransaction newTransaction)
        {
            await _transactionService.CreateAsync(newTransaction);

            return CreatedAtAction(nameof(Get), new { id = newTransaction.Id }, newTransaction);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, InventoryTransaction updatedTransaction)
        {
            var transaction = await _transactionService.GetAsync(id);

            if (transaction is null)
                return NotFound();

            updatedTransaction.Id = transaction.Id;

            await _transactionService.UpdateAsync(id, updatedTransaction);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var transaction = await _transactionService.GetAsync(id);

            if (transaction is null)
                return NotFound();

            await _transactionService.RemoveAsync(id);

            return NoContent();
        }
    }
}
