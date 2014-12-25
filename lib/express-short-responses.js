/**
 * Created by Jordan on 25/11/14.
 */

var winston = require('winston');

module.exports = function (req, res, next) {
    var shortResponse = function (status, content) {
        winston.log('info', status, content);
        if (content) return res.status(status).json(content);
        res.status(status).end();
    };

    res.shortResponses = {
        ok: function (content) {
            shortResponse(200, { success: 'OK' } || content);
        },
        created: function (content) {
            shortResponse(201, { success: 'Created' } || content);
        },
        noContent: function () {
            shortResponse(204);
        },
        notModified: function () {
            shortResponse(304);
        },
        badRequest: function (content) {
            shortResponse(400, { clientError: 'Bad Request' } || content);
        },
        unauthorized: function (content) {
            shortResponse(401, { clientError: 'Unauthorized' } || content);
        },
        forbidden: function (content) {
            shortResponse(403, { clientError: 'Forbidden' } || content);
        },
        notFound: function (content) {
            shortResponse(404, { clientError: 'Not Found' } || content);
        },
        conflict: function (content) {
            shortResponse(409, { clientError: 'Conflict' } || content);
        },
        internalServerError: function (content) {
            shortResponse(500, { serverError: 'Internal Server Error' } || content);
        }
    };
    next();
};