require.config({
    paths: {
        connecthollandsuludashboard: '../../connecthollandsuludashboard/js',
        connecthollandsuludashboardcss: '../../connecthollandsuludashboard/css'
    }
});

define(function() {

    'use strict';

    return {

        name: "Connectholland sulu dashboard",

        initialize: function(app) {

            app.components.addSource('connecthollandsuludashboard', '/bundles/connecthollandsuludashboard/js/');

            app.sandbox.mvc.routes.push({
                route: 'connectholland/dashboard',
                callback: function() {
                    return '<p>Hello awesome Sulu world!</p>'
                }
            });
        }
    };
});