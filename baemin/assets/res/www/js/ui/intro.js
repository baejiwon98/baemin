/**
 * @file : intro.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $percent: null,
      $progressBar: null,
    },
    data: {},
    init: function init() {
      this.els.$percent = $('#percent');
      this.els.$progressBar = $('#progress-bar');
    },
    /*
    진행도를 표시한다.
    @param {function} succCallback 완료 후 호출된 함수
    */
    startProgress: function startProgress(succCallback) {
      var $percent = this.els.$percent;
      var $progressBar = this.els.$progressBar;
      var count = 0;
      var interval = setInterval(function () {
        count += 10;
        $percent.html(count);
        $progressBar.css('width', count + '%');
        if (count == 100) {
          clearInterval(interval); // 반복 실행을 멈춘다.
          succCallback();
        }
      }, 50); // 반복적으로 함수를 실행시켜준다.
    },
    moveLoginPage: function moveLoginPage() {
      M.page.html({
        url: "./goeun_login.html",
        actionType: "CLEAR_TOP"
      });
    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var existLoginData = M.data.storage('AUTO_LOGIN_AUTH');
      if (existLoginData) {
        this.startProgress(function () {
          $.sendHttp({
            path: "/api/login",
            data: {
              loginId: existLoginData.id,
              password: existLoginData.pw
            },
            succ: function (data) {
              //로그인이 성공했을 때 콜백
              M.data.global({
                'myId': existLoginData.id
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

              self.moveMainPage();
            },
            error: function () {
              self.moveLoginPage();
            },
          });
        });
      } else {
        this.startProgress(this.moveLoginPage);
      }
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
    },
  };
  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
  });
})(jQuery, M, __page__, window);