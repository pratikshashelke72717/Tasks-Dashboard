using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class TaskAttachment
    {
        [Key]
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] FileData { get; set; }

        public int TaskId { get; set; }
        public Task Task { get; set; }
    }
}
