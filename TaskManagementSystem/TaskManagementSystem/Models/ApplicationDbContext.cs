using Microsoft.EntityFrameworkCore;

namespace TaskManagementSystem.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskAttachment> TaskAttachments { get; set; }
        public DbSet<TaskNote> TaskNotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define relationships and configure the TeamLeader-Employee hierarchy
            modelBuilder.Entity<User>()
                .HasMany(u => u.TeamMembers)
                .WithOne(u => u.TeamLeader)
                .HasForeignKey(u => u.TeamLeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Define the one-to-many relationship between User and Task
            modelBuilder.Entity<User>()
                .HasMany(u => u.Tasks)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}
