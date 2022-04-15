/**
 * @file : payment_takeout.js
 * @author : 배지원
 * @date : 2022-04-15
 */
(function ($, M, CONFIG, window) {
  var paymentType;
  var page = {
    els: {
      $goPaymentBtn: null,
      $orderPhoneIpt: null,
      $storeRequestIpt: null,
    },
    data: {},
    init: function init() {
      this.els.$goPaymentBtn = $('#go-payment-btn');
      this.els.$orderPhoneIpt = $('#orderPhone');
      this.els.$storeRequestIpt = $('#storeRequest');
    },

    initView: function initView() {
      var self = this;
      $('#totalObjectPrice').text(M.data.param('totalObjectPrice'));
      $('#deliveryTip').text(M.data.param('deliveryTip'));
      $('#totalPaymentPrice').text(M.data.param('totalPaymentPrice'));
      this.els.$orderPhoneIpt.val(M.data.global('phone'));
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$goPaymentBtn.on('click', function () {
        self.payment();
      });

      $('.payment-type').on('click', function () {
        paymentType = $(this).attr('id');
      });
    },

    payment: function () {
      var self = this;
      var phone = this.els.$orderPhoneIpt.val().trim();
      var storeRequest = this.els.$storeRequestIpt.val();
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      if (phone == '') {
        return alert('주문자 번호를 입력해주세요');
      }
      if (!patternPhone.test(phone)) {
        return alert('주문자 번호를 확인 해주세요');
      }
      if (paymentCategory == '') {
        return alert('결제 방식을 선택해주세요');
      }

      $.sendHttp({
        path: "/api/payment/paymentPickUp",
        data: {
          memberPhone: phone,
          paymentCategory: paymentType,
          storeRequest: storeRequest,
          orderTotalPrice: M.data.param('totalPaymentPrice'),
          memberNum: M.data.global('memberNum'),
          storeNum: M.data.global('storeNum'),
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './jiwon_payment_ok.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert('다시 시도해주세요.');
        }
      });
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