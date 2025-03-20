
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace InventoryApi.Models
{
    public class InventoryTransaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("productId")]
        public string ProductId { get; set; }

        [BsonElement("type")]
        public string Type { get; set; } // 'purchase', 'sale', or 'adjustment'

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("date")]
        public DateTime Date { get; set; }

        [BsonElement("notes")]
        public string Notes { get; set; }
    }
}
