const PatientService = require("../services/patient.service")
const PatientServiceInstance = new PatientService();
const CloudinaryService = require("../services/cloudinary.service");
const CloudinaryServiceInstance = new CloudinaryService();
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
async function getPatientById(req, res) {
    try {
        const patient = await PatientServiceInstance.findOne(req.params.patientId);
        res.json(patient);
    } catch (error) {
        res.status(400).end();
    }
}
async function postPatientById(req, res) {
    try {
        const { imagesToBeDeleted } = req.body;
        if (imagesToBeDeleted.length) CloudinaryServiceInstance.destroyAll(req.body.imagesToBeDeleted);
        
        const patient = await PatientServiceInstance.findOneAndUpdate(req.params.patientId, req.body);
        res.json(patient);
    } catch (error) {
        res.status(400).end();
    }
}


module.exports = { postPatient, getAllPatients, getPatientById, postPatientById }