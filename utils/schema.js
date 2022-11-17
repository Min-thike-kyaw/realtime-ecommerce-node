const Joi = require('joi');

module.exports = {
    UserSchema: {
        register : Joi.object({
            name: Joi.string().min(5).max(60).required(),
            password: Joi.string().min(6).max(20).required(),
            email: Joi.string().email().required()
        }),
        login : Joi.object({
            password: Joi.string().required(),
            email: Joi.string().required()
        }),
        addRole: Joi.object({
            user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            role_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
        removeRole: Joi.object({
            user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            role_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    },
    CategorySchema: {
        add: Joi.object({
            name: Joi.string().min(1).max(60).required(),
            
        }),
        addParent: Joi.object({
            category_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            parent_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
        addChildren: Joi.object({
            category_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            child_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
    },
    ProductSchema: {
        add: Joi.object({
            name: Joi.string().min(1).max(60).required(),
            price: Joi.number().greater(1).required(),
            category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            colors: Joi.array().unique().required(),
            images: Joi.array().required(),
        })
    },
    RoleSchema: {
        add: Joi.object({
            name: Joi.string().min(4).max(20).required()
        })
    }
}