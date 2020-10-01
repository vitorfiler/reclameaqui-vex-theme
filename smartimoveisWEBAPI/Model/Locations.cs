using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartImoveisWebAPI.Model
{
    public class Locations
    {
        public long id { get; set; }
        public long propertyId { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
    }

}
