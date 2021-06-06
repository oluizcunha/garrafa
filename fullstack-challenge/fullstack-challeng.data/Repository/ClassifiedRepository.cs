using fullstack_challeng.data.Context;
using fullstack_challenge.domain.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace fullstack_challeng.data.Repository
{
    public class ClassifiedRepository : IClassifiedRepository
    {

        private Mycontext context;
        public ClassifiedRepository()
        {
            context = new Mycontext();
        }
        public IEnumerable<Classified> Get()
        {
            return context.Classifieds.ToList();
        }

        public void Insert(Classified classified)
        {
            context.Classifieds.Add(classified);
            context.SaveChanges();
        }
    }
}
