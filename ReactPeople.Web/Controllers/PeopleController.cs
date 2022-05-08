using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeople.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeople.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }
        [Route("addperson")]
        [HttpPost]
        public void Addperson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(p);
        }

        [Route("deletepeople")]
        [HttpPost]
        public void DeletePeople(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePeople(id);
        }

        [Route("updatePerson")]
        [HttpPost]
        public void Update(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(p);
        }
    }
}
