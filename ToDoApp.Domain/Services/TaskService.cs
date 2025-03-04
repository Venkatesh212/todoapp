using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Data.Contract;
using ToDoApp.Domain.Contract;
using ToDoApp.Domain;
using Microsoft.Exchange.WebServices.Data;
using ToDoApp.Data.Entities;
using Microsoft.Extensions.Logging.Abstractions;
using ToDoApp.Models;

namespace ToDoApp.Domain.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly int _loggedInUserId;
        private readonly IUserService _userService;
        public TaskService(ITaskRepository taskRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
            _userService = userService;
            _loggedInUserId = int.Parse(httpContextAccessor.HttpContext.Items["UserId"].ToString());

        }
        public string Add(Models.Task task)
        {
            task.UserId = _loggedInUserId;
            if( Convert.ToInt32(task.AssignUser) == 0 || Convert.ToInt32(task.AssignUser) == task.UserId)
            {
                task.AssignUser = Convert.ToString(task.UserId);
                if (_taskRepository.GetByTitle(task.Title, task.UserId) == false)
                {
                    var taskToAdd = _mapper.Map<Models.Task, Data.Entities.Task>(task);
                    _taskRepository.Add(taskToAdd);
                    return "Task Added Sucessfully";
                }
            }
            if( Convert.ToInt32(task.AssignUser) != task.UserId)
            {
                var taskToAdd = _mapper.Map<Models.Task, Data.Entities.Task>(task);
                _taskRepository.Add(taskToAdd);
                return "Task Added Sucessfully";
            }
            
            return "Task Already there";
        }

        public string Delete(int id)
        {
            if (GetTask(id) != null)
            {
                _taskRepository.Delete(id);
                return "Deleted successfully";
            }
            return " Task not found";
        }

        public List<Models.Task> GetAll()
        {
            var tasks = _taskRepository.GetAll( _loggedInUserId );
            List<Models.Task> Tasks = [];
            foreach (var task in tasks)
            {
                if(task.UserId == task.AssignUser || task.AssignUser ==0 || task.AssignUser == _loggedInUserId )
                {
                    var taskEntity = _mapper.Map<Data.Entities.Task, Models.Task>(task);
                    taskEntity.IsEditActive = true;
                    Tasks.Add(taskEntity);
                }
                else
                {
                    var taskEntity = _mapper.Map<Data.Entities.Task, Models.Task>(task);
                    var users = _userService.GetAll();
                    foreach (var user in users)
                    {
                        if(user.Id == Convert.ToInt32(taskEntity.AssignUser))
                        {
                            taskEntity.AssignUser = user.UserName;
                            break;
                        }
                    }
                    taskEntity.IsEditActive = false;
                    Tasks.Add(taskEntity);
                }
            }
            return Tasks;
        }

        public Models.Task GetTask(int id)
        {
            var taskEntity = _taskRepository.GetById(id);
            if (taskEntity != null && (taskEntity.UserId == _loggedInUserId || taskEntity.AssignUser == _loggedInUserId))
            {
                var task = _mapper.Map<Data.Entities.Task, Models.Task>(taskEntity);
                return task;
            }
            return null;
        }
        public string Update(int id, Models.Task task)
        {
            task.EditedDate = DateTime.Now;
            if (GetTask(id) != null)
            {
                if (task.IsCompleted == true)
                {
                    int numberOfChildTasks = 0;
                    int numberOfChildTasksCompleted = 0;
                    var tasks = GetAll();
                    foreach (var taskEntity in tasks)
                    {
                        if( taskEntity.Id == id)
                        {
                            continue;
                        }
                        if (taskEntity.ParentTaskId == id)
                        {
                            numberOfChildTasks++;
                            if (taskEntity.IsCompleted == true)
                            {
                                numberOfChildTasksCompleted++;
                            }
                        }
                    }
                    if(numberOfChildTasks != numberOfChildTasksCompleted)
                    {
                        task.IsCompleted = false;
                    }
                    
                    var taskToUpdate = _mapper.Map<Models.Task, Data.Entities.Task>(task);
                    _taskRepository.Update(id, taskToUpdate);
                    return "Updated successfully";
                    
                }
                else
                {
                    var taskToUpdate = _mapper.Map<Models.Task, Data.Entities.Task>(task);
                    _taskRepository.Update(id, taskToUpdate);
                    return "Updated successfully";
                }
            }
            return "Task not found";
        }
        public List<Models.User> GetAllUsers()
        {
            return _userService.GetAll();
        }
    }
}
