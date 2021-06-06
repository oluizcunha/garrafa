using fullstack_challenge.domain.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace fullstack_challeng.data.Repository
{
    public interface IClassifiedRepository
    {
        IEnumerable<Classified> Get();
        void Insert(Classified classified);
    }
}
