using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Domain
{
    public class AutoMapper : Profile
    {
        public AutoMapper() 
        {
            CreateMap<Models.Register, Data.Entities.User>().
                ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src =>src.UserName)).ReverseMap();
                
            CreateMap<Models.Login, Data.Entities.User>().
                ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.UserName)).ReverseMap();

            CreateMap<Models.User, Data.Entities.User>().
                ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.UserName)).ReverseMap();

            CreateMap<Models.Task, Data.Entities.Task>().
                ForMember(dest => dest.AssignUser, opt =>
                opt.MapFrom(src => Convert.ToInt32(src.AssignUser))).ReverseMap();
        }
    }
}
