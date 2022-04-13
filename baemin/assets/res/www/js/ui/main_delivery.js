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

      // 배달신청
      this.els.$orderBtn.on('click', function () {
        M.page.html('./eunjin_orderList_delivery.html');
      });

      // 배달완료
      this.els.$completeBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_myOrderList_delivery.html');
      });

      // 내 주소
      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
      });

      // 마이페이지
      this.els.$menuBtn.on('click', function () {
        var deliveryId = 'DELID'; // 테스트용 임의의 값 저장
        M.data.global('deliveryId', deliveryId); // 전역변수 지정 // deliveryId login에서 넘어온 전역변수

        //  alert("global " + M.data.global('deliveryId'));
        //  alert("session " + M.data.global('myId'));

        M.page.html({
          url: "./eunjin_userInfo_Info_delivery.html",
          param: {
            "deliveryId": M.data.global('deliveryId')
          }
        });


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