
using InventoryApi.Models;
using InventoryApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuppliersController : ControllerBase
    {
        private readonly SupplierService _supplierService;

        public SuppliersController(SupplierService supplierService) =>
            _supplierService = supplierService;

        [HttpGet]
        public async Task<List<Supplier>> Get() =>
            await _supplierService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Supplier>> Get(string id)
        {
            var supplier = await _supplierService.GetAsync(id);

            if (supplier is null)
                return NotFound();

            return supplier;
        }
        
        [HttpGet("product/{productId:length(24)}")]
        public async Task<ActionResult<Supplier>> GetByProduct(string productId)
        {
            var supplier = await _supplierService.GetByProductAsync(productId);

            if (supplier is null)
                return NotFound();

            return supplier;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Supplier newSupplier)
        {
            await _supplierService.CreateAsync(newSupplier);

            return CreatedAtAction(nameof(Get), new { id = newSupplier.Id }, newSupplier);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Supplier updatedSupplier)
        {
            var supplier = await _supplierService.GetAsync(id);

            if (supplier is null)
                return NotFound();

            updatedSupplier.Id = supplier.Id;

            await _supplierService.UpdateAsync(id, updatedSupplier);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var supplier = await _supplierService.GetAsync(id);

            if (supplier is null)
                return NotFound();

            await _supplierService.RemoveAsync(id);

            return NoContent();
        }
    }
}
