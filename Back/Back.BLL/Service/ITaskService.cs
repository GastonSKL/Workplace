using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Back.Models;

namespace Back.BLL.Service
{
    public interface ITaskService
    {
        Task<bool> Insert(Models.Task model);
        Task<bool> Update(Models.Task model);
        Task<bool> Delete(decimal id);
        Task<Models.Task> Get(decimal id);
        Task<IQueryable<Models.Task>> GetAll();

        Task<IQueryable<Models.Task>> GetAllById(decimal id);

    }
}
