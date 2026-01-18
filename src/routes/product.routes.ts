import { Router } from 'express';
import { paginate } from '../middlewares/pagination.middleware';
import { ProductRouter } from '../Product/product.router'

const router = Router();

router.get('/products', paginate, async (req: any, res: any) => {
  try {
    const { sort } = req.query; 
    const { limit, skip } = req.pagination;

    let sortQuery = {};

    if (sort === 'popularity') {
      sortQuery = { views: -1 }; 
    } else if (sort === 'newest') {
      sortQuery = { createdAt: -1 }; 
    }

    const products = await ProductRouter.find()
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await ProductRouter.countDocuments();

    res.json({
      data: products,
      total,
      page: req.pagination.page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;