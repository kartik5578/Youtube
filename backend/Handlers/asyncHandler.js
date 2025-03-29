const asyncHandler = async (fn) => {
    try {
        return await fn();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const asyncApiHandler = (fn) => async (req, res) => {
    try {
        return await fn(req, res);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = { asyncHandler ,asyncApiHandler};