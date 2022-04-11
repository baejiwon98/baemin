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
      $backBtn: null,
      $pwBtn: null,
      $out: null,
      $logout: null,
      $updateBtn: null,

      $idIpt: null,
      $nameIpt: null,
      $phoneIpt: null,
      $birthIpt: null,
      $emailIpt: null
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$pwBtn = $('#pwUpdate');
      this.els.$out = $('#out');
      this.els.$logout = $('#logout');
      this.els.$updateBtn = $('#updateBtn');

      this.els.$idIpt = $('#deliveryId');
      this.els.$nameIpt = $('#deliveryName');
      this.els.$phoneIpt = $('#deliveryPhone');
      this.els.$birthIpt = $('#deliveryBirth');
      this.els.$emailIpt = $('#deliveryEmail');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      //      var self = this;
      //      var id = M.data.global('deliveryId');
      //      console.log("id "+id);
      //      $.sendHttp({
      //        path : "/api/delivery/detailDelivery"
      //        data : {
      //          deliveryId : id
      //        },
      //        succ : function(data){
      //        console.log(data);
      //          self.els.$idIpt.val(deliveryId);
      //          self.els.$nameIpt.val(data.deliveryName);
      //          self.els.$phoneIpt.val(data.deliveryPhone);
      //          self.els.$birthIpt.val(data.deliveryBirth);
      //          self.els.$emailIpt.val(data.deliveryEmail);
      //       },
      //        error : function(data){
      //          console.log(data);
      //          alert("실패");
      //        }
      //       });

    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$out.on('click', function () {
        M.page.html('./goeun_login.html');
      });
      this.els.$logout.on('click', function () {
        M.page.html('./goeun_login.html');
      });
      this.els.$updateBtn.on('click', function () {
        M.page.back();
      });
      this.els.$pwBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_changePw.html');
      });

      this.els.$idIpt.on('click', function () {
        M.page.html('./eunjin_userInfo_changePw.html');
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