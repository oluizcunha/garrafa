using fullstack_challenge.domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;


namespace fullstack_challeng.data.Context
{
    public class Mycontext : DbContext
    {
        public DbSet<Classified> Classifieds { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = localhost; Database = fullstack-challenge; User Id = sa; Password = 1q2w3e4r@#$");
        }
    }
}
