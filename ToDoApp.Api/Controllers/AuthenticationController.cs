using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ToDoApp.Domain.Contract;
using ToDoApp.Api.Models;

namespace ToDoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userServices;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public AuthenticationController(IUserService userServices,IConfiguration configuration,IMapper mapper) 
        {
            _userServices = userServices;
            _configuration = configuration;
            _mapper = mapper;
        }
       
        [HttpPost]
        public IActionResult Register([FromBody] ToDoApp.Models.Register user)
        {
            var userToRegister = user;
            return Ok(_userServices.Add(userToRegister));
        }
     
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login userRequest)
        {
            IActionResult response = Unauthorized();
            var userToCheck = _mapper.Map<ToDoApp.Models.Login>(userRequest);
            var user = _userServices.Get(userToCheck);
            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }
            return response;
        }
        private string GenerateJSONWebToken(ToDoApp.Models.Login userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]??""));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
            new Claim(ClaimTypes.Name, userInfo.UserName),
            new Claim(ClaimTypes.Email,userInfo.UserName),
             new Claim(ClaimTypes.Sid, userInfo.Id.ToString())
             };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(240),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
