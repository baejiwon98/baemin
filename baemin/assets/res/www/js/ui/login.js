/**
 * @file : login.js
 * @author : 배지원
 * @date :  2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginIdIpt: null,
      $passwordIpt: null,
      $loginBtn: null,
      $autoLoginChk: null,
      $findIdBtn: null,
      $findPwBtn: null,
      $joinBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#login-id'); // input태그
      this.els.$passwordIpt = $('#password');
      this.els.$loginBtn = $('#login-btn');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$findIdBtn = $('#find-id');
      this.els.$findPwBtn = $('#find-pw');
      this.els.$joinBtn = $('#join-btn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$loginBtn.on('click', function () {
        self.login();
      });
      this.els.$findIdBtn.on('click', function () {
        M.page.html({
          url: './goeun_findId.html',
          actionType: 'NO_HISTORY',
        });
      });
      this.els.$findPwBtn.on('click', function () {
        M.page.html({
          url: './goeun_findPw1.html',
          actionType: 'NO_HISTORY',
        });
      });
      this.els.$joinBtn.on('click', function () {
        M.page.html('./saetbyeol_join1.html');
      });

    },

    setAutoLogin: function (id, pw) {
      // 자동로그인 기능
      M.data.storage('AUTO_LOGIN_AUTH', {
        id: id,
        pw: pw
      });
    },

    unsetAutoLogin: function () {
      M.data.removeStorage('AUTO_LOGIN_AUTH');
    },

    login: function login() {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim(); // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val().trim(); // 비밀번호 가져오기
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); //true /false
      if (id == '') {
        return alert('아이디를 입력해주세요');
      }
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }

      $.sendHttp({
        path: "/api/login",
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          //로그인이 성공했을 때 콜백
          if (isAutoLogin) self.setAutoLogin(id, pw);
          console.log(data);
          M.data.global({
            'myId': id
          });
          if (data.userGrade == "delivery") {
            $.movePage({
              url: './saetbyeol_main_delivery.html',
              actionType: 'CLEAR_TOP',
            });
          } else if (data.userGrade == "store") {
            $.movePage({
              url: './saetbyeol_main_employee.html',
              actionType: 'CLEAR_TOP',
            });
          } else if (data.userGrade == "member") {
            $.movePage({
              url: './saetbyeol_main_member.html',
              actionType: 'CLEAR_TOP',
            });
          }

          //alert('로그인 성공')
        },
        error: function (data) {
          console.log(data);
          alert('로그인 실패');
        }
      });
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