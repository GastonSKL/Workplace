using Back.DAL.DataContext;
using Back.DAL.Repositories;
using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.BLL.Service
{
    internal class UsersService : IUserService
    {
        private readonly IGenericRepository<Models.User> _repository;
        public UsersService(IGenericRepository<Models.User> userRepo)
        {
            _repository = userRepo;
        }
        public async Task<bool> Delete(decimal id)
        {
            return await _repository.Delete(id);
        }
        public async Task<User> Get(decimal id)
        {
            return await _repository.Get(id);
        }
        public async Task<IQueryable<User>> GetAll()
        {
            return await _repository.GetAll();
        }
        public async Task<IQueryable<User>> GetAllById(decimal id)
        {
            IQueryable<Models.User> allUsers = await _repository.GetAll();
            return allUsers.Where(user => user.IdUser == id).AsQueryable();
        }
        public async Task<bool> Insert(User model)
        {
            return await _repository.Insert(model);
        }
        public async Task<bool> Update(User model)
        {
            return await _repository.Update(model);
        }
        public async Task<bool> UserExist(string mail)
        {
            IQueryable<Models.User> users = await _repository.GetAll();
            bool userExists = await users.AnyAsync(u => u.Mai == mail);
            return userExists;
        }
    }
}
