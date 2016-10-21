require.config({
    paths: {
        connecthollandsuludashboard: '../../connecthollandsuludashboard/js',
        connecthollandsuludashboardcss: '../../connecthollandsuludashboard/css'
    }
});

define(function () {

    'use strict';

    return {

        name: "Connectholland sulu dashboard",

        initialize: function (app) {

            app.components.addSource('connecthollandsuludashboard', '/bundles/connecthollandsuludashboard/js');

            app.sandbox.mvc.routes.push({
                route: 'connectholland/dashboard',
                callback: function () {
                    return '<p>Hello awesome Sulu world!</p>'
                }
            });

            app.sandbox.mvc.routes.push({
                route: 'connectholland/dashboard/add',
                callback: function() {
                    return '<div data-aura-component="components/news/form@connecthollandsuludashboard"/>';
                }
            });

            app.sandbox.mvc.routes.push({
                route: 'news/edit::id',
                callback: function(id) {
                    return '<div data-aura-component="components/news/form@connecthollandsuludashboard" data-aura-id="' + id + '"/>';
                }
            })

        }
    };
});