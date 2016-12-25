(function () {
    'use strict';
  angular.module('app.products').controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', '$http', '$state', '$stateParams', 'productsManager', 'categoryManager','$ionicSearchPanel', '$ionicScrollDelegate', '$rootScope','$ionicHistory','$ionicPosition','$location','$timeout','$ionicSlideBoxDelegate'];

    function ProductsController($scope, $http, $state, $stateParams, productsManager, categoryManager,$ionicSearchPanel, $ionicScrollDelegate, $rootScope,$ionicHistory,$ionicPosition,$location,$timeout,$ionicSlideBoxDelegate) {

      // console.log($stateParams.XG);

        var vm = this,
            categoryId = $stateParams.categoryId,
            searchKey = $stateParams.searchKey,
            viewType = $stateParams.viewType,
            currentPage = 0,
            PAGE_SIZE = 30,
            requestTimeout;


            //noinspection JSUnresolvedVariable

        // properties
        $rootScope.index = 0;
        $rootScope.catid = categoryId;

        $scope.items = [];
        vm.products = [];
        vm.subcategories = productsManager.getNavigationLinks(categoryId);
        vm.viewOptions = productsManager.viewOptions;
        vm.addToCart = productsManager.addToCart;
        vm.toggleFavorite = productsManager.toggleFavorite;
        vm.isFavorite = productsManager.isFavorite;
        vm.isThisProductFavourite = productsManager.isThisProductFavourite;
        vm.showTabs = false;
        vm.activeSlide = 0;
        vm.searchKey = searchKey;
        vm.productsLoading = false;
        vm.infiniteLoading = false;
        vm.noMoreProducts = false;
        vm.productRequest = null;
        // set view type specific properties
        productsManager.initViewModel(vm, viewType);

        // methods
        vm.handleSlideChange = handleSlideChange;
        vm.toggleViewMode = toggleViewMode;
        vm.loadMoreProducts = loadMoreProducts;
        vm.navigateToProductDetails = navigateToProductDetails;
        vm.handleSortChange = handleSortChange;


      $scope.$on('$ionicView.beforeEnter', function() {
        $ionicSlideBoxDelegate.update();
      });

      $scope.$on('$ionicView.afterEnter', function (event, transition) {
            if (transition.direction !== 'back') {
                if (vm.hasTabs) {
                    vm.showTabs = true;
                    // vm.subcategories = productsManager.getNavigationLinks($rootScope.catid);
                    console.log('A==' + $rootScope.slide[$rootScope.lastindex].subindex);
                    handleSlideChange(0);
                    $ionicSlideBoxDelegate.slide($rootScope.slide[$rootScope.lastindex].subindex,20);
                } else {
                    vm.productRequest = loadProducts(categoryId, searchKey).then(function (products) {
                        $ionicScrollDelegate.scrollTop();
                        return applyProducts(products);

                    });
                }
            }else{
              // handleSlideChange(0);
            }

        $ionicScrollDelegate.scrollBy(48*$rootScope.lastindex,0,false);

        });



      /**Code changed by Nirmal start here
       *
       * @type {Array}
       */




      vm.categories = $rootScope.categories;
      vm.categoryRequest = null;
      vm.categoryEmptyMessage = 'No categories';
      vm.showSpinner = true;
      // if(categoryId==1){
      //   vm.categoryRequest = categoryManager.loadNavCategories().then(function (newCategories) {
      //     vm.categories = newCategories;
      //     $rootScope.gs=[];
      //     $rootScope.gs=vm.categories;
      //     return vm.categories;
      //   }).finally(function () {
      //     vm.showSpinner = false;
      //   });
      // }else{
      //   vm.categories = $rootScope.gs;
      // }


      vm.A = A;
      function A(product,$index) {
        // console.log($index);
        productsManager.addToCart(product.variants[0],1);
      }
      vm.B = B;
      function B(ind,product,index) {
        if ($scope.items[index]){
          $scope.items[index]=false;
        }else{
          $scope.items[index]=true;
        }
        productsManager.toggleFavorite(vm.products[index],$scope.items[index]);
      }

      vm.C =C;
      function C(index,product) {
        $scope.items[index] = productsManager.isThisProductFavourite(product);
        return $scope.items[index];
      }

      vm.D =D;
      function D(index) {
        if (index == $rootScope.lastindex){
           $rootScope.myList[index] = true;
        }else{
           $rootScope.myList[index] = false;
        }

        return $rootScope.myList[index];
      }




      // $scope.$on('$ionicView.afterEnter', function () {
      //   if ($rootScope.i==12){
      //     // $ionicScrollDelegate.$getByHandle('small').scrollTo($rootScope.x);
      //   }
      //   vm.productRequest = loadProducts(categoryId, searchKey).then(function (products) {
      //     // $ionicScrollDelegate.scrollTop();
      //     return applyProducts(products);
      //   });
      // });
      vm.navigateToCategory = navigateToCategory;
      function navigateToCategory(category,$event,index) {
          $rootScope.i=12;
          $rootScope.x = $event.x;

          if ($rootScope.lastindex != 0){
            $rootScope.slide[$rootScope.lastindex] = {index: $rootScope.lastindex, subindex: $rootScope.index};
          }
          $rootScope.lastindex = index;
          // $rootScope.myList[$rootScope.lastindex] = false;
          // $ionicScrollDelegate.$getByHandle('small').scrollTo($event.x);
        // vm.productRequest = loadProducts(category.id, searchKey).then(function (products) {
        //   // $ionicScrollDelegate.scrollTop();
        //   return applyProducts(products);
        // });
        //



        $rootScope.catid = category.id;
        // console.log('SLIDE INDEX==' + $rootScope.index);
        // vm.subcategories = productsManager.getNavigationLinks(category.id);
        handleSlideChange(0);
        // console.log(vm.subcategories);

       $ionicSlideBoxDelegate.slide(0,100);


        // $timeout(function(){
        //   $ionicSlideBoxDelegate.update();
        //   $scope.$apply();
        // }, 2000);
        var options = categoryManager.getCategoryNavigationOptions(category);



        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack : true
        });
        $state.go(options.url, {
          categoryId: category.id,
          viewType: options.viewType,
          categories12:$rootScope.gs
        },{reload: true,inherit: false, notify: true});


      }


      /**Code changes start by Nirmal End here
       *
       */

      $scope.$on('search.submit', function (event, key) {
            searchKey = key;
            vm.pageTitle = searchKey;
            resetState();
            vm.productRequest = loadProducts(categoryId, searchKey).then(function (products) {
                return applyProducts(products);
            });
        });

        function handleSlideChange(index) {
          $rootScope.index = index;
            if (vm.subcategories && index in vm.subcategories) {
                categoryId = vm.subcategories[index].id;
                resetState();
                vm.productRequest = loadProducts(categoryId, '').then(function (products) {
                    return applyProducts(products);
                });
            }

        }

        function loadProducts(categoryId, searchKey) {

            var requestPromise = productsManager.findProducts({
                key: searchKey,
                category: categoryId,
                page: currentPage,
                pageSize: PAGE_SIZE,
                sort: 'date_asc'
            });

            requestTimeout = requestPromise.httpTimeout;

            vm.productsLoading = true;

            return requestPromise.then(function (result) {
                vm.productsLoading = false;
                return result;
            }, function (err) {
                if (err.status !== -1) {
                    vm.productsLoading = false;
                }
                throw err;
            });
        }
      /*
       * Change here
       */
        function loadMoreProducts() {
            currentPage++;
            vm.infiniteLoading = true;
            loadProducts(categoryId, searchKey).then(function (products) {
                if (products.length) {
                    //addition test of changing price in array of objects sent to page
                    products.forEach(function(product){
                      if(($rootScope.globalCurrencyChangeRate !== "") && ($rootScope.globalCurrencyChangeRate !== undefined)){
                        product._price = parseFloat(product._price).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);

                        if(product._salePrice !== null){
                          product._salePrice = parseFloat(product._salePrice).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);
                        }
                      }
                      if(product._variants.length > 0){

                        product._variants.forEach(function(variant){
                          //changing price here if needed
                          if(($rootScope.globalCurrencyChangeRate !== "") && ($rootScope.globalCurrencyChangeRate !== undefined)){
                            variant._price = variant._price * $rootScope.globalCurrencyChangeRate;
                            if(variant._salePrice !== null){
                              variant._salePrice = parseFloat(variant._salePrice).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);
                            }
                          }

                        });
                      }
                    });
                    vm.products = vm.products.concat(products);

                    if (products.length < PAGE_SIZE) {
                        vm.noMoreProducts = true;
                    }
                } else {
                    vm.noMoreProducts = true;
                }

            }).finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                vm.infiniteLoading = false;
            });
        }

        function navigateToProductDetails(product) {
            productsManager.setCurrentProduct(product);
            $state.go('app.product-details', {
                'productId': product.id
            });
        }

        function toggleViewMode() {
            productsManager.toggleViewMode();
        }

        function handleSortChange() {
            resetState();
            vm.productRequest = loadProducts(categoryId, searchKey).then(function (products) {
                return applyProducts(products);
            });
        }

        function resetState() {
            currentPage = 0;
            vm.noMoreProducts = false;
            if (requestTimeout) {
                requestTimeout.resolve();
                requestTimeout = null;
            }

        }
        /*
       * Change here
       */
        function applyProducts(products) {
            products.forEach(function(product){
              $scope.items.push(false);
              if(($rootScope.globalCurrencyChangeRate !== "") && ($rootScope.globalCurrencyChangeRate !== undefined)){
                product._price = parseFloat(product._price).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);

                if(product._salePrice !== null){
                  product._salePrice = parseFloat(product._salePrice).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);
                }
              }

              if(product._variants.length > 0){

                product._variants.forEach(function(variant){
                    //changing price here if needed
                    if(($rootScope.globalCurrencyChangeRate !== "") && ($rootScope.globalCurrencyChangeRate !== undefined)){

                      variant._price = parseFloat(variant._price).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);

                      if(variant._salePrice !== null){
                        variant._salePrice = parseFloat(variant._salePrice).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);
                      }
                    }
                  });
                }
              });

            if( ($rootScope.globalCountry !== '') && ($rootScope.globalCountry !== undefined)){
              vm.globalCountry = $rootScope.globalCountry;
            }
            vm.products = products;

          return products;
        }


    }

})();



