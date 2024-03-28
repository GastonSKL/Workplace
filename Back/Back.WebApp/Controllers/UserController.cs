using Back.BLL.Service;
using Back.WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Back.Models;

namespace Back.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly ITaskService _taskService;
        private IConfiguration config;
        public UserController(IUserService userService, ITaskService taskService, IConfiguration config)
        {
            _userService = userService;
            _taskService = taskService;
            this.config = config;
        }
        [HttpOptions]
        public IActionResult Options()
        {
            Response.Headers.Add("Allow", "POST, GET, OPTIONS");
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(decimal id)
        {
            var task = await _userService.Get(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _userService.GetAll();
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(decimal id)
        {

            // Eliminar al usuario
            var result = await _userService.Delete(id);

            if (result)
            {
                return Ok("User and associated tasks deleted successfully.");
            }
            else
            {
                return NotFound("User not found.");
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> Insert(Back.Models.User model)
        {
            if (!String.IsNullOrEmpty(model.Mai))
            {
                bool flag = await _userService.UserExist(model.Mai);

                if (!flag)
                {
                    var result = await _userService.Insert(model);

                    if (result)
                    {
                        return Ok("User created.");
                    }
                    else
                    {
                        return NotFound("User not created.");
                    }
                }
                else
                {
                    return NotFound("Ya existe un usuario con ese correo.");
                }
            }
            else
            {
                return NotFound("Correo requerido para registrar.");
            }
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(Back.Models.User model)
        {
            var result = await _userService.Update(model);

            if (result)
            {
                return Ok("User updated.");
            }
            else
            {
                return NotFound("User not updated.");
            }
        }

        [HttpGet("Getbymail/{mail}")]
        public async Task<IActionResult> GetByEmail(string mail)
        {
            var user = await _userService.GetByEmail(mail);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("GetAll/{id}")]
        public async Task<IActionResult> GetAllById(decimal id)
        {
            var tasks = await _userService.GetAllById(id);
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpPost("loggin")]
        public async Task<IActionResult> Loggin(LogginModel model)
        {
            var tasks = await _userService.Loggin(model.mail, model.pass);

            if (tasks == null)
            {
                return NotFound();
            }
            string jwtToken = GenerateTokem(model);
            return Ok(new { token = jwtToken});
        }

        private string GenerateTokem(LogginModel user)
        {
            var claims = new[]
            {
                 new Claim(ClaimTypes.Email, user.mail),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("JWT:Key").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(90),
                    signingCredentials: creds
                );

            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }
    }
}
