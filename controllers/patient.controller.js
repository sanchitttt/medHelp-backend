const deleteFolderRecursive = require("../helper/recursiveFolderDelete");
const PatientService = require("../services/patient.service")
const PatientServiceInstance = new PatientService();
const path = require('path');

async function postPatient(req, res) {
    try {
        const images = req.body.images;
        await PatientServiceInstance.create(req.body, images)
        res.json({
            "message": "Patient created!"
        })
        // deleteFolderRecursive(path.resolve(__dirname, '../tmp'))
        res.end();
    } catch (error) {
        console.log('error aya error')
        res.status(409).json({
            "message": error
        })
    }
}

async function getAllPatients(req, res) {
    try {
        const patients = await PatientServiceInstance.findAll();
        res.json(patients);
    } catch (error) {
        res.status(400).end();
    }
}


module.exports = { postPatient, getAllPatients }