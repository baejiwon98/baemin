/**
 * @file : userInfo_info_member.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var seqNo = [];
  var page = {
    els: {
      $myOrderListBtn: null,
      $myReviewBtn: null,
      $loginIdIpt: null,
      $userNameIpt: null,
      $userNicknameIpt: null,
      $userPhoneIpt: null,
      $userBirthIpt: null,
      $userEmailIpt: null,
      $modifyBtn: null,
      $changePwBtn: null,
      $userLogoutBtn: null,
      $userOutBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$myOrderListBtn = $('#myOrderList-btn');
      this.els.$myReviewBtn = $('#myReview-btn');
      this.els.$loginIdIpt = $('#loginId');
      this.els.$userNameIpt = $('#userName');
      this.els.$passwordIpt = $('#password');
      this.els.$userNicknameIpt = $('#userNickname');
      this.els.$userPhoneIpt = $('#userPhone');
      this.els.$userBirthIpt = $('#userBirth');
      this.els.$userEmailIpt = $('#userEmail');
      this.els.$modifyBtn = $('#modify-btn');
      this.els.$changePwBtn = $('#changePw');
      this.els.$userLogoutBtn = $('#userLogout');
      this.els.$userOutBtn = $('#userOut');
    },

    initView: function initView() {
      var self = this;
      this.els.$loginIdIpt.val(M.data.global('myId'));
      this.els.$passwordIpt.val('');
      $.sendHttp({
        path: "/api/member/info",
        data: {
          "memberId": M.data.global('myId'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$userNameIpt.val(data.memberName);
          self.els.$userNicknameIpt.val(data.memberNickname);
          self.els.$userPhoneIpt.val(data.memberPhone.substring(0, 3) + "-" + data.memberPhone.substring(3, 7) + "-" + data.memberPhone.substring(7, ));
          self.els.$userBirthIpt.val(data.memberBirth.substring(0, 4) + "-" + data.memberBirth.substring(4, 6) + "-" + data.memberBirth.substring(6, 8));
          self.els.$userEmailIpt.val(data.memberEmail);
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myOrderListBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_myOrderList_member.html',
        });
      });
      this.els.$myReviewBtn.on('click', function () {
        M.page.html({
          url: './jiwon_userInfo_reviewlist_member.html',
        });
      });
      this.els.$modifyBtn.on('click', function () {
        self.modify();
      });
      this.els.$changePwBtn.on('click', function () {
        self.changePw();
      });
      this.els.$userLogoutBtn.on('click', function () {
        M.pop.alert({
          title: '확인',
          message: '로그아웃 하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.logout();
            }
          }
        });
      });
      this.els.$userOutBtn.on('click', function () {

        M.pop.alert({
          title: '확인',
          message: '진짜 탈퇴하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.outUser();
            }
          }
        });
      });
    },
    outUser: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      $.sendHttp({
        path: "/api/checkPw",
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          console.log(data);
          if (data.confirmMsg == "Y") {
            $.sendHttp({
              path: "/api/member/out",
              data: {
                memberId: id,
              },
              succ: function (data) {
                console.log(data);
                M.data.removeStorage('AUTO_LOGIN_AUTH');
                M.page.html({
                  path: "./goeun_login.html",
                  actionType: 'CLEAR_TOP',
                });
              },
              error: function (data) {
                console.log(data);
                alert('탈퇴에 실패하였습니다.');
              }
            });
          } else {
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
          }
        },
        error: function (data) {
          console.log(data);
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        },
      });
    },

    logout: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      $.sendHttp({
        path: "/api/logout",
        data: {
          loginId: id,
        },
        succ: function (data) {
          console.log(data);
          M.data.removeStorage('AUTO_LOGIN_AUTH');
          M.page.html({
            path: "./goeun_login.html",
            actionType: 'CLEAR_TOP',
          });
        },
        error: function (data) {
          console.log(data);
          alert('로그아웃 불가!');
        }
      });
    },

    changePw: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      $.sendHttp({
        path: "/api/checkPw",
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          console.log(data);
          if (data.confirmMsg == "Y") {
            M.page.html({
              path: "./goeun_findPw2.html",
              action: 'NO_HISTORY',
              param: {
                "loginId": id
              },
            });
          } else {
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
          }
        },
        error: function (data) {
          console.log(data);
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        }
      });
    },

    modify: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      var name = this.els.$userNameIpt.val().trim();
      var nickname = this.els.$userNicknameIpt.val().trim();
      var phone = this.els.$userPhoneIpt.val().trim();
      var birth = this.els.$userBirthIpt.val().trim();
      var email = this.els.$userEmailIpt.val().trim();
      var phoneNumber = phone.replace(/-/g, '');
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      if (nickname == '') {
        return alert('닉네임을 입력해주세요');
      }
      if (phone == '') {
        return alert('전화번호를 입력해주세요');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요');
      }
      if (!patternPhone.test(phoneNumber)) {
        return alert('핸드폰 번호를 확인 해주세요');
      }
      if (email.length < 6 || !regExpEmail.test(email)) {
        return alert('메일형식이 맞지 않습니다.');
      }
      $.sendHttp({
        path: "/api/member/update",
        data: {
          memberId: id,
          memberPw: pw,
          memberNickname: nickname,
          memberPhone: phoneNumber,
          memberEmail: email,
        },
        succ: function (data) {
          M.page.replace({
            url: "./eunjin_userInfo_info_member.html",
          });
        },
        error: function (data) {
          console.log(data);
          alert('수정에 실패하였습니다');
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

  M.onRestore(function () {
    pageFunc.initView();
  });

})(jQuery, M, __page__, window);