var express = require('express');
var controller = require('../controllers/controllerAnnouncement');
var router = express.Router();


router.get('/version_histor', async function (req, res) {
  let result = await controller.getVersionHistory();
  res.send(result);
});

router.post('/edit_version_histor', async function (req, res) {
  const content = req.body.content;
  let result = await controller.editVersionHistory(content);
  res.send(result);
});


module.exports = router;



