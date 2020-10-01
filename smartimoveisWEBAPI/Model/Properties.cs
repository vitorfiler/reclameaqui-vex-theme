using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartImoveisWebAPI.Model
{
    public class Location
    {
        public string lat { get; set; }
        public string lng { get; set; }
    }

    public class PriceDollar
    {
        public decimal sale { get; set; }
        public decimal rent { get; set; }
    }

    public class PriceEuro
    {
        public decimal sale { get; set; }
        public decimal rent { get; set; }
    }

    public class Area
    {
        public int value { get; set; }
        public string unit { get; set; }
    }

    public class AdditionalFeature
    {
        public string name { get; set; }
        public string value { get; set; }
    }

    public class Gallery
    {
        public string small { get; set; }
        public string medium { get; set; }
        public string big { get; set; }
    }

    public class Area2
    {
        public int value { get; set; }
        public string unit { get; set; }
    }

    public class Plan
    {
        public string name { get; set; }
        public string desc { get; set; }
        public Area2 area { get; set; }
        public int rooms { get; set; }
        public int baths { get; set; }
        public string image { get; set; }
    }

    public class Video
    {
        public string name { get; set; }
        public string link { get; set; }
    }

    public class Propertie
    {
        public long id { get; set; }
        public string title { get; set; }
        public string reference { get; set; }
        public string desc { get; set; }
        public string propertyType { get; set; }
        public List<string> propertyStatus { get; set; }
        public string city { get; set; }
        public string zipCode { get; set; }
        public List<string> neighborhood { get; set; }
        public List<string> street { get; set; }
        public Location location { get; set; }
        public string formattedAddress { get; set; }
        public List<string> features { get; set; }
        public bool featured { get; set; }
        public PriceDollar priceDollar { get; set; }
        public PriceEuro priceEuro { get; set; }
        public int bedrooms { get; set; }
        public int bathrooms { get; set; }
        public int garages { get; set; }
        public Area area { get; set; }
        public int yearBuilt { get; set; }
        public int ratingsCount { get; set; }
        public int ratingsValue { get; set; }
        public List<AdditionalFeature> additionalFeatures { get; set; }
        public List<Gallery> gallery { get; set; }
        public List<Plan> plans { get; set; }
        public List<Video> videos { get; set; }
        public string published { get; set; }
        public string lastUpdate { get; set; }
        public int views { get; set; }
    }

    public class Properties
    {
        public List<Propertie> ListProperties { get; set; }
    }

}
