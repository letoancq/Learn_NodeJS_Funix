class CovidDetailController {
  // GET /covidDetail
  getIndex(req, res) {
    res.render("covidDetail/index", {
      path: "/covid",
      pageTitle: "Covide Detail",
    });
  }

  // POST /covidDetail/temparature
  postTemperature(req, res) {
    req.staff.bodyTemperature = {
      temperature: req.body.temperature,
      date: req.body.dateOfTemperature,
      time: req.body.timeOfTemperature,
    };
    req.staff
      .save()
      .then(() => {
        res.render("covidDetail/index", {
          path: "/covid",
          pageTitle: "Covide Detail",
        });
      })
      .catch((error) => console.log(error));
  }

  // POST /covidDetail/injection
  postInjection(req, res) {
    const firstVaccine = {
      nameVaccine: req.body.nameOfFirstVaccine,
      date: req.body.dateOfFirstVaccine,
    };
    const secondVaccine = {
      nameVaccine: req.body.nameOfSecondVaccine,
      date: req.body.dateOfSecondVaccine,
    };
    req.staff
      .addInject(firstVaccine, secondVaccine)
      .then(() => {
        res.render("covidDetail/index", {
          path: "/covid",
          pageTitle: "Covide Detail",
        });
      })
      .catch((error) => console.log(error));
  }

  // POST /covidDteail/infect
  postInfect(req, res) {
    req.staff.infectCovidInfo = {
      datePositive: req.body.infectDate,
      dateRecover: req.body.recoverDate,
    };

    req.staff
      .save()
      .then(() => {
        res.render("covidDetail/index", {
          path: "/covid",
          pageTitle: "Covide Detail",
        });
      })
      .catch((error) => console.log(error));
  }
}

module.exports = new CovidDetailController();
