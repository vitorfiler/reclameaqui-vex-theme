using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    public class HomeReturn
    {
        public List<Locations> locations { get; set; }
        public List<Vendedor> agents { get; set; }
        public List<Propertie> properties { get; set; }
    }
}
