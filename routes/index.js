const express = require('express');
const os = require('os');
const osUtils = require('os-utils');
const ejs = require('ejs');

const router = express.Router();

function getCpuUsage() {
  return new Promise((resolve, reject) => {
    osUtils.cpuUsage((cpuUsage) => {
      resolve(cpuUsage.toFixed(2));
    });
  });
}

async function getSystemInfo() {
  const cpuUsage = await getCpuUsage();
  const totalDiskSpace = os.totalmem();
  const freeDiskSpace = os.freemem();
  const usedDiskSpace = totalDiskSpace - freeDiskSpace;
  const memoryUsage = ((totalDiskSpace - freeDiskSpace) / totalDiskSpace) * 100;
  return { cpuUsage, usedDiskSpace, totalDiskSpace, memoryUsage };
}

router.get('/',async function(req, res, next) {
  getSystemInfo()
    .then((systemInfo) => {
      let size = Number(1024 * 1024 * 1024);
      systemInfo.usedDiskSpace = (Number(systemInfo.usedDiskSpace) / size).toFixed(2);
      systemInfo.totalDiskSpace = (Number(systemInfo.totalDiskSpace) / size).toFixed(2);
      systemInfo.memoryUsage = Number(systemInfo.memoryUsage).toFixed(2);
      res.render('index', systemInfo);
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
