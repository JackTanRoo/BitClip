describe('Unit: sendFactory - TxBuilder', function () {
  beforeEach(module('bitclip'));

  var $scope, $rootScope, $location, $window, $q, $timeout, transactionDetails, createController, TxBuilder, tempStore;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $scope = $rootScope.$new();
    $window = $injector.get('$window');
    $timeout = $injector.get('$timeout');

    TxBuilder = $injector.get('TxBuilder');
    $q = $injector.get('$q');

    $window.chrome = {
                      storage:{
                        local: {
                            set: function(obj , callback){ 
                              tempStore = obj;
                              callback();
                            },
                            get: function(propStrOrArray, callback){ 
                              var result = {};
                              //TODO later: must also handle case when key input
                              //has no value in tempstore;
                              if (typeof propStrOrArray === 'string'){
                                result[propStrOrArray] = tempStore[propStrOrArray];
                              } else if (Array.isArray(propStrOrArray)){
                                propStrOrArray.forEach(function(propName){
                                  result[propName] = tempStore[propName];
                                });
                              } else if (propStrOrArray === null) {
                                result = tempStore;
                              }
                              callback(result);
                            },
                            remove: function(){ },
                            clear: function(){ }
                        }
                      }
                    };
    tempStore = {
      isMainNet: false,
      mainNet: {
                  currentAddress: "",
                  currentPrivateKey: "",
                  allAddressesAndKeys: []
               },
      testNet: {
                  currentAddress: "mieyV4Y8ba87pZYJKsJRz8qcZP4b2HvWLf",
                  currentPrivateKey: "cRqGMD3MDfkEJit4HTtA3tUDcAtQkmogqrLAnuu4aBaefXCp1J79",
                  allAddressesAndKeys: []
               }
    };
    transactionDetails = {
      amount:"",
      destination:""
    };

  }));

  afterEach(function() {
    //$window.localStorage.removeItem('com.shortly'); //something like this but for chrome storage
  });

  it('sendTransaction should be a function', function () {

    expect(TxBuilder.sendTransaction).to.be.a('function');
  });


  //this async test is not working properly
  //we need chai-as-promised to test promise resolution
  it.only('should return success when sending a correctly stated transaction', function (done) {
    // var async = function(){
    //   var deferred = $q.defer();
    //   setTimeout(function(){
    //     deferred.resolve("hello");
    //     $rootScope.$apply();
    //   },300)
    //   return deferred.promise
    // };

    // async().then(console.log)





    // this.timeout(10000);
    var finish = function(err){
      console.log("finish");
      setTimeout(function(){
        done(err);
      },0)
    };

    transactionDetails.amount = 0.001;
    transactionDetails.destination = "mpduks3B8ULftm1hcbEf3jQU7iGae7mEMS";
    console.log("before sendTx");
    var sendTx = TxBuilder.sendTransaction(tempStore.testNet.currentPrivateKey, transactionDetails,false)
    
    sendTx.then(function(message){
      console.log("then")
      expect(message).to.equal("tx");
      done();
    })
    .catch(function(error){
      console.log("catch")
      finish(error);
    });
    console.log("sendTx: ", sendTx);
  });

  it('should return error when sending transaction with 0 amount', function () {
    transactionDetails.amount = 0;
    transactionDetails.destination = "mpduks3B8ULftm1hcbEf3jQU7iGae7mEMS";
    
    TxBuilder.sendTransaction(tempStore.testNet.currentPrivateKey, transactionDetails,false)
    .then(function(message, error){
      expect(error).not.to.equal(undefined);
    });
  });

  it('should return error when sending transaction with improper address', function () {
    transactionDetails.amount = 0;
    transactionDetails.destination = "non-btc address";
    
    TxBuilder.sendTransaction(tempStore.testNet.currentPrivateKey, transactionDetails,false)
    .then(function(message, error){
      expect(error).not.to.equal(undefined);
    });
  });

  it('should return error when propagating to the incorrect network', function () {
    transactionDetails.amount = 0;
    transactionDetails.destination = "mpduks3B8ULftm1hcbEf3jQU7iGae7mEMS";
    
    TxBuilder.sendTransaction(tempStore.testNet.currentPrivateKey, transactionDetails,true)
    .then(function(message, error){
      expect(error).not.to.equal(undefined);
    });
  });
});