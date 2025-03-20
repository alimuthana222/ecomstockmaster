
using InventoryApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryApi.Services
{
    public class SupplierService
    {
        private readonly IMongoCollection<Supplier> _suppliersCollection;

        public SupplierService(IOptions<InventoryDatabaseSettings> inventoryDatabaseSettings)
        {
            var mongoClient = new MongoClient(inventoryDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(inventoryDatabaseSettings.Value.DatabaseName);
            _suppliersCollection = mongoDatabase.GetCollection<Supplier>(inventoryDatabaseSettings.Value.SuppliersCollectionName);
        }

        public async Task<List<Supplier>> GetAsync() =>
            await _suppliersCollection.Find(_ => true).ToListAsync();

        public async Task<Supplier?> GetAsync(string id) =>
            await _suppliersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            
        public async Task<Supplier?> GetByProductAsync(string productId) =>
            await _suppliersCollection.Find(x => x.Products.Contains(productId)).FirstOrDefaultAsync();

        public async Task CreateAsync(Supplier newSupplier) =>
            await _suppliersCollection.InsertOneAsync(newSupplier);

        public async Task UpdateAsync(string id, Supplier updatedSupplier) =>
            await _suppliersCollection.ReplaceOneAsync(x => x.Id == id, updatedSupplier);

        public async Task RemoveAsync(string id) =>
            await _suppliersCollection.DeleteOneAsync(x => x.Id == id);
    }
}
