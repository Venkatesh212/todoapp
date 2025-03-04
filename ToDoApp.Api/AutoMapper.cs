using AutoMapper;

namespace ToDoApp.Api
{
    public class AutoMapper: Profile
    {
        public AutoMapper()
        {
            CreateMap<ToDoApp.Models.Task, ToDoApp.Api.Models.Task>().ForMember(dest => dest.AssignUser, opt =>
                opt.MapFrom(src => Convert.ToInt32(src.AssignUser))).ReverseMap();
            CreateMap< ToDoApp.Api.Models.Login, ToDoApp.Models.Login>().ReverseMap();
        }
    }
}
