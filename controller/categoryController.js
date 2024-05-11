import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        //validation
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        };
        //existing category check
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already exists",
            })
        };
        //new category
        const category = await new CategoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(200).send({
            success: true,
            message: "new category created",
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in category",
            error,
        });

    };
};

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await CategoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true },
        );
        res.status(200).send({
            success: true,
            message: "Category updated Successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in updating category",
            error,
        })
    }
}