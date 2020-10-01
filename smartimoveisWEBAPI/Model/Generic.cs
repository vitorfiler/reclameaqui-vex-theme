using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartImoveisWebAPI.Model
{
    public class Generic
    {
    }
    public class Token
    {
        public string TokenDef { get; set; }
    }
    public class FTP
    {
        public string Host { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}
