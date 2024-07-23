using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Data;
using TaskManagementSystem.DTOs; // Import the DTO namespace
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Apply authorization to the entire controller
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasks()
        {
            var tasks = await _context.Tasks
                .Include(t => t.User)
                .Select(t => new TaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted,
                    UserName = t.User.Name,
                    UserRole = t.User.Role
                })
                .ToListAsync();

            return Ok(tasks);
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDTO>> GetTask(int id)
        {
            var tasks = await _context.Tasks
          .Include(t => t.User)
          .Select(t => new TaskDTO
          {
              Id = t.Id,
              Title = t.Title,
              Description = t.Description,
              DueDate = t.DueDate,
              IsCompleted = t.IsCompleted,
              UserName = t.User.Name,
              UserRole = t.User.Role
          })
          .ToListAsync();

            return Ok(tasks);
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TaskDTO>> PostTask(TaskManagementSystem.Models.Task task)
        {
            // Assume the user ID is obtained from the JWT token (or other auth mechanism)
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserID")?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            task.UserId = int.Parse(userId); // Assign the logged-in user's ID to the task

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            var taskDTO = new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                UserName = (await _context.Users.FindAsync(task.UserId)).Name,
                UserRole = (await _context.Users.FindAsync(task.UserId)).Role
            };

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDTO);
        }


        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskManagementSystem.Models.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Tasks/ByTeamLeader/5
        // GET: api/Tasks/ByTeamLeader/5
        [HttpGet("ByTeamLeader/{teamLeaderId}")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasksByTeamLeader(int teamLeaderId)
        {
            var teamMembers = await _context.Users
                .Where(u => u.TeamLeaderId == teamLeaderId)
                .Select(u => u.Id)
                .ToListAsync();

            var tasks = await _context.Tasks
                .Where(t => teamMembers.Contains(t.UserId))
                .Include(t => t.User)
                .Select(t => new TaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted,
                    UserName = t.User.Name,
                    UserRole = t.User.Role
                })
                .ToListAsync();

            if (!tasks.Any())
            {
                return NotFound(); // Return 404 if no tasks are found
            }

            return Ok(tasks); // Return 200 OK with the tasks
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
