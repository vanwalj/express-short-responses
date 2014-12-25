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
            shortResponse(200, content || { success: 'OK' });
        },
        created: function (content) {
            shortResponse(201, content || { success: 'Created' });
        },
        noContent: function () {
            shortResponse(204);
        },
        notModified: function () {
            shortResponse(304);
        },
        badRequest: function (content) {
            shortResponse(400, content || { clientError: 'Bad Request' });
        },
        unauthorized: function (content) {
            shortResponse(401, content || { clientError: 'Unauthorized' });
        },
        forbidden: function (content) {
            shortResponse(403, content || { clientError: 'Forbidden' });
        },
        notFound: function (content) {
            shortResponse(404, content || { clientError: 'Not Found' });
        },
        conflict: function (content) {
            shortResponse(409, content || { clientError: 'Conflict' });
        },
        internalServerError: function (content) {
            shortResponse(500, content || { serverError: 'Internal Server Error' });
        }
    };
    next();
};