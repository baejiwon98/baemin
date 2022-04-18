/**
 * @file : payment.js
 * @author : 배지원
 * @date : 2022-04-16
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var paymentType;
  var page = {
    els: {
      $goPaymentBtn: null,
      $orderPhoneIpt: null,
      $storeRequestIpt: null,
      $deliveryRequestIpt: null,
      $addrDetailIpt: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$goPaymentBtn = $('#go-payment-btn');
      this.els.$orderPhoneIpt = $('#orderPhone');
      this.els.$storeRequestIpt = $('#storeRequest');
      this.els.$deliveryRequestIpt = $('#deliveryRequest');
      this.els.$addrDetailIpt = $('#addrDetail');
      this.els.$backBtn = $('#back-btn');
    },

    initView: function initView() {
      var self = this;
      $('#totalObjectPrice').text(M.data.param('totalObjectPrice'));
      $('#deliveryTip').text(M.data.param('deliveryTip'));
      $('#totalPaymentPrice').text(M.data.param('totalPaymentPrice'));
      $('#addr').text(M.data.global('myAddress'));
      this.els.$addrDetailIpt.val(M.data.global('myAddressDetail'));
      this.els.$orderPhoneIpt.val(M.data.global('phone'));
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$goPaymentBtn.on('click', function () {
        self.payment();
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      $('.payment-type').on('click', function () {
        paymentType = $(this).attr('id');
        console.log(paymentType);
        if (paymentType == 'cash') {
          $('#paymentWay').text('현금 결제');
        } else if (paymentType == 'card') {
          $('#paymentWay').text('카드 결제');
        } else if (paymentType == 'smart') {
          $('#paymentWay').text('간편 결제');
        }
      });
    },

    payment: function () {
      var self = this;
      var addrDetail = this.els.$addrDetailIpt.val();
      var addr = M.data.global('myAddress') + ' ' + addrDetail;
      var phone = this.els.$orderPhoneIpt.val().trim();
      var storeRequest = this.els.$storeRequestIpt.val();
      var deliveryRequest = this.els.$deliveryRequestIpt.val();
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      if (addrDetail == '') {
        return alert('상세 주소를 입력해주세요');
      }
      if (phone == '') {
        return alert('주문자 번호를 입력해주세요');
      }
      if (!patternPhone.test(phone)) {
        return alert('주문자 번호를 확인 해주세요');
      }
      if (paymentType == '') {
        return alert('결제 방식을 선택해주세요');
      }
      console.log(phone);
      $.sendHttp({
        path: "/api/payment/paymentDelivery",
        data: {
          paymentCategory: paymentType,
          storeRequest: storeRequest,
          orderTotalPrice: M.data.param('totalPaymentPrice'),
          memberNum: M.data.global('memberNum'),
          deliveryRequest: deliveryRequest,
          storeNum: M.data.global('storeNum'),
          memAddress: addr,
          memPhone: phone
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './jiwon_payment_ok.html',
            action : 'CLEAR_TOP'
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

  M.onRestore(function () {
    pageFunc.initView();
  });
})(jQuery, M, __page__, window);