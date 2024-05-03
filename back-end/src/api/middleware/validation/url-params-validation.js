export function validateUrlParams(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
}