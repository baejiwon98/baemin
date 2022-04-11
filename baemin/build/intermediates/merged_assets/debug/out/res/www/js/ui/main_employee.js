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
      $storeBtn: null,
      $reviewBtn: null,
      $myAddressBtn: null,
      $menuBtn: null
    },
    data: {},
    init: function init() {
      this.els.$storeBtn = $('#store-category-modify');
      this.els.$reviewBtn = $('#store-review-list');
      this.els.$myAddressBtn = $('#myAddress');
      this.els.$menuBtn = $('#menuBtn');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터

    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$storeBtn.on('click', function () {
        M.page.html('./jiwon_store_category_modify.html');
      });
      this.els.$reviewBtn.on('click', function () {
        M.page.html('./jiwon_userInfo_reviewlist_employee.html');
      });
      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
      });

      this.els.$menuBtn.on('click', function () {
        var employeeId = 'EMPLID1'; // 테스트용 임의의 값 저장
        M.data.global('employeeId', employeeId); // 전역변수 지정 // employeeId는 login에서 넘어온 전역변수

        //          alert("global " +  M.data.global('employeeId'));
        //        alert("session " + M.data.global('myId'));

        M.page.html({
          url: "./eunjin_userInfo_Info_employee.html",
          param: {
            "employeeId": M.data.global('employeeId')
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