(function () {

    'use strict';

    angular.module('app.home').factory('homeManager', homeManager);

    homeManager.$inject = ['$q', '$state', 'AppContext', 'categoryManager', 'categoryService', 'Category'];

    function homeManager($q, $state, AppContext, categoryManager, categoryService, Category) {
        var manager = {
            viewData: {}
        };

        function init() {
            var promises = [],
                HOME_BLOCKS = AppContext.HOME_BLOCKS;

            if (HOME_BLOCKS[0]) {
                manager.viewData.blockA = HOME_BLOCKS[0];
                manager.viewData.blockALoader = loadBlockData(manager.viewData.blockA);
                promises.push(manager.viewData.blockALoader);
            }
            if (HOME_BLOCKS[1]) {
                manager.viewData.blockB = HOME_BLOCKS[1];
                manager.viewData.blockBLoader = loadBlockData(manager.viewData.blockB);
                promises.push(manager.viewData.blockBLoader);
            }
            if (HOME_BLOCKS[2]) {
                manager.viewData.blockC = HOME_BLOCKS[2];
                manager.viewData.blockCLoader = loadBlockData(manager.viewData.blockC);
                promises.push(manager.viewData.blockCLoader);
            }

            return $q.all(promises);
        }

        /*
        	Load block data from the backend.
         */

        function loadBlockData(block) {
            var category;

            category = createCategoryForBlock(block);
            block.category = category;

            // if collection was specified load form the backend
            if (block.collection) {
            	// if image was specified in config resolve the promise right away. This is needed in order
            	// not to show the loader over the block image
                if (block.image) {
                    return $q.when(block);
                } else {
                    return categoryService.getCategoryDetails(block.collection).then(function (data) {
                        block.title = block.title || data.title;
                        if (data.image) {
                            block.image = block.image || data.image.src;
                        }

                        return block;
                    });
                }

            } else {
                $q.when(block);
            }
        }

        function createCategoryForBlock(block) {
            return categoryManager.addFreeCategory(Category.build({
                id: block.collection,
                title: block.title,
                collectionId: block.collection,
                categories: []
            }));
        }

        init();

        return manager;
    }



})();