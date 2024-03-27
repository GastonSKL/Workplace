using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.DAL.Repositories
{
    public interface IGenericRepository<TEntityModel> where TEntityModel : class
    {
        Task<bool> Insert(TEntityModel model);
        Task<bool> Update(TEntityModel model);
        Task<bool> Delete(decimal id);
        Task<TEntityModel> Get(decimal id);
        Task<IQueryable<TEntityModel>> GetAll();
    }
}
