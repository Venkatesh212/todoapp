using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = ToDoApp.Data.Entities.Task;

namespace ToDoApp.Data.Contract
{
    public interface ITaskRepository
    {
        List<Task> GetAll(int userId);
        Task GetById(int id);
        void Add(Task item);
        void Update(int id,Task task);
        void Delete(int id);
        bool GetByTitle(string name,int userId);
    }
}
