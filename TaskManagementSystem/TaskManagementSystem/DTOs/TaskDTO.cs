﻿namespace TaskManagementSystem.DTOs
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
    }
}
