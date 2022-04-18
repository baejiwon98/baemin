/**
 * @file : userInfo_Info_employee.js
 * @author : 배지원
 * @date : 2022-04-14
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var delivery;
  var takeout;
  var page = {
    els: {
      $idIpt: null,
      $pwIpt: null,
      $registNumIpt: null,
      $employeeNameIpt: null,
      $storeNameIpt: null,
      $storeCategory: null,
      $deliveryStatusChk: null,
      $pickupStatusChk: null,
      $storeAddrIpt: null,
      $employeePhoneIpt: null,
      $storePhoneIpt: null,
      $leastPriceIpt: null,
      $orderAreaIpt: null,
      $deliveryPriceIpt: null,
      $storeEmailIpt: null,

      $deliveryBtn: null,
      $pickUpBtn: null,
      $modifyBtn: null,
      $changePwBtn: null,
      $userLogoutBtn: null,
      $userOutBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$idIpt = $('#employeeId');
      this.els.$pwIpt = $('#employeePw');
      this.els.$registNumIpt = $('#employee-num');
      this.els.$employeeNameIpt = $('#employee-name');
      this.els.$storeNameIpt = $('#store-name');
      this.els.$storeEmailIpt = $('#store-email');
      this.els.$storeCategory = $('#store-category');
      this.els.$storeAddrIpt = $('#store-addr');
      this.els.$employeePhoneIpt = $('#employee-phone');
      this.els.$storePhoneIpt = $('#store-phone');
      this.els.$leastPriceIpt = $('#least-price');
      this.els.$orderAreaIpt = $('#order-area');
      this.els.$deliveryPriceIpt = $('#delivery-price');
      this.els.$deliveryBtn = $('#delivery-status');
      this.els.$pickUpBtn = $('#pickup-status');

      this.els.$backBtn = $('#backBtn');
      this.els.$modifyBtn = $('#updateBtn');
      this.els.$changePwBtn = $('#pwUpdate');
      this.els.$userLogoutBtn = $('#logout');
      this.els.$userOutBtn = $('#out');
    },
    initView: function initView() {
      var self = this;
      this.els.$idIpt.val(M.data.global('myId'));
      this.els.$pwIpt.val('');
      $.sendHttp({
        path: "/api/store/detailStore",
        data: {
          "employeeId": M.data.global('myId'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$registNumIpt.val(data.employeeNum);
          self.els.$employeeNameIpt.val(data.employeeName);
          self.els.$storeNameIpt.val(data.storeName);
          self.els.$storeAddrIpt.val(data.storeAddr);
          self.els.$employeePhoneIpt.val(data.employeePhone.substring(0, 3) + "-" + data.employeePhone.substring(3, 7) + "-" + data.employeePhone.substring(7, ));
          self.els.$storePhoneIpt.val(data.storePhone.substring(0, 3) + "-" + data.storePhone.substring(3, 7) + "-" + data.storePhone.substring(7, ));
          self.els.$leastPriceIpt.val(data.leastPrice);
          self.els.$orderAreaIpt.val(data.orderArea);
          self.els.$deliveryPriceIpt.val(data.deliveryPrice);
          self.els.$storeEmailIpt.val(data.employeeEmail);

          $('#store-category').val(data.storeCategoryNum).prop("selected", true);

          if (data.deliveryStatus == 'Y') {
            $("#delivery-status").prop("checked", true);
            delivery = 'Y';
          } else {
            $("#delivery-status").prop("checked", false);
            delivery = 'N';
          }
          if (data.pickupStatus == 'Y') {
            $("#pickup-status").prop("checked", true);
            takeout = 'Y';
          } else {
            $("#pickup-status").prop("checked", false);
            takeout = 'N';
          }
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

      this.els.$deliveryBtn.on('click', function () {
              if ($("input:checkbox[id='delivery-status']").prop("checked")) {
                delivery = 'Y';
              } else {
                delivery = 'N';
              }
            });

            this.els.$pickUpBtn.on('click', function () {
              if ($("input:checkbox[id='pickup-status']").prop("checked")) {
                takeout = 'Y';
              } else {
                takeout = 'N';
              }
            });

      this.els.$backBtn.on('click', function () {
        M.page.back();
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
      var pw = this.els.$pwIpt.val().trim();
      if (pw == '') {
        alert('비밀번호를 입력해주세요.');
      }
      $.sendHttp({
        path: "/api/store/deleteStore",
        data: {
          'employeeId': M.data.global('myId'),
          'employeePw': pw
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
          alert("탈퇴 실패했습니다. 다시 시도해주세요.ㅂ");
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

    modify: function () {
      var self = this;
      var id = this.els.$idIpt.val().trim();
      var pw = this.els.$pwIpt.val().trim();
      var name = this.els.$storeNameIpt.val().trim();
      var employeePhone = this.els.$employeePhoneIpt.val().trim();
      var storePhone = this.els.$storePhoneIpt.val().trim();
      var email = this.els.$storeEmailIpt.val().trim();
      var addr = this.els.$storeAddrIpt.val();
      var orderArea = this.els.$orderAreaIpt.val();
      var leastPrice = this.els.$leastPriceIpt.val();
      var deliveryPrice = this.els.$deliveryPriceIpt.val();
      var storeCategory = this.els.$storeCategory.val().trim();
      var phoneNumberEmp = employeePhone.replace(/-/g, '');
      var phoneNumberStore = storePhone.replace(/-/g, '');
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      if (name == '') {
        return alert('상호명을 입력해주세요');
      }
      if (storeCategory == '') {
        return alert('가게 카테고리를 선택해주세요');
      }
      if (addr == '') {
        return alert('사업자 주소를 입력해주세요');
      }
      if (storePhone == '') {
        return alert('운영전화번호를 입력해주세요');
      }
      if (employeePhone == '') {
        return alert('연락처를 입력해주세요');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요');
      }
      if (!patternPhone.test(phoneNumberEmp)) {
        return alert('연락처를 확인 해주세요');
      }
      if (!patternPhone.test(phoneNumberStore)) {
        return alert('운영전화번호를 확인 해주세요');
      }
      if (email.length < 6 || !regExpEmail.test(email)) {
        return alert('메일형식이 맞지 않습니다.');
      }
      if (leastPrice == '') {
        return alert('최소 주문금액을 입력해주세요')
      }
      if (orderArea == '') {
        return alert('주문가능지역을 입력해주세요')
      }
      if (deliveryPrice == '') {
        return alert('배달팁을 입력해주세요');
      }
      $.sendHttp({
        path: "/api/store/updateStore",
        data: {
          storeName: name,
          storeAddr: addr,
          employeePhone: phoneNumberEmp,
          employeeEmail: email,
          employeeId: id,
          employeePw: pw,
          deliveryStatus: delivery,
          pickupStatus: takeout,
          storePhone: phoneNumberStore,
          leastPrice: leastPrice,
          orderArea: orderArea,
          deliveryPrice: deliveryPrice,
          storeCategoryNum: storeCategory,
        },
        succ: function (data) {
          M.page.replace({
            url: "./eunjin_userInfo_Info_employee.html",
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
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);