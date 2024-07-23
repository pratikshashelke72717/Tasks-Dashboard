using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskManagementSystem.Data;
using TaskManagementSystem.DTOs;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "TeamLeader")]
    public class TeamLeaderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamLeaderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("team-tasks")]
        public async Task<IActionResult> GetTeamTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userId, out int teamLeaderId))
            {
                return Unauthorized();
            }

            // Fetch the team leader with their team members and their tasks
            var teamLeader = await _context.Users
                .Include(u => u.TeamMembers)
                    .ThenInclude(tm => tm.Tasks)
                .Where(u => u.Id == teamLeaderId && u.Role == "TeamLeader")
                .FirstOrDefaultAsync();

            if (teamLeader == null)
            {
                return NotFound("Team leader not found or not authorized.");
            }

            // Flatten the tasks from all team members and map to TaskDTO
            var tasks = teamLeader.TeamMembers
                .SelectMany(tm => tm.Tasks)
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
                .ToList();

            return Ok(tasks);
        }
    }
}
