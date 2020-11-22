const express = require('express')
const router = express.Router()

router.get('/raw', (req, res, next) => {
  res.json({message: 'raw'})
})

router.get('/allow-all', (req, res, next) => {
  res
    .set({'Access-Control-Allow-Origin': '*'})
    .json({message: 'allow all'})
})

router.get('/specific-origin', (req, res, next) => {
  res
    .set({'Access-Control-Allow-Origin': req.headers.origin})
    .json({message: 'specific origin'})
})

router.put('/put', (req, res, next) => {
  res
    .set({'Access-Control-Allow-Origin': req.headers.origin})
    .json({message: 'put'})
})

router.delete('/delete', (req, res, next) => {
  res
    .set({'Access-Control-Allow-Origin': req.headers.origin})
    .json({message: 'delete'})
})

router.options('/put-with-preflight', (req, res, next) => {
  res
    .set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Methods': 'PUT'
    })
    .send()
})

router.put('/put-with-preflight', (req, res, next) => {
  res
    .set({'Access-Control-Allow-Origin': req.headers.origin})
    .json({message: 'put with preflight'})
})

router.options('/delete-with-preflight', (req, res, next) => {
  res
    .set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Methods': 'DELETE'
    })
    .send()
})

router.delete('/delete-with-preflight', (req, res, next) => {
  res
    .set({'Access-Control-Allow-Origin': req.headers.origin})
    .json({message: 'delete with preflight'})
})

router.get('/get-cookie', (req, res, next) => {
  const company = req.cookies.company || null
  res
    .set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true
    })
    .json({company})
})

router.get('/set-cookie', (req, res, next) => {
  const company = 'Anchnet'
  res
    .set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true
    })
    .cookie('company', company, {
      sameSite: 'None',
      secure: true
    })
    .json({company})
})

router.get('/clear-cookie', (req, res, next) => {
  const company = null
  res
    .set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true
    })
    .clearCookie('company', {
      sameSite: 'None',
      secure: true
    })
    .json({company})
})

router.get('/jsonp', (req, res, next) => {
  const {callback} = req.query
  res.send(`${callback}('Anchnet')`)
})

module.exports = router
