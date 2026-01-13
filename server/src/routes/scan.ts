
import express from 'express'
import * as scanController from '../controllers/scanController'

const router = express.Router()

router.get('/wifi', scanController.scanWifi)
router.get('/bluetooth', scanController.scanBluetooth)
router.get('/network', scanController.scanNetwork)
router.post('/ports', scanController.scanPorts)

export default router
