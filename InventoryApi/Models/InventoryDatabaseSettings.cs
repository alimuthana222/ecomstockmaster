
namespace InventoryApi.Models
{
    public class InventoryDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string ProductsCollectionName { get; set; } = null!;
        public string SuppliersCollectionName { get; set; } = null!;
        public string TransactionsCollectionName { get; set; } = null!;
    }
}
