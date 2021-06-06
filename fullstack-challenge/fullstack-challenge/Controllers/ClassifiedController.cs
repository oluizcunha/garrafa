using fullstack_challeng.data.Repository;
using fullstack_challenge.domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fullstack_challenge.Controllers
{
    public class ClassifiedController : Controller
    {
        private readonly ClassifiedRepository repository;
        public ClassifiedController()
        {
            repository = new ClassifiedRepository();
        }

        // GET: ClassifiedsController
        [HttpGet]
        [Route("Classifieds")]
        public ActionResult<List<Classified>> Index()
        {
            var classificado = repository.Get().ToList();

            return classificado;
        }

        // GET: ClassifiedsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ClassifiedsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ClassifiedsController/Create
        [HttpPost]
        [Route("Classified")]
        public ActionResult Create([FromBody] Classified classified)
        {
            try
            {
                var classificado = new Classified();
                classificado.Title = classified.Title;
                classificado.Description = classified.Description;
                classificado.Date = DateTime.Now;


                repository.Insert(classificado);
                return Ok();
            }
            catch
            {
                return View();
            }
        }

        // GET: ClassifiedsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }
    }
}
