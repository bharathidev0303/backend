notFoundError = function (message) {
    return createStatusCodeError(404, message);
};

errorResponse = function (res, code, message) {
    return res.status(code || 500).json({
        success: false,
        StatusCode: code,
        message,
    });
};

okResponse = function (res, data, message) {
    res.statusCode = 200;
    if (!message) {
        message = '';
    }
    return successResponse(res, 200, data, message);
};


forbiddenError = function (message) {
    return createStatusCodeError(403, message);
};

unauthorizedError = function (message) {
    return createStatusCodeError(401, message);
};

badRequestError = function (res, message, code = 404) {
    res.statusCode = code || 404;
    return res.json({
        success: false,
        code: code,
        message: message,
    });
};

successResponse = function (res, code, data, message) {
    return res.status(code || 200).json({
        success: true,
        StatusCode: code,
        data,
        message,
    });
};