using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<TaskAttachment> TaskAttachments { get; set; }
        public ICollection<TaskNote> TaskNotes { get; set; }
    }
}
