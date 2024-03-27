using Back.DAL.DataContext;
using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.DAL.Repositories
{
    internal class UserRepositry : IGenericRepository<Models.User>
    {
        private readonly WorkplaceContext _dbContext;
        public UserRepositry(WorkplaceContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> Delete(decimal id)
        {
            try
            {
                var model = await _dbContext.Users.FirstOrDefaultAsync(c => c.IdUser == id);

                if (model == null)
                {
                    return false;
                }

                _dbContext.Users.Remove(model);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the entity with ID {id}: {ex.Message}");
                return false;
            }
        }
        public async Task<User> Get(decimal id)
        {
            try
            {
                var user = await _dbContext.Users.FindAsync(id);
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while retrieving the entity with ID {id}: {ex.Message}");
                return null;
            }
        }
        public async Task<IQueryable<User>> GetAll()
        {
            IQueryable<User> qUsers = _dbContext.Users;
            return qUsers;
        }
        public async Task<bool> Insert(User model)
        {
            try
            {
                await _dbContext.Users.AddAsync(model);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while inserting the entity: {ex.Message}");
                return false;
            }
        }
        public async Task<bool> Update(User model)
        {
            try
            {
                var existingModel = await _dbContext.Users.FindAsync(model.IdUser);

                if (existingModel == null)
                {
                    return false;
                }
                _dbContext.Entry(existingModel).CurrentValues.SetValues(model);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while updating the entity: {ex.Message}");
                return false;
            }
        }
    }
}
