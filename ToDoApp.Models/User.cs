using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
    }
}
