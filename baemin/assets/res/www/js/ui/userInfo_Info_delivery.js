/**
 * @file : userInfo_Info_delivery.js
 * @author : 강샛별, 배지원
 * @date : 2022-04-14
 */

// 페이지 단위 모듈
(function ($, M, window) {
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

    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      this.els.$idIpt.val(M.data.global('myId'));
      this.els.$pwIpt.val('');
      $.sendHttp({
        path: "/api/delivery/detailDelivery",
        data: {
          deliveryId: M.data.global('myId'),
        },
        succ: function (data) {
          self.els.$idIpt.val(M.data.global('myId'));
          self.els.$nameIpt.val(data.deliveryName);
          self.els.$phoneIpt.val(data.deliveryPhone.substring(0, 3) + "-" + data.deliveryPhone.substring(3, 7) + "-" + data.deliveryPhone.substring(7, ));
          self.els.$birthIpt.val(data.deliveryBirth.substring(0, 4) + "-" + data.deliveryBirth.substring(4, 6) + "-" + data.deliveryBirth.substring(6, 8));
          self.els.$emailIpt.val(data.deliveryEmail);
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });
    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      // 뒤로 가기
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      // 탈퇴
      this.els.$out.on('click', function () {
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

      // 로그아웃
      this.els.$logout.on('click', function () {
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

      // 수정하기
      this.els.$updateBtn.on('click', function () {
        self.modify();

      });

      // 비밀번호 변경
      this.els.$pwBtn.on('click', function () {
        self.changePw();
      });
    }, // end initEvent
    modify: function () {
      var self = this;
      var deliveryId = this.els.$idIpt.val().trim();
      var deliveryPhone = this.els.$phoneIpt.val().trim();
      var deliveryEmail = this.els.$emailIpt.val().trim();
      var deliveryPw = this.els.$pwIpt.val().trim();
      var phoneNumber = deliveryPhone.replace(/-/g, '');
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (deliveryPw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      if (deliveryPhone == '') {
        return alert('전화번호를 입력해주세요');
      }
      if (deliveryEmail == '') {
        return alert('이메일을 입력해주세요');
      }
      if (!patternPhone.test(phoneNumber)) {
        return alert('핸드폰 번호를 확인 해주세요');
      }
      if (deliveryEmail.length < 6 || !regExpEmail.test(deliveryEmail)) {
        return alert('메일형식이 맞지 않습니다.');
      }
      $.sendHttp({
        path: "/api/delivery/updateDelivery",
        data: {
          'deliveryId': deliveryId,
          'deliveryPhone': deliveryPhone,
          'deliveryEmail': deliveryEmail,
          'deliveryPw': deliveryPw
        },
        succ: function (data) {
          M.page.replace({
            url: "./eunjin_userInfo_info_employee.html",
          });
        },
        error: function (data) {
          alert('수정 실패');
        }
      });
    },

    changePw: function () {
      var self = this;
      var id = this.els.$idIpt.val().trim();
      var pw = this.els.$pwIpt.val().trim();
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


    outUser: function () {
      var self = this;
      var deliveryPw = this.els.$pwIpt.val().trim();
      $.sendHttp({
        path: "/api/delivery/deleteDelivery",
        data: {
          'deliveryId': M.data.param('myId'),
          'deliveryPw': deliveryPw
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
          alert("비밀번호가 일치하지 않습니다.");
        }
      });
    },

    logout: function () {
      var self = this;
      var id = this.els.$idIpt.val().trim();
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