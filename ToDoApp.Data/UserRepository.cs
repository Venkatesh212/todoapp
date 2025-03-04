using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Data.Contract;
using ToDoApp.Data.Entities;

namespace ToDoApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly ToDoAppDbContext _context;
        public UserRepository(ToDoAppDbContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            if (user != null)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
        }

        public User Get(User user)
        {
            var userDetails = _context.Users.FirstOrDefault(e => e.Name == user.Name);
            if (userDetails != null)
            {
                return userDetails;
            }
            return null;
        }
        public bool GetByName(string name)
        {
            var user = _context.Users.FirstOrDefault(e => e.Name == name);
            if (user != null)
            {
                return true;
            }
            return false;

        }
        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }
    }
}
