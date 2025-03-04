using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "Title must have at least 2 characters")]
        public required string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Description must have at least 5 characters")]
        public required string Description { get; set; }

        [System.ComponentModel.DefaultValue(false)]
        public bool IsCompleted { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime EditedDate {  get; set; } = DateTime.Now;
        public int UserId { get; set; }
        public int Priority { get; set; }
        public DateTime DueDate { get; set; }
        public string AssignUser { get; set; }
        public bool IsEditActive { get; set; }
        public int ParentTaskId {  get; set; }
    }
}
