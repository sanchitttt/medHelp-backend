const Patients = require('../models/patients.model');
const CloudinaryService = require('./cloudinary.service');
const CloudinaryServiceInstance = new CloudinaryService();

class PatientService {
    async findOneAndUpdate(id, body) {
        try {
            const { _id, name, surgery, assignedDoctor, dateOfSurgery, diagnosis, email, tags, newlyAddedImages, images } = body;
            console.log('reached1', body)
            let cloudinaryImages = [];
            if (newlyAddedImages.length)
                cloudinaryImages = await CloudinaryServiceInstance.uploadMultiple(newlyAddedImages);
            const patient = await Patients.findOneAndUpdate({ _id: _id }, {
                $set: {
                    "name": name,
                    "email": email,
                    "surgery": surgery,
                    "diagnosis": diagnosis,
                    "tags": tags,
                    "dateOfSurgery": dateOfSurgery,
                    "assignedDoctor": assignedDoctor,
                    "images": images.concat(cloudinaryImages)
                }
            });
            console.log('reached2')
            return patient;
        } catch (error) {
            console.log(error)
        }

    }
    async findOne(id) {
        const patient = await Patients.findById(id);
        return patient;
    }
    async findAll() {
        const patients = await Patients.find({});
        return patients;
    }
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