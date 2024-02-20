const fs = require('fs');
const path = require('path');
const { readFileContent } = require('../operations/fileOperations');
const UserComponents = require('../models/components.model');
const baseFolderPath = '../';
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');


//TODO readContent('index.html', "buttons" , "moovendhan", (change this directory name into dynamically)

//read file content 
const readContent = (filename, catogries, catogriesFile, callback) => {
    const folderPath = path.join(baseFolderPath, 'project', 'project_datas', catogries, catogriesFile);
    console.log(`Folder paths ${folderPath}`);
    readFileContent(folderPath, filename, (err, content) => {
        if (err) {
            console.error(err);
            return callback(`${err} Internal Server Errors`);
        }
        callback(null, content);
    });
};

// reading file informations 
function readFilesInformations(catogriesName, folderName, callback) {
    console.log(`Catogreis ${catogriesName} Folder Name ${folderName}`);
    readContent('index.html', catogriesName, folderName, (htmlErr, htmlContent) => {
        if (htmlErr) {
            console.log(`html error ${htmlErr}`);
            return callback(htmlErr);
        }
        readContent('style.css', catogriesName, folderName, (cssErr, cssContent) => {
            if (cssErr) {
                console.log(`css error ${cssErr}`);
                return callback(cssErr);
            }
            readContent('script.js', catogriesName, folderName, (jsErr, jsContent) => {
                if (jsErr) {
                    console.log(`js error ${jsErr}`);
                    return callback(jsErr);
                }
                const dataObject = {
                    "post_details": {
                        "html": htmlContent,
                        "css": cssContent,
                        "js": jsContent
                    }
                };
                callback(null, dataObject);
            });
        });
    });
}

// this is asyncronus taks so that we need to handle this in a asyncronus promise way
function getLatestFiles(catogries, callback) {
    const folderPaths = path.join("../", 'project', 'project_datas', catogries);
    fs.readdir(folderPaths, (err, files) => {
        if (err) {
            return callback(`Error reading directory: ${err}`);
        }
        const promises = files.slice(0, 9).map(file => {
            return new Promise((resolve, reject) => {
                readFilesInformations(catogries, file, (err, fileInfo) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`Fileinfos ${fileInfo}`);
                        resolve(fileInfo);
                    }
                });
            });
        });
        Promise.all(promises)
            .then(result => {
                callback(null, result);
            })
            .catch(error => {
                callback(error);
            });
    });
}

//get all components and search funcitons
const getAllCompDetailsFromDatabases = async ({ categories, search: searchQuery }, callback) => {
    const allComponentsDetails = [];
    try {
        let userComponents;
        if (categories === "all") {
            userComponents = await UserComponents.find();
        } else if (categories === "search") {
            userComponents = await UserComponents.aggregate([
                {
                    $match: {
                        $or: [
                            { 'title': { $regex: searchQuery, $options: 'i' } },
                            { 'folder_name': { $regex: searchQuery, $options: 'i' } },
                            { 'categories': { $regex: searchQuery, $options: 'i' } },
                            { 'description': { $regex: searchQuery, $options: 'i' } },
                            { 'tags': { $regex: searchQuery, $options: 'i' } }
                        ]
                    }
                },
            ]);
        } else {
            return callback("Invalid category", null);
        }

        await Promise.all(userComponents.map(async (data) => {
            try {
                const datas = await new Promise((resolve, reject) => {
                    readFilesInformations(data.categories, data.folder_name, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                console.log(datas);
                allComponentsDetails.push(datas);
            } catch (err) {
                console.error("Error reading files information:", err);
                throw err;
            }
        }));
        callback(null, allComponentsDetails);
    } catch (error) {
        console.error("Error retrieving user components:", error);
        callback("Internal server error", null);
    }
};

//filter components by seach
const getComponentsBySearch = (req,res)=>{
    const { categories = "search", search } = req.query;
    if(!search){
        return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: `Please add a search query`, response: null, }));
    }
    getAllCompDetailsFromDatabases({ categories: categories, search: search }, (err, files) => {
        // Handle the data
        if (err) {
            return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: `${err}`, response: null, }));
        }
        res.send(jsonStatusSuccess({ errorStatus: false, message: `${categories} latest components`, response: files, count: files.length }));
    });
}



module.exports = {
    getLatestFiles,
    readFilesInformations,
    readContent,
    getAllCompDetailsFromDatabases,
    getComponentsBySearch,
};
