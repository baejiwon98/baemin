/**
 * @file : findId.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $userNameIpt: null,
      $userEmailIpt: null,
      $cellPhoneIpt: null,
      $findIdBtn: null,
      $findPwBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$userNameIpt = $('#userName');
      this.els.$userEmailIpt = $('#userEmail');
      this.els.$cellPhoneIpt = $('#userPhone');
      this.els.$findIdBtn = $('#findIdBtn');
      this.els.$findPwBtn = $('#findPw');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$findIdBtn.on('click', function () {
        self.findId();
      });

      this.els.$findPwBtn.on('click', function () {
        M.page.html({
          url: './goeun_findPw1.html',
          action: 'NO_HISTORY',
        });
      });

    },

    findId: function () {
      var self = this;
      var name = this.els.$userNameIpt.val().trim();
      var email = this.els.$userEmailIpt.val().trim();
      var phone = this.els.$cellPhoneIpt.val().trim();
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
        path: "/api/findId",
        data: {
          userName: name,
          userEmail: email,
          userPhone: phone,
        },
        succ: function (data) {
          console.log(data);
          alert('아이디는 ' + data.loginId + ' 입니다.');
          M.page.html({
            url: './goeun_login.html',
            actionType: 'CLEAR_TOP'
          });
        },
        error: function (data) {
          console.log(data);
          alert('해당하는 아이디가 없습니다.');
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