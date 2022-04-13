/**
 * @file : join3.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var dulStatus;
  var page = {
    els: {
      $loginIdIpt: null,
      $dupBtn: null,
      $passwordIpt: null,
      $repasswordIpt: null,
      $emailIpt: null,
      $joinBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginId');
      this.els.$dupBtn = $('#dupBtn');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$emailIpt = $('#email');
      this.els.$joinBtn = $('#joinBtn');
      this.els.$backBtn = $('#backBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      var idCon;

      this.els.$dupBtn.on('click', function () {
        self.dupId();
      });

      this.els.$joinBtn.on('click', function () {
        if (dulStatus == 'N') {
          self.join();
        } else {
          alert("다시 중복체크 하세요.");
        }
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

    },

    dupId: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      if (id == '') {
        return alert('아이디를 입력해주세요');
      }

      $.sendHttp({
        path: "/api/duplicate",
        data: {
          loginId: id,
        },
        succ: function (data) {
          dulStatus = data.dupYn;
          if (dulStatus == 'Y') {
            console.log(data);
            alert("사용 불가! 중복된 아이디가 있습니다.");
          } else {
            console.log(data);
            alert("사용 가능! 중복된 아이디가 없습니다.");
            idCon = id;
          }
        },
        error: function (data) {
          console.log(data);
          alert("사용 불가! 중복된 아이디가 있습니다.");
        }
      });

    },

    join: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var name = M.data.param('userName');
      var pw = this.els.$passwordIpt.val().trim();
      var birth = M.data.param('userBirth');
      var phone = M.data.param('userPhone');
      var nickname = M.data.param('userNickname');
      var pwCon = this.els.$repasswordIpt.val().trim();
      var email = this.els.$emailIpt.val().trim();
      var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (email.length < 6 || !regExpEmail.test(email)) {
        alert('메일형식이 맞지 않습니다.')
        return;
      }
      if (id != idCon) {
        return alert('아이디 중복확인을 다시 해주세요.');
      }
      if (id == '') {
        return alert('아이디를 입력해주세요');
      }
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      if (pwCon == '') {
        return alert('비밀번호 확인을 입력해주세요');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요');
      }
      var newpw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (pw != pwCon) {
        alert("비밀번호가 일치 하지 않습니다");
      } else {
        if (!newpw.test(pw)) {
          alert("특수문자, 숫자, 영문이 포함된 8가지 이상의 비밀번호를 넣으세요.");
          return false;
        } else {
          if (M.data.param('grade') == 'member') {
            $.sendHttp({
              path: "/api/member/join",
              data: {
                memberName: name,
                memberEmail: email,
                memberPhone: phone,
                memberNickname: nickname,
                memberBirth: birth,
                memberId: id,
                memberPw: pw,
              },
              succ: function (data) {
                console.log(data);
                M.page.html({
                  url: './join4.html',
                  actionType: 'CLEAR_TOP',
                });
              },
              error: function (data) {
                console.log(data);
                alert('회원가입실패! 다시 가입해보세요');
                M.page.html({
                  url: './goeun_login.html',
                  actionType: 'CLEAR_TOP',
                });
              }
            });
          } else if (M.data.param('grade') == 'delivery') {
            $.sendHttp({
              path: "/api/delivery/insertDelivery",
              data: {
                deliveryId: id,
                deliveryName: name,
                deliveryEmail: email,
                deliveryPhone: phone,
                deliveryBirth: birth,
                deliveryPw: pw,
              },
              succ: function (data) {
                console.log(data);
                M.page.html({
                  url: './join4.html',
                  actionType: 'CLEAR_TOP',
                });
              },
              error: function (data) {
                console.log(data);
                alert('회원가입실패! 다시 가입해보세요');
                M.page.html({
                  url: './goeun_login.html',
                  actionType: 'CLEAR_TOP',
                });
              }
            });
          }
          return true;
        }
      }
    },
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