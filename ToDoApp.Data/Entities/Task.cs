using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Data.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime EditedDate { get; set; }
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int Priority { get; set; } = 0;
        public DateTime DueDate {  get; set; }
        public int AssignUser { get; set; }
        public int ParentTaskId { get; set; }
    }
}
