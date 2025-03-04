using Microsoft.AspNetCore.Components.Forms;
using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Api.Models
{
    public class Task
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(35, MinimumLength = 2, ErrorMessage = "Title must have at least 2 characters")]
        public required string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(80, MinimumLength = 5, ErrorMessage = "Description must have at least 5 characters")]
        public required string Description { get; set; }

        [System.ComponentModel.DefaultValue(false)]
        public bool IsCompleted { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime EditedDate { get; set; } = DateTime.Now;
       
        [System.ComponentModel.DefaultValue(0)]
        public required int Priority{ get; set; }
        public DateTime DueDate { get; set; } = DateTime.Now;
        public int AssignUser {  get; set; }
        public int ParentTaskId { get; set; }
    }
}
