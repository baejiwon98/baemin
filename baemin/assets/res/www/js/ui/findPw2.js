/**
 * @file : findPw2.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginId: null,
      $passwordIpt: null,
      $repasswordIpt: null,
      $changePwBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginId = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$changePwBtn = $('#changePwBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      this.els.$loginId.val(M.data.param('loginId'));
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$changePwBtn.on('click', function () {
        self.changePw();
      });
    },

    changePw: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      var pwCon = this.els.$repasswordIpt.val().trim();
      if (pw == '') {
        return alert('새 비밀번호를 입력해주세요');
      }
      if (pwCon == '') {
        return alert('새 비밀번호 확인을 입력해주세요');
      }
      var newpw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (pw != pwCon) {
        alert("비밀번호가 일치 하지 않습니다");
      } else {
        if (!newpw.test(pw)) {
          alert("특수문자, 숫자, 영문이 포함된 8가지 이상의 비밀번호를 넣으세요.");
          return false;
        } else {
          $.sendHttp({
            path: "/api/password",
            data: {
              loginId: id,
              password: pw
            },
            succ: function (data) {
              console.log(data);
              alert('비밀번호가 변경되었습니다.');
              M.data.removeStorage('AUTO_LOGIN_AUTH');
              M.page.html({
                url: "./goeun_login.html",
                actionType: 'CLEAR_TOP'
              });
            },
            error: function (data) {
              console.log(data);
              alert('비밀번호가 변경되지 않았습니다. 다시 입력해주세요.');
            }
          });
          return true;
        }
      }
    }
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);