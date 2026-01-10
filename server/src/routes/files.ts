import express from 'express'
import multer from 'multer'
import { File } from '../models/File'

const router = express.Router()

// Configure multer to store files in memory as Buffer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit to 10MB
    }
})

// POST /api/files/upload - Upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const file = new File({
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer
        })

        await file.save()

        res.status(201).json({
            message: 'File uploaded successfully',
            file: {
                id: file._id,
                filename: file.filename,
                mimetype: file.mimetype,
                size: file.size
            }
        })
    } catch (error) {
        console.error('Error uploading file:', error)
        res.status(500).json({ error: 'Failed to upload file' })
    }
})

// GET /api/files/:id - Retrieve a file
router.get('/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id)
        if (!file) {
            return res.status(404).json({ error: 'File not found' })
        }

        res.set('Content-Type', file.mimetype)
        res.set('Content-Disposition', `inline; filename="${file.filename}"`)
        res.send(file.data)
    } catch (error) {
        console.error('Error retrieving file:', error)
        res.status(500).json({ error: 'Failed to retrieve file' })
    }
})

// GET /api/files - List recent files (metadata only)
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 20
        const files = await File.find().select('-data').sort({ createdAt: -1 }).limit(limit)
        res.json(files)
    } catch (error) {
        res.status(500).json({ error: 'Failed to list files' })
    }
})

export default router
