require.config({
    paths: {
        connecthollandsuludashboard: '../../connecthollandsuludashboard/js',
        connecthollandsuludashboardcss: '../../connecthollandsuludashboard/css'
    }
});

define(function () {

    'use strict';

    return {

        name: "Connect Holland Dashboard",

        initialize: function (app) {

            app.components.addSource('connecthollandsuludashboard', '/bundles/connecthollandsuludashboard/js/components');

            app.sandbox.mvc.routes.push({
                route: 'connectholland/dashboard',
                callback: function () {
                    return '<div data-aura-component="dashboard/list@connecthollandsuludashboard" data-aura-name="sulu" />';
                }
            });

            app.sandbox.mvc.routes.push({
                route: 'connectholland/dashboard/add',
                callback: function(){
                    return '<div data-aura-component="dashboard/form@connecthollandsuludashboard"/>';
                }
            });

            app.sandbox.mvc.routes.push({
                route: 'dashboard/edit::id',
                callback: function(id) {
                    return '<div data-aura-component="dashboard/form@connecthollandsuludashboard" data-aura-id="' + id + '"/>';
                }
            });
        }
    };
});