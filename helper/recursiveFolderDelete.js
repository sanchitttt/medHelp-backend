const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // Recursively delete subdirectories
                deleteFolderRecursive(curPath);
            } else {
                // Delete files within the folder
                fs.unlinkSync(curPath);
            }
        });
        // Delete the empty folder
        fs.rmdirSync(folderPath);
        console.log('Folder deleted successfully.');
    }
}

module.exports = deleteFolderRecursive;