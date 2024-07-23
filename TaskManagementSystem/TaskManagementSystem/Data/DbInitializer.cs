using System;
using System.Linq;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any() || context.Tasks.Any())
            {
                return; // Database has been seeded
            }

            // Add Users
            var users = new User[]
            {
                new User { Name = "Alice", Password = "password123", Role = "Employee" },
                new User { Name = "Bob", Password = "password123", Role = "TeamLeader" },
                new User { Name = "Charlie", Password = "password123", Role = "Admin" }
            };
            foreach (var u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();

            // Add Tasks
            var tasks = new TaskManagementSystem.Models.Task[]
            {
                new TaskManagementSystem.Models.Task { Title = "Task 1", Description = "Description 1", DueDate = DateTime.Now.AddDays(7), UserId = users[0].Id },
                new TaskManagementSystem.Models.Task { Title = "Task 2", Description = "Description 2", DueDate = DateTime.Now.AddDays(14), UserId = users[0].Id },
                new TaskManagementSystem.Models.Task { Title = "Task 3", Description = "Description 3", DueDate = DateTime.Now.AddDays(30), UserId = users[1].Id }
            };
            foreach (var t in tasks)
            {
                context.Tasks.Add(t);
            }
            context.SaveChanges();
        }
    }
}
