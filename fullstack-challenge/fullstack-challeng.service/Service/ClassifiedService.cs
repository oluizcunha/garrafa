
using fullstack_challeng.data.Repository;
using fullstack_challenge.domain.Entities;
using fullstack_challenge.domain.Interface.Service;
using fullstack_challenge.domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace fullstack_challeng.service.Service
{
    public class ClassifiedService : IClassifiedService
    {
        private readonly IClassifiedRepository _repository;
        public ClassifiedService(IClassifiedRepository repository)
        {
            _repository = repository;
        }

        public Classified AddClassified(Classified classified)
        {

            var classificado = new Classified();
            classificado.Title = classified.Title;
            classificado.Description = classified.Description;
            classificado.Date = DateTime.Now;


            _repository.Insert(classificado);

            return classificado;
        }

        public List<ClassifedViewModel> GetClassifieds()
        {
            var classificado = _repository.Get().OrderByDescending(o => o.Date).ToList()
                .Select(x => new ClassifedViewModel { Title = x.Title, Description = x.Description, Date = x.Date.ToString("dd MMMM yyyy", new CultureInfo("pt-BR")) });

            return classificado.ToList();
        }
    }
}
