import express from 'express'
import Product from '../models/Product'

const router = express.Router()

// Get all products with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query

    const filter: any = { active: true }

    // Category filter
    if (category) {
      filter.category = { $regex: category, $options: 'i' }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = parseFloat(minPrice as string)
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string)
    }

    // Search filter
    if (search) {
      filter.$text = { $search: search as string }
    }

    // Featured filter
    if (featured !== undefined) {
      filter.featured = featured === 'true'
    }

    // Sort options
    const sortOptions: any = {}
    sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(filter)
    ])

    const totalPages = Math.ceil(total / limitNum)

    res.json({
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts: total,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({
      error: 'Failed to fetch products',
      message: 'Internal server error'
    })
  }
})

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      active: true
    }).lean()

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'The requested product does not exist or is not available'
      })
    }

    res.json({ product })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({
      error: 'Failed to fetch product',
      message: 'Internal server error'
    })
  }
})

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 8

    const products = await Product.find({
      featured: true,
      active: true
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()

    res.json({ products })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    res.status(500).json({
      error: 'Failed to fetch featured products',
      message: 'Internal server error'
    })
  }
})

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { active: true })
    
    const categoryStats = await Product.aggregate([
      { $match: { active: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    res.json({
      categories: categoryStats.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      error: 'Failed to fetch categories',
      message: 'Internal server error'
    })
  }
})

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params
    const limit = parseInt(req.query.limit as string) || 20

    const products = await Product.find({
      $text: { $search: query },
      active: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .lean()

    res.json({
      products,
      query,
      resultsCount: products.length
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).json({
      error: 'Search failed',
      message: 'Internal server error'
    })
  }
})

export default router