
import express from 'express'
import * as reconController from '../controllers/reconController'

const router = express.Router()

// DNS and Domain Reconnaissance
router.post('/dns-enum', reconController.dnsEnumeration)
router.get('/dns-enum', reconController.dnsEnumeration)

router.post('/subdomain-discovery', reconController.subdomainDiscovery)
router.get('/subdomain-discovery', reconController.subdomainDiscovery)

router.post('/whois', reconController.whoisLookup)
router.get('/whois', reconController.whoisLookup)

// Service and Technology Detection
router.post('/banner-grab', reconController.bannerGrabbing)
router.post('/http-headers', reconController.httpHeaderAnalysis)
router.get('/http-headers', reconController.httpHeaderAnalysis)

router.post('/tech-stack', reconController.techStackDetection)
router.get('/tech-stack', reconController.techStackDetection)

export default router
