define(['underscore', 'jquery', 'text!./form.html'], function(_, $, form) {

    return {

        defaults: {
            templates: {
                form: form,
                url: '/admin/#connectholland/dashboard<% if (!!id) { %>/<%= id %><% } %>'
            },
            translations: {
                title: 'public.title',
                content: 'dashboard.content'
            }
        },

        header: {
            title: 'dashboard.headline',
            toolbar: {
                buttons: {
                    save: {
                        parent: 'saveWithOptions'
                    }
                }
            }
        },

        layout: {
            content: {
                width: 'fixed',
                leftSpace: true,
                rightSpace: true
            }
        },

        initialize: function() {
            this.render();
            this.bindDomEvents();
            this.bindCustomEvents();
        },

        render: function() {
            this.$el.html(this.templates.form({translations: this.translations}));

            this.form = this.sandbox.form.create('#dashboard-form');
            this.form.initialized.then(function() {
                this.sandbox.form.setData('#dashboard-form', this.data || {});
            }.bind(this));
        },

        bindDomEvents: function() {
            this.$el.find('input, textarea').on('keypress', function() {
                this.sandbox.emit('sulu.header.toolbar.item.enable', 'save');
            }.bind(this));
        },

        bindCustomEvents: function() {
            this.sandbox.on('sulu.toolbar.save', this.save.bind(this));
            this.sandbox.on('sulu.header.back', function() {
                this.sandbox.emit('sulu.router.navigate', 'connectholland/dashboard');
            }.bind(this));
        },

        save: function(action) {
            if (!this.sandbox.form.validate('#dashboard-form')) {
                return;
            }

            var data = this.sandbox.form.getData('#dashboard-form');
                url = this.templates.url({id: this.options.id});

            this.sandbox.util.save(url, !this.options.id ? 'POST' : 'PUT', data).then(function(response) {
                this.afterSave(response, action);
            }.bind(this));
        },

        afterSave: function(response, action) {
            this.sandbox.emit('sulu.header.toolbar.item.disable', 'save');

            if (action === 'back') {
                this.sandbox.emit('sulu.router.navigate', 'connectholland/dashboard');
            } else if (action === 'new') {
                this.sandbox.emit('sulu.router.navigate', 'connectholland/dashboard/add');
            } else if (!this.options.id) {
                this.sandbox.emit('sulu.router.navigate', 'connectholland/dashboard/edit:' + response.id);
            }
        },

        loadComponentData: function() {
            var promise = $.Deferred();

            if (!this.options.id) {
                promise.resolve();

                return promise;
            }
            this.sandbox.util.load(_.template(this.defaults.templates.url, {id: this.options.id})).done(function(data) {
                promise.resolve(data);
            });

            return promise;
        }
    };
});