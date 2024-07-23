using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public int? TeamLeaderId { get; set; }
        public User TeamLeader { get; set; }
        public ICollection<User> TeamMembers { get; set; }

        public ICollection<Task> Tasks { get; set; }
    }
}
