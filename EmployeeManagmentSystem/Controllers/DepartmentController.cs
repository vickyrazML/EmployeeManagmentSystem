using EmployeeManagmentSystem.Entities;
using EmployeeManagmentSystem.Repository;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IRepository<Department> _repository;

        public DepartmentController(IRepository<Department> repository) 
        {
            _repository = repository;
        }

        [HttpGet("GetAllDepartments")]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _repository.GetAllAsync(d => d.Id);
            return Ok(departments);
        }

        [HttpGet("GetDepartmentById/{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var department = await _repository.FindByIdAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }

        [HttpPost("AddDepartment")]
        public async Task<IActionResult> AddDepartment([FromBody] Department objdept)
        {
            await _repository.AddAsync(objdept);
            return CreatedAtAction(nameof(GetDepartmentById), new { id = objdept.Id }, objdept);
        }

        [HttpPut("UpdateDepartment/{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody]Department objdept)
        {
            var department = await _repository.FindByIdAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            department.Name = objdept.Name;
            await _repository.UpdateAsync(department);
            return Ok(new { status = "Record updated successfully." });
        }

        [HttpDelete("DeleteDepartment/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok(new { message = "Record Deleted successfully." });
        }
    }
}
