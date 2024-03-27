using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.BLL.Service
{
    public interface IUserService
    {
        Task<bool> Insert(Models.User model);
        Task<bool> Update(Models.User model);
        Task<bool> Delete(decimal id);
        Task<Models.User> Get(decimal id);
        Task<IQueryable<Models.User>> GetAll();
        Task<IQueryable<Models.User>> GetAllById(decimal id);
        Task<bool> UserExist(string mail);
        Task<IQueryable<User>> GetByEmail(string mail);
    }
}
