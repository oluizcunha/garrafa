using fullstack_challenge.domain.Entities;
using fullstack_challenge.domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace fullstack_challenge.domain.Interface.Service
{
    public interface IClassifiedService
    {
        List<ClassifedViewModel> GetClassifieds();
        Classified AddClassified(Classified classified);
    }
}
