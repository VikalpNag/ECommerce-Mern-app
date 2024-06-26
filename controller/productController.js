import CategoryModel from '../models/CategoryModel.js';
import productModel from '../models/ProductModel.js';
import fs from 'fs';
import slugify from 'slugify';
import braintree from 'braintree';

//payments gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
});


export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 10000000:
                return res.status(500).send({ error: "photo is required and should be less than 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        })


    }
};

//get-products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All products",
            products
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error,
        });
    };
};

//single-product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");

        await res.status(201).send({
            success: true,
            message: "Single Product fetched",
            product,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single Product",
            error,
        })
    }
};

// photo controller
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select('photo');
        if (product?.photo?.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching Photo",
            error,
        })
    }
};

//delete-product
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            message: "Product deleted succesfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error
        })

    }
};

//update-product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Pricce is  required" });
            case !category:
                return res.status(500).send({ error: "Category is requied" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is requires" });
            case photo && photo > 10000000:
                return res
                    .status(500)
                    .send({ error: "Photo is required and should be less than 10mb" });
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.params.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "Product Updated SuccessFully",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error white updating product",
            error
        })
    }
};

//filters
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while filtering products",
            error,
        })

    }
};

//product-count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in product count",
            error
        })

    }
};

//product-per-page
export const productListController = async (req, res) => {
    try {
        const perPage = 2;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in per page controller",
            error
        })
    }
};

//Search-product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in searching product",
            error
        })
    }
};

//similar products
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const product = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(3).populate("category");

        res.status(200).send({
            success: true,
            product
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related products",
            error,
        })
    }
};

//product-category
export const productCategoryController = async (req, res) => {

    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        const product = await productModel.find({ category }).populate('category');
        res.status(200).send({
            success: true,
            product,
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting category",
            error
        })
    }
};

//payment gatway api
//token
export const brainTreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error);
    };

};

//payment
export const brainTreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });

        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            },
        }, function (error, result) {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save();
                res.send({ ok: true });
            } else {
                res.status(500).send(error);
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in making payment",
            error
        })
    }
}