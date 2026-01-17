
using EmployeeManagmentSystem.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EmployeeManagmentSystem.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected AppDbContext _dbContext;

        public Repository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<T>> GetAllAsync<TKey>(Expression<Func<T, TKey>>? orderBy = null)
        {
            IQueryable<T> query = _dbContext.Set<T>();
            if (orderBy != null)
            {
                query = query.OrderBy(orderBy);
            }
            return await query.ToListAsync();
        }

        public async Task<T> FindByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await FindByIdAsync(id);
            if (entity != null)
            {
                _dbContext.Set<T>().Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
        }

        // New: evaluate the predicate at the database level (no in-memory filtering).
        public async Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = _dbContext.Set<T>();
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            return await query.ToListAsync();
        }


    }
}
