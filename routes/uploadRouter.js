const express= require('express');
const { singleFileUpload,MultipleFileUpload,deleteMultipleFile,updateMultipleFile,updateSingleFile } = require('../Controllers/fileuploaderController');

const router = express.Router();
const {upload} = require('../helpers/filehelper')


router.route("/singleFile").post(upload.single('file'),singleFileUpload);
router.route("/multipleFiles").post(upload.array('files'),MultipleFileUpload);
router.route("/deleteMultipleFile").delete(deleteMultipleFile);
router.route("/updateMultipleFile").put(upload.array("files"), updateMultipleFile);
router.route("/updateSingleFile").put(upload.single("file"), updateSingleFile);



module.exports = router;