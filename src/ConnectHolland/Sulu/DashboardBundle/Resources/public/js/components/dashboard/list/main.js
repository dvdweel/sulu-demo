define(['text!./list.html'], function(list) {

    var defaults = {
        templates: {
            list: list
        }
    };

    return {

        defaults: defaults,

        header: {
            title: 'dashboard.headline',
            underline: false,

            toolbar: {
                buttons: {
                    add: {},
                    deleteSelected: {}
                }
            }
        },

        layout: {
            content: {
                width: 'max'
            }
        },

        initialize: function() {
            this.render();

            this.bindDomEvents();
            this.bindCustomEvents();
        },

        render: function() {
            this.$el.html(this.templates.list());

            this.sandbox.sulu.initListToolbarAndList.call(this,
                'dashboard',
                '/admin/connectholland/dashboard/fields',
                {
                    el: this.$find('#list-toolbar-container'),
                    instanceName: 'dashboard',
                    template: this.sandbox.sulu.buttons.get({
                        settings: {
                            options: {
                                dropdownItems: [
                                    {
                                        type: 'columnOptions'
                                    }
                                ]
                            }
                        }
                    })
                },
                {
                    el: this.sandbox.dom.find('#dashboard-list'),
                    url: '/admin/connectholland/dashboard',
                    searchInstanceName: 'dashboard',
                    searchFields: ['title', 'content'],
                    resultKey: 'dashboard-items',
                    instanceName: 'dashboard',
                    actionCallback: this.toEdit.bind(this),
                    viewOptions: {
                        table: {
                            actionIconColumn: 'title'
                        }
                    }
                }
            );
        },

        toEdit: function(id) {
            this.sandbox.emit('sulu.router.navigate', 'connectholland/dashboard/edit:' + id);
        },

        toAdd: function() {
            this.sandbox.emit('sulu.router.navigate', 'connectholland/dashboard/add');
        },

        deleteItems: function(ids) {
            for (var i = 0, length = ids.length; i < length; i++) {
                this.deleteItem(ids[i]);
            }
        },

        deleteItem: function(id) {
            this.sandbox.util.save('/admin/connectholland/dashboard/' + id, 'DELETE').then(function() {
                this.sandbox.emit('husky.datagrid.dashboard.record.remove', id);
            }.bind(this));
        },

        bindDomEvents: function() {
        },

        bindCustomEvents: function() {
            this.sandbox.on('sulu.toolbar.add', this.toAdd.bind(this));

            this.sandbox.on('husky.datagrid.dashboard.number.selections', function(number) {
                var postfix = number > 0 ? 'enable' : 'disable';
                this.sandbox.emit('sulu.header.toolbar.item.' + postfix, 'deleteSelected', false);
            }.bind(this));

            this.sandbox.on('sulu.toolbar.delete', function() {
                this.sandbox.emit('husky.datagrid.dashboard.items.get-selected', this.deleteItems.bind(this));
            }.bind(this));
        }
    };
});