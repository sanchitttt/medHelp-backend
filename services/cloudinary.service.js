const cloudinary = require('cloudinary').v2;

class CloudinaryService {
    destroyAll(images) {
        for (let i = 0; i < images.length; i++) {
            const arr = images[i].split('/');
            const publicUrl = arr[arr.length - 1].split('.')[0];

            cloudinary.uploader.destroy(publicUrl).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log('err in deleting', images[i])
            })
        }

    }
    async uploadOne(image) {
        let globalResult;
        await cloudinary.uploader.upload(image, (err, result) => {
            globalResult = result.url;
        })
        return globalResult;

    }
    async uploadMultiple(images) {
        const finalResult = [];
        console.log('reached')
        for (let i = 0; i < images.length; i++) {
            try {
                await cloudinary.uploader.upload(images[i], (err, result) => {
                    console.log(result);
                    finalResult.push(result.secure_url);
                })
            } catch (error) {
                console.log('error uploading', images[i]);
            }
        }
        return finalResult;
    }
}

module.exports = CloudinaryService;