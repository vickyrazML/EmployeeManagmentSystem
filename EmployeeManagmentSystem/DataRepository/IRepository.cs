using EmployeeManagmentSystem.Data;
using System.Linq.Expressions;

namespace EmployeeManagmentSystem.Repository
{
    public interface IRepository<T> where T : class
    {
        //Task<List<T>> GetAllAsync();
        Task<List<T>> GetAllAsync<TKey>(Expression<Func<T, TKey>>? orderBy = null);

        Task<T> FindByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);

        Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate);

    }
}

