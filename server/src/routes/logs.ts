import express from 'express'
import { Log } from '../models/Log'

const router = express.Router()

// POST /api/logs - Create a new log
router.post('/', async (req, res) => {
    try {
        const { level, message, meta } = req.body

        const log = new Log({
            level: level || 'info',
            message,
            meta
        })

        await log.save()
        res.status(201).json(log)
    } catch (error) {
        console.error('Error creating log:', error)
        res.status(500).json({ error: 'Failed to save log' })
    }
})

// GET /api/logs - Retrieve logs
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50
        const level = req.query.level as string

        const query: any = {}
        if (level) {
            query.level = level
        }

        const logs = await Log.find(query)
            .sort({ timestamp: -1 })
            .limit(limit)

        res.json(logs)
    } catch (error) {
        console.error('Error fetching logs:', error)
        res.status(500).json({ error: 'Failed to fetch logs' })
    }
})

export default router
