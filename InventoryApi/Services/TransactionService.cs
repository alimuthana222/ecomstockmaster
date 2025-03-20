
using InventoryApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryApi.Services
{
    public class TransactionService
    {
        private readonly IMongoCollection<InventoryTransaction> _transactionsCollection;
        private readonly ProductService _productService;

        public TransactionService(
            IOptions<InventoryDatabaseSettings> inventoryDatabaseSettings,
            ProductService productService)
        {
            var mongoClient = new MongoClient(inventoryDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(inventoryDatabaseSettings.Value.DatabaseName);
            _transactionsCollection = mongoDatabase.GetCollection<InventoryTransaction>(
                inventoryDatabaseSettings.Value.TransactionsCollectionName);
            _productService = productService;
        }

        public async Task<List<InventoryTransaction>> GetAsync() =>
            await _transactionsCollection.Find(_ => true).ToListAsync();

        public async Task<InventoryTransaction?> GetAsync(string id) =>
            await _transactionsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<InventoryTransaction>> GetByProductAsync(string productId) =>
            await _transactionsCollection.Find(x => x.ProductId == productId).ToListAsync();

        public async Task CreateAsync(InventoryTransaction newTransaction)
        {
            // Set the transaction date if not provided
            if (newTransaction.Date == DateTime.MinValue)
                newTransaction.Date = DateTime.UtcNow;
                
            // Create the transaction record
            await _transactionsCollection.InsertOneAsync(newTransaction);
            
            // Update the product stock quantity
            var product = await _productService.GetAsync(newTransaction.ProductId);
            if (product != null)
            {
                product.StockQuantity += newTransaction.Quantity;
                await _productService.UpdateAsync(product.Id, product);
            }
        }

        public async Task UpdateAsync(string id, InventoryTransaction updatedTransaction)
        {
            var originalTransaction = await GetAsync(id);
            if (originalTransaction != null)
            {
                // Calculate the stock quantity difference
                int quantityDifference = updatedTransaction.Quantity - originalTransaction.Quantity;
                
                // Update the transaction
                await _transactionsCollection.ReplaceOneAsync(x => x.Id == id, updatedTransaction);
                
                // Adjust the product stock if quantity changed
                if (quantityDifference != 0)
                {
                    var product = await _productService.GetAsync(updatedTransaction.ProductId);
                    if (product != null)
                    {
                        product.StockQuantity += quantityDifference;
                        await _productService.UpdateAsync(product.Id, product);
                    }
                }
            }
        }

        public async Task RemoveAsync(string id)
        {
            var transaction = await GetAsync(id);
            if (transaction != null)
            {
                // Reverse the effect on stock quantity
                var product = await _productService.GetAsync(transaction.ProductId);
                if (product != null)
                {
                    product.StockQuantity -= transaction.Quantity;
                    await _productService.UpdateAsync(product.Id, product);
                }
                
                // Remove the transaction
                await _transactionsCollection.DeleteOneAsync(x => x.Id == id);
            }
        }
    }
}
