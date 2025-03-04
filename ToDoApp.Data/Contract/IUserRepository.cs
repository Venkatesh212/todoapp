using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Data.Entities;

namespace ToDoApp.Data.Contract
{
    public interface IUserRepository
    {
        User Get(User user);
        void Add(User item);
        bool GetByName(string name);
        List<User> GetAll();
    }
}
