using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Data.Entities;
using ToDoApp.Models;
using Task = ToDoApp.Models.Task;

namespace ToDoApp.Domain.Contract
{
    public interface ITaskService
    {
        List<Task> GetAll();
        Task GetTask(int id);
        string Add(Task item);
        string Update(int id,Task task);
        string Delete(int id);
        List<Models.User> GetAllUsers();
    }
}
