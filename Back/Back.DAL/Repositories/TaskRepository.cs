using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back.DAL.DataContext;
using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back.DAL.Repositories
{
    public class TaskRepository : IGenericRepository<Models.Task>
    {

        private readonly WorkplaceContext _dbContext;

        public TaskRepository(WorkplaceContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> Delete(decimal id)
        {
            try
            {
                var model = await _dbContext.Tasks.FirstOrDefaultAsync(c => c.IdTask == id);

                if (model == null)
                {
                    return false;
                }

                _dbContext.Tasks.Remove(model);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the entity with ID {id}: {ex.Message}");
                return false; 
            }
        }
        public async Task<Models.Task> Get(decimal id)
        {
            try
            {
                var task = await _dbContext.Tasks.FindAsync(id);
                return task;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while retrieving the entity with ID {id}: {ex.Message}");
                return null; 
            }
        }
        public async Task<IQueryable<Models.Task>> GetAll()
        {
            IQueryable<Models.Task> qTask = _dbContext.Tasks;
            return qTask;
        }
        public async Task<bool> Insert(Models.Task model)
        {
            try
            {
                await _dbContext.Tasks.AddAsync(model);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while inserting the entity: {ex.Message}");
                return false; 
            }
        }
        public Task<User?> Loggin(string mail, string pass)
        {
            throw new NotImplementedException();
        }
        public async Task<bool> Update(Models.Task model)
        {
            try
            {
                var existingModel = await _dbContext.Tasks.FindAsync(model.IdTask);

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
