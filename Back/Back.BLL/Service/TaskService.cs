using Back.DAL.Repositories;
using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.BLL.Service
{
    public class TaskService : ITaskService 
    {

        private readonly IGenericRepository<Models.Task> _repository;
        public TaskService(IGenericRepository<Models.Task> taskRepo)
        {
           _repository = taskRepo;
        }
        public async Task<bool> Delete(decimal id)
        {
            return await _repository.Delete(id);
        }
        public async Task<Models.Task> Get(decimal id)
        {
            return await _repository.Get(id);
        }
        public async Task<IQueryable<Models.Task>> GetAll()
        {
            return await _repository.GetAll();
        }
        public async Task<IQueryable<Models.Task>> GetAllById(decimal userId)
        {
            IQueryable<Models.Task> allTasks = await _repository.GetAll();
            return allTasks.Where(task => task.IdUser == userId).AsQueryable();
        }
        public async Task<bool> Insert(Models.Task model)
        {
            return await _repository.Insert(model);
        }
        public async Task<bool> Update(Models.Task model)
        {
            return await _repository.Update(model);
        }
    }
}
