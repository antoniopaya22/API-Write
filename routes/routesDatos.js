module.exports = function (app, redFabric, mongo) {


  /**
   * GET all datos
   */
  app.get("/api/datos", function (req, res) {
    redFabric.init().then(function () {
      return redFabric.queryAllDatos()
    }).then(function (data) {
      res.status(200).json(data)
    }).catch(function (err) {
      res.status(500).json({ error: err.toString() })
    })
  });

  /**
   * GET fantastic query
   */
  app.get("/api/dato/:id", function (req, res) {
    var id = req.params.id;
    redFabric.init().then(function () {
      return redFabric.queryDato(id)
    }).then(function (data) {
      res.status(200).json(data)
    }).catch(function (err) {
      res.status(500).json({ error: err.toString() })
    })
  });

  /**
   * DELETE dato : id
   */
  app.post("/api/query", function (req, res) {
    redFabric.init().then(function () {
        var consulta = req.body;
        return redFabric.fantasticQuery(JSON.stringify(consulta));
    }).then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        res.status(500).json({ error: err.toString() })
    })
});

   /**
   * DELETE dato : id
   */
  app.delete("/api/dato/:id", function (req, res) {
    var id = req.params.id;
    redFabric.init().then(function () {
      return redFabric.queryDato(id)
    }).then(function (data) {
      redFabric.init().then(function () {
        return redFabric.deleteDato(id)
      }).then(function (data) {
        mongo.deleteDato(id).then(function (){
          res.status(200).json(data)
        }).catch(function (err) {
          res.status(500).json({ error: err.toString() })
        })
      }).catch(function (err) {
        res.status(500).json({ error: err.toString() })
      })
    }).catch(function (err) {
      res.status(500).json({ error: err.toString() })
    })

  });

  /**
   * POST -> add dato
   */
  app.post("/api/dato", function (req, res) {
    var id = "";
    redFabric.init().then(function (){
      return redFabric.getLastNum()
    }).then(function (data) {
      id = "ID_CH"+data.Num;
      var dato = {
        id: "ID_CH"+data.Num,
        temperature: req.body.temperature,
        hour: req.body.hour,
        device: req.body.device,
        gps: req.body.gps,
      };
      redFabric.init().then(function () {
        return redFabric.addDato(dato)
      }).then(function (data) {
        mongo.addDato(dato).then(function (){
          res.status(200).json({trans_id:data.trans_id, id:id})
        }).catch(function (err) {
          res.status(500).json({ error: err.toString() })
        })
      }).catch(function (err) {
        res.status(500).json({ error: err.toString() })
      });
    }).catch(function (err) {
      res.status(500).json({ error: err.toString() })
    });;
  });

  /**
   * PUT -> update dato
   */
  app.put("/api/dato/:id", function (req, res) {
    var id = req.params.id;
    var dato = {
      id: req.params.id,
      temperature: req.body.temperature,
      hour: req.body.hour,
      device: req.body.device,
      gps: req.body.gps,
    };
    redFabric.init().then(function () {
      return redFabric.queryDato(id)
    }).then(function (data) {
      redFabric.init().then(function () {
        return redFabric.updateDato(dato);
      }).then(function (data) {
        mongo.updateDato(dato).then(function (){
          res.status(200).json(data)
        }).catch(function (err) {
          res.status(500).json({ error: err.toString() })
        })
      }).catch(function (err) {
        res.status(500).json({ error: err.toString() })
      })
    }).catch(function (err) {
      res.status(500).json({ error: "El dato con id: "+id+" no existe." })
    })
  });

  /**
    * Actualizar BD Local
   */
  app.post("/actualizar", function (req, res) {
    redFabric.init().then(function () {
      return redFabric.queryAllDatos();
    }).then(function (data) {
      mongo.deleteDb().then(function (){
           mongo.updateDb(data.filter(x => x.Record.node.toString() === process.env.NODE.toString())).then(function (){
              res.status(200).json({"status":"ok"});
            }).catch(function (err) {
              res.status(500).json({ error: err.toString() })
            });
        }).catch(function (err) {
          res.status(500).json({ error: err.toString() })
        });
    }).catch(function (err) {
      res.status(500).json({ error: err.toString() })
    });
  });


};
