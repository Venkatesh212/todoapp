using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Domain.Contract
{
    public interface IUserService
    {
        Login Get(Login user);
        string Add(Register item);
        List<Models.User> GetAll();
    }
}
