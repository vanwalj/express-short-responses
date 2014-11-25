/**
 * Created by Jordan on 25/11/14.
 */

var expect          = require('chai').expect,
    express         = require('express'),
    app             = express(),
    shortResponses  = require('../index'),
    request         = require('request'),
    port            = 4040;

describe('Express short responses', function () {

    app.use(shortResponses);
    app.listen(port);

    it('should send a 200', function (done) {

        var path = '/ok';

        app.get(path, function (req, res) {
            return res.shortResponses.ok();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(200);
            expect(jsonBody.success).to.equal("OK");
            done();
        });

    });

    it('should send a 201', function (done) {

        var path = '/created';

        app.get(path, function (req, res) {
            return res.shortResponses.created();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(201);
            expect(jsonBody.success).to.equal("Created");
            done();
        });

    });

    it('should send a 204', function (done) {

        var path = '/no-content';

        app.get(path, function (req, res) {
            return res.shortResponses.noContent();
        });

        request.get('http://localhost:' + port + path, function (err, response) {
            expect(response.statusCode).to.equal(204);
            done();
        });

    });


    it('should send a 304', function (done) {

        var path = '/not-modified';

        app.get(path, function (req, res) {
            return res.shortResponses.notModified();
        });

        request.get('http://localhost:' + port + path, function (err, response) {
            expect(response.statusCode).to.equal(304);
            done();
        });

    });

    it('should send a 400', function (done) {

        var path = '/bad-request';

        app.get(path, function (req, res) {
            return res.shortResponses.badRequest();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(400);
            expect(jsonBody.clientError).to.equal("Bad Request");
            done();
        });

    });

    it('should send a 401', function (done) {

        var path = '/unauthorized';

        app.get(path, function (req, res) {
            return res.shortResponses.unauthorized();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(401);
            expect(jsonBody.clientError).to.equal("Unauthorized");
            done();
        });

    });

    it('should send a 403', function (done) {

        var path = '/forbidden';

        app.get(path, function (req, res) {
            return res.shortResponses.forbidden();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(403);
            expect(jsonBody.clientError).to.equal("Forbidden");
            done();
        });

    });

    it('should send a 404', function (done) {

        var path = '/not-found';

        app.get(path, function (req, res) {
            return res.shortResponses.notFound();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(404);
            expect(jsonBody.clientError).to.equal("Not Found");
            done();
        });

    });

    it('should send a 409', function (done) {

        var path = '/conflict';

        app.get(path, function (req, res) {
            return res.shortResponses.conflict();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(409);
            expect(jsonBody.clientError).to.equal("Conflict");
            done();
        });

    });

    it('should send a 500', function (done) {

        var path = '/internal-server-error';

        app.get(path, function (req, res) {
            return res.shortResponses.internalServerError();
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(500);
            expect(jsonBody.serverError).to.equal("Internal Server Error");
            done();
        });

    });

    it('should send a custom body', function (done) {

        var path = '/custom-body';
        var customBody = {customBody: 'Custom Body'};

        app.get(path, function (req, res) {
            return res.shortResponses.ok(customBody);
        });

        request.get('http://localhost:' + port + path, function (err, response, body) {
            var jsonBody = JSON.parse(body);

            expect(response.statusCode).to.equal(200);
            expect(jsonBody.customBody).to.equal(customBody.customBody);
            done();
        });

    });

});