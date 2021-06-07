using fullstack_challeng.data.Repository;
using fullstack_challeng.service.Service;
using fullstack_challenge.domain.Entities;
using fullstack_challenge.domain.Interface.Service;
using fullstack_challenge.domain.ViewModels;
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
        private readonly IClassifiedService _service;
        public ClassifiedController(IClassifiedService service)
        {
            _service = service;
        }

        // GET: ClassifiedsController
        [HttpGet]
        [Route("Classifieds")]
        public ActionResult<List<ClassifedViewModel>> Index()
        {
            return _service.GetClassifieds();
        }

        // POST: ClassifiedsController/Create
        [HttpPost]
        [Route("Classified")]
        public ActionResult Create([FromBody] Classified classified)
        {
            try
            {
                _service.AddClassified(classified);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
