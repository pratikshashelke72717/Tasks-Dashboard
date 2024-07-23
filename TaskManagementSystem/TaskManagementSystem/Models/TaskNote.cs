using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class TaskNote
    {
        [Key]
        public int Id { get; set; }
        public string Note { get; set; }

        public int TaskId { get; set; }
        public Task Task { get; set; }
    }
}
