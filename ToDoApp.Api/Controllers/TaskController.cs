using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Domain.Contract;


namespace ToDoApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskServices;
        private readonly IMapper _mapper;

        public TaskController(ITaskService taskServices,IMapper mapper)
        {
            this._taskServices = taskServices;
            this._mapper = mapper;
        }
        [HttpPost]
        public IActionResult Add([FromBody] ToDoApp.Api.Models.Task task)
        {
            var taskToAdd = _mapper.Map<ToDoApp.Models.Task>(task);
            return Ok(_taskServices.Add(taskToAdd));
        }
   
        [HttpGet]
        public ActionResult<List<Models.Task>> GetAll()
        {
            var tasks = _taskServices.GetAll();
            return Ok(tasks);
        }
        [HttpGet("Users")]
        public ActionResult<List<Models.Task>> GetAllUsers()
        {
            var tasks = _taskServices.GetAllUsers();
            return Ok(tasks);
        }
        [HttpGet("Id")]
        public IActionResult GetTask(int id)
        {
            var task = _taskServices.GetTask(id);
            return Ok(task);
        }
        [HttpPut]
        public IActionResult Update(int id,[FromBody] Models.Task task)
        {
            var taskToUpdate = _mapper.Map<ToDoApp.Models.Task>(task);
            return Ok(_taskServices.Update(id, taskToUpdate));
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        { 
            var message = _taskServices.Delete(id);
            return Ok($"{message}");
        }
    }
}



