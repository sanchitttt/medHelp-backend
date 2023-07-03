const Patients = require('../models/patients.model');
const CloudinaryService = require('./cloudinary.service');
const CloudinaryServiceInstance = new CloudinaryService();

class PatientService {
    async create(body, images) {
        let cloudinaryImages;
        try {
            if (Array.isArray(images)) {
                cloudinaryImages = await CloudinaryServiceInstance.uploadMultiple(images)
            }
            else {
                cloudinaryImages = await CloudinaryServiceInstance.uploadOne(images);
            }
            const exists = await Patients.findOne({ email: body.email });
            if (exists) {
                throw "Patient already in the database"
            }
            else {
                console.log(cloudinaryImages)
                const createdPatient = await Patients.create({
                    ...body,
                    images: cloudinaryImages
                })
                return createdPatient;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PatientService;