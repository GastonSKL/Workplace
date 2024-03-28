using Back.BLL.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Back.Models;
using Microsoft.AspNetCore.Authorization;
namespace Back.WebApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpOptions]
        public IActionResult Options()
        {
            Response.Headers.Add("Allow", "POST, GET, DELETE, PUT, OPTIONS");
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(decimal id)
        {
            var task = await _taskService.Get(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAll();
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(decimal id)
        {
            var result = await _taskService.Delete(id);

            if (result)
            {
                return Ok("Task deleted successfully.");
            }
            else
            {
                return NotFound("Task not found.");
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> Insert(Back.Models.Task model)
        {
            var result = await _taskService.Insert(model);

            if (result)
            {
                return Ok("Task created.");
            }
            else
            {
                return NotFound("Task not created.");
            }
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(Back.Models.Task model)
        {
            var result = await _taskService.Update(model);

            if (result)
            {
                return Ok("Task updated.");
            }
            else
            {
                return NotFound("Task not updated.");
            }
        }

        [HttpGet("GetAll/{id}")]
        public async Task<IActionResult> GetAllById(decimal id)
        {
            var tasks = await _taskService.GetAllById(id);
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

    }
}
