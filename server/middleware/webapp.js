const express = require('express');
const path = require('path');

function WebappMiddleware(route, app) {
    const staticDir = path.join(__dirname, '../../', 'build');
    const indexPage = path.join(staticDir, 'index.html');
    app.use(route, express.static(staticDir));
    app.use(route, (req, res) => {
        res.set({ 'Access-Control-Allow-Origin': '*' });
        res.sendFile(indexPage);
    });
}

exports.WebappMiddleware = WebappMiddleware;
