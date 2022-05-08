using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ReactPeople.Data
{
    public class PeopleRepository
    {
        private readonly string _ConnectionString;
        public PeopleRepository(string ConString)
        {
            _ConnectionString = ConString;
        }
        public List<Person> GetAll()
        {
            PeopleDataContext context = new(_ConnectionString);
            return context.People.ToList();
        }
        public void AddPerson(Person p)
        {
            PeopleDataContext context = new(_ConnectionString);
            context.People.Add(p);
            context.SaveChanges();
        }

        public void DeletePeople(int id)
        {
            PeopleDataContext context = new(_ConnectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM people WHERE Id = {id}");
            context.SaveChanges();
        }

        public void Update(Person p)
        {
            PeopleDataContext context = new(_ConnectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE People SET Firstname={p.FirstName}, LastName={p.LastName}, Age={p.Age} where id={p.Id}");
            context.SaveChanges();
        }
    }
}
