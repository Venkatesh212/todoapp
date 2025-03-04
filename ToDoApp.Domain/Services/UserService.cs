using AutoMapper;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Data.Contract;
using ToDoApp.Data.Entities;
using ToDoApp.Domain.Contract;
using ToDoApp.Models;
using BCrypt;

namespace ToDoApp.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public string Add(Register user)
        {
            if (_userRepository.GetByName(user.UserName) == false)
            {
                var userToAdd = _mapper.Map<Register,  Data.Entities.User >(user);
                userToAdd.Password = BCrypt.Net.BCrypt.HashPassword(userToAdd.Password);
                _userRepository.Add(userToAdd);
                return "Registration has completed Successfully";
            }
            return "User is already registered";
        }

        public Login Get(Login user)
        {
            var userEntity = _mapper.Map<Login,  Data.Entities.User >(user);
            var authenticatedUser = _userRepository.Get(userEntity);
            if (authenticatedUser != null && BCrypt.Net.BCrypt.Verify(user.Password, authenticatedUser.Password))
            {
                var userToSend = _mapper.Map < Data.Entities.User, Login>(authenticatedUser);
                return userToSend;
            }
            return null;
        }
        public List<Models.User> GetAll()
        {
            var userEntity = _userRepository.GetAll();
            var users = new List<Models.User> ();
            foreach(var user in userEntity)
            {
                var userToAdd = _mapper.Map<Data.Entities.User, Models.User>(user);
                users.Add(userToAdd);
            }
            return users;
        }
    }
}
