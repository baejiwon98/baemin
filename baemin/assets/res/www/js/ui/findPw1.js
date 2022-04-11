/**
 * @file : findPw1.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginIdIpt: null,
      $userNameIpt: null,
      $userEmailIpt: null,
      $cellPhoneIpt: null,
      $findPwBtn: null,
      $findIdBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginId');
      this.els.$userNameIpt = $('#userName');
      this.els.$userEmailIpt = $('#userEmail');
      this.els.$cellPhoneIpt = $('#userPhone');
      this.els.$findPwBtn = $('#findPwBtn');
      this.els.$findIdBtn = $('#findId');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$findIdBtn.on('click', function () {
        M.page.html({
          url: './goeun_findId.html',
          action: 'NO_HISTORY',
        });
      });

      this.els.$findPwBtn.on('click', function () {
        self.findPw();
      });
    },

    findPw: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var name = this.els.$userNameIpt.val().trim();
      var email = this.els.$userEmailIpt.val().trim();
      var phone = this.els.$cellPhoneIpt.val().trim();
      if (id == '') {
        return alert('아이디를 입력해주세요');
      }
      if (name == '') {
        return alert('이름을 입력해주세요');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요');
      }
      if (phone == '') {
        return alert('전화번호를 입력해주세요');
      }

      $.sendHttp({
        path: "/api/find",
        data: {
          loginId: id,
          userName: name,
          userEmail: email,
          userPhone: phone
        },
        succ: function (data) {
          if (data.existYn == 'Y') {
            console.log(data);
            M.page.html({
              path: './goeun_findPw2.html',
              param: {
                "loginId": id,
              }
            });
          } else {
            console.log(data);
            alert('본인 인증 실패! 정보를 확인하고 다시 입력해주세요');
          }
        },
        error: function (data) {
          console.log(data);
          alert('본인 인증 실패! 정보를 확인하고 다시 입력해주세요');
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