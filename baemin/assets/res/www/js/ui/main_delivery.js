/**
 * @file :
 * @author :
 * @date :
 */

// 페이지 단위 모듈
(function ($, M, window) {
  //  var ENV = CONFIG.ENV;
  //  var MSG = CONFIG.MSG;
  //  var CONSTANT = CONFIG.CONSTANT;
  //  var SERVER_CODE = CONFIG.SERVER_CODE;
  var page = {
    els: {
      $orderBtn: null,
      $completeBtn: null,
      $myAddressBtn: null,
      $menuBtn: null
    },
    data: {},
    init: function init() {
      this.els.$orderBtn = $('#order-request');
      this.els.$completeBtn = $('#delivery-complete');
      this.els.$myAddressBtn = $('#myAddress');
      this.els.$menuBtn = $('#menuBtn');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$orderBtn.on('click', function () {
        M.page.html('./jiwon_storelist_delivery.html');
      });
      this.els.$completeBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_orderlist_delivery.html');
      });
      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
      });
      this.els.$menuBtn.on('click', function () {
        //        $.sendHttp({
        //                    path: "api/delivery/detailDelivery",
        //                    data: {
        //                      storeNum: M.data.global("deliveryNum")
        //                    },
        //                    succ: function (data) {
        //                        M.page.html({
        //                            url: "./eunjin_userInfo_Info_delivery.html"
        //                          });
        //                    },
        //                    error: function() {
        //                        alert('detailStore 실패');
        //                    }
        //                  });
        M.page.html('./eunjin_userInfo_Info_delivery.html');
      });

    } // end initEvent
  }; // end page
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);