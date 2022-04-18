/**
 * @file : main_delivery.js
 * @author : 배지원
 * @date : 2022-04-14
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $orderBtn: null,
      $completeBtn: null,
      $myAddressBtn: null,
      $menuBtn: null,
      $myAddressBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$orderBtn = $('#order-request');
      this.els.$completeBtn = $('#delivery-complete');
      this.els.$myAddressBtn = $('#myAddress');
      this.els.$menuBtn = $('#menuBtn');
      this.els.$myAddressBtn = $('#map-title');
    }, // end init

    initView: function initView() {
      var self = this;
      var id = M.data.global('myId');
      $.sendHttp({
        path: "/api/delivery/detailDelivery",
        data: {
          "deliveryId": M.data.global('myId'),
        },
        succ: function (data) {
          console.log(data);

          M.data.global('grade', 'delivery');
          M.data.global('deliveryNum', data.deliveryNum);
          M.data.global('myAddress', data.deliveryAddr);
          M.data.global('myAddressDetail', data.deliveryAddrdetail);
          const element = document.getElementById('map-title');
          element.innerHTML = '<strong>' + M.data.global('myAddress') + ' ' + M.data.global('myAddressDetail') + '</strong>';
          console.log(M.data.global('deliveryNum'));
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });
    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      // 배달신청
      this.els.$orderBtn.on('click', function () {
        M.page.html('./eunjin_orderList_delivery_all.html');
      });

      // 배달완료
      this.els.$completeBtn.on('click', function () {
        M.page.html('./eunjin_orderList_delivery_complete.html');
      });

      // 내 주소
      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
      });

      // 마이페이지
      this.els.$menuBtn.on('click', function () {
        M.page.html({
          url: "./eunjin_userInfo_Info_delivery.html",
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

  M.onRestore(function () {
    pageFunc.initView();
  });
})(jQuery, M, __page__, window);