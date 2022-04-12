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
      $emailIpt: null,
      $pwIpt: null,

      $phoneConBtn: null,
      $emailConBtn: null

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
      this.els.$pwIpt = $('#deliveryPw');

      this.els.$phoneConBtn = $('#phoneConBtn');
      this.els.$emailConBtn = $('#emailConBtn');

    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var id = M.data.param('deliveryId');

      // 마이페이지 상세보기
      $.sendHttp({
        path: "/api/delivery/detailDelivery",
        data: {
          deliveryId: id
        },
        succ: function (data) {
          alert("data.deliveryId : " + data.deliveryId);
          self.els.$idIpt.val(id);
          self.els.$nameIpt.val(data.deliveryName);
          self.els.$phoneIpt.val(data.deliveryPhone);
          self.els.$birthIpt.val(data.deliveryBirth);
          self.els.$emailIpt.val(data.deliveryEmail);
        },
        error: function (data) {
          alert('실패 ' + data);
        }
      });
    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      // 뒤로 가기
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      // 탈퇴
      this.els.$out.on('click', function () {
        var deliveryPw = $('#deliveryPw').val();
        $.sendHttp({
          path: "/api/delivery/deleteDelivery",
          data: {
            'deliveryId': M.data.param('deliveryId'),
            'deliveryPw': deliveryPw
          },
          succ: function (data) {
            alert('탈퇴완료');
            M.page.html('./goeun_login.html');
          },
          error: function (data) {
            alert("비밀번호가 일치하지 않습니다.");
          }
        });

      });

      // 로그아웃
      this.els.$logout.on('click', function () {
        M.page.html('./goeun_login.html');
      });

      // 수정하기
      this.els.$updateBtn.on('click', function () {
        var self = this;
        var deliveryId = M.data.param('deliveryId');
        var deliveryName = $('#deliveryName').val();
        var deliveryPhone = $('#deliveryPhone').val();
        var deliveryBirth = $('#deliveryBirth').val();
        var deliveryEmail = $('#deliveryEmail').val();
        var deliveryPw = $('#deliveryPw').val();

        console.log("deliveryId " + deliveryId);
        console.log("deliveryName " + deliveryName);
        console.log("deliveryPhone " + deliveryPhone);
        console.log("deliveryBirth " + deliveryBirth);
        console.log("deliveryEmail " + deliveryEmail);
        console.log("deliveryPw " + deliveryPw);

        $.sendHttp({
          path: "/api/delivery/updateDelivery",
          data: {
            'deliveryId': M.data.param('deliveryId'),
            'deliveryName': deliveryName,
            'deliveryPhone': deliveryPhone,
            'deliveryBirth': deliveryBirth,
            'deliveryEmail': deliveryEmail,
            'deliveryPw': deliveryPw
          },
          succ: function (data) {
            alert('수정 완료');
            M.page.back();
          },
          error: function (data) {
            alert('수정 실패');
          }
        });
      });

      // 비밀번호 변경
      this.els.$pwBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_changePw.html');
      });

      // 연락처 인증
      this.els.$phoneConBtn.on('click', function () {
        var deliveryPhone = $('#deliveryPhone').val();
        $.sendHttp({
          path: "/api/delivery/phoneCon",
          data: {
            'deliveryId': M.data.param('deliveryId'),
            'deliveryPhone': deliveryPhone
          },
          succ: function (data) {
            alert('일치합니다.');
          },
          error: function (data) {
            alert(" 일치하지 않습니다.");
          }
        });
      });

      // 이메일 인증
      this.els.$emailConBtn.on('click', function () {
        var deliveryEmail = $('#deliveryEmail').val();
        $.sendHttp({
          path: "/api/delivery/emailCon",
          data: {
            deliveryId: M.data.param('deliveryId'),
            deliveryEmail: deliveryEmail
          },
          succ: function (data) {
            alert('일치합니다.');
          },
          error: function (data) {
            alert(" 일치하지 않습니다.");
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