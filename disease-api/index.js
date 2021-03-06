const express = require("express");
const bodyParser = require("body-parser");
const patientsDiseasesRecord = require("./patientsDiseasesRecord");
const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  try{
    const cpf = req.body.cpf;
    const disease = req.body.disease;
  
    const diseaseRecord = patientsDiseasesRecord.insertPatientDisease(
      cpf,
      disease
    );
  
    res.send(
      `Disease ${diseaseRecord.disease} registered at ${diseaseRecord.registerTime}. Patient  ${cpf}`
    );
  } catch {
    res.send("Missing disease data");
  }
});

app.get("/", (req, res) => {
  const cpf = req.query.cpf;

  res.json(patientsDiseasesRecord.fetchPatientDiseaseRecord(cpf));
});

app.listen(port);
