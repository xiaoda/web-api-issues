const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/:name', (req, res, next) => {
  const options = {
    root: path.join(__dirname, '../public/static'),
    headers: {
      'Content-Disposition': 'attachment'
    }
  }
  const fileName = req.params.name
  res.sendFile(fileName, options)
})

module.exports = router
