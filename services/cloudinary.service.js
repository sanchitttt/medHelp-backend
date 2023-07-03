const cloudinary = require('cloudinary').v2;

class CloudinaryService {
    async uploadOne(image) {
        let globalResult;
        await cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
            globalResult = result.url;
        })
        return globalResult;

    }
    async uploadMultiple(images) {
        const finalResult = [];
        for (let i = 0; i < images.length; i++) {
            try {
                await cloudinary.uploader.upload(images[i].tempFilePath, (err, result) => {
                    finalResult.push(result.url);
                })
            } catch (error) {
                console.log('error uploading', images[i].name);
            }
        }
        return finalResult;
    }
}

module.exports = CloudinaryService;