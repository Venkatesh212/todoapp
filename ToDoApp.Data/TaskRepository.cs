using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Data.Contract;

namespace ToDoApp.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ToDoAppDbContext _context;
        public TaskRepository(ToDoAppDbContext context)
        {
            _context = context;
        }
        public void Add(Entities.Task task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(e => e.Id == id && e.IsDeleted == false);
            task!.IsDeleted = true;
            _context.SaveChanges();
        }

        public Entities.Task GetById(int id)
        {
            var taskEntity = _context.Tasks.FirstOrDefault(e => e.IsDeleted == false && e.Id == id);
            if (taskEntity != null)
            {
                return taskEntity;
            }
            return null;
        }

        public List<Entities.Task> GetAll(int userId)
        {
            return _context.Tasks.Where(e => e.IsDeleted == false && (e.UserId == userId || e.AssignUser == userId)).ToList();
        }

        public void Update(int id, Entities.Task task)
        {
            var taskEntity = _context.Tasks.FirstOrDefault(e => e.Id == id && e.IsDeleted == false);
            if (taskEntity != null)
            {
                taskEntity.ParentTaskId = task.ParentTaskId;
                taskEntity.AssignUser = task.AssignUser;
                taskEntity.CreatedDate = taskEntity.CreatedDate;
                taskEntity.UserId = taskEntity.UserId;
                taskEntity.Id = id;
                taskEntity.IsDeleted = task.IsDeleted;
                taskEntity.IsCompleted = task.IsCompleted;
                taskEntity.Description = task.Description;
                taskEntity.Title = task.Title;
                taskEntity.EditedDate = task.EditedDate;
                taskEntity.DueDate = task.DueDate;
                taskEntity.Priority = task.Priority;    
                _context.SaveChanges();
            }
        }
        public bool GetByTitle(string name,int userId)
        {
            var task = _context.Tasks.FirstOrDefault(e=>e.Title == name && e.UserId == userId && e.IsDeleted==false);
            if ( task != null )
            {
                return true;
            }
            return false;
        }
    }
}
