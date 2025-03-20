
using InventoryApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryApi.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _productsCollection;

        public ProductService(IOptions<InventoryDatabaseSettings> inventoryDatabaseSettings)
        {
            var mongoClient = new MongoClient(inventoryDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(inventoryDatabaseSettings.Value.DatabaseName);
            _productsCollection = mongoDatabase.GetCollection<Product>(inventoryDatabaseSettings.Value.ProductsCollectionName);
        }

        public async Task<List<Product>> GetAsync() =>
            await _productsCollection.Find(_ => true).ToListAsync();

        public async Task<Product?> GetAsync(string id) =>
            await _productsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<Product>> GetLowStockAsync() =>
            await _productsCollection.Find(x => x.StockQuantity < x.ReorderLevel).ToListAsync();

        public async Task CreateAsync(Product newProduct)
        {
            newProduct.CreatedAt = DateTime.UtcNow;
            newProduct.UpdatedAt = DateTime.UtcNow;
            await _productsCollection.InsertOneAsync(newProduct);
        }

        public async Task UpdateAsync(string id, Product updatedProduct)
        {
            updatedProduct.UpdatedAt = DateTime.UtcNow;
            await _productsCollection.ReplaceOneAsync(x => x.Id == id, updatedProduct);
        }

        public async Task RemoveAsync(string id) =>
            await _productsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
