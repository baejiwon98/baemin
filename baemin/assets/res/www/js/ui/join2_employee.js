/**
 * @file : join2_employee.js
 * @author : 배지원
 * @date : 2022-04-13
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var delivery;
  var takeout;
  var page = {
    els: {
      $deliveryBtn: null,
      $pickUpBtn: null,
      $employeeNumIpt: null,
      $employeeNameIpt: null,
      $storeNameIpt: null,
      $storeAddrIpt: null,
      $employeePhoneIpt: null,
      $storePhoneIpt: null,
      $leastPriceIpt: null,
      $orderAreaIpt: null,
      $deliveryPriceIpt: null,
      $storeCategory: null,
      $nextBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$deliveryBtn = $('#delivery-status');
      this.els.$pickUpBtn = $('#pickup-status');
      this.els.$employeeNumIpt = $('#employee-num');
      this.els.$employeeNameIpt = $('#employee-name');
      this.els.$storeNameIpt = $('#store-name');
      this.els.$storeAddrIpt = $('#store-addr');
      this.els.$employeePhoneIpt = $('#employee-phone');
      this.els.$storePhoneIpt = $('#store-phone');
      this.els.$leastPriceIpt = $('#least-price');
      this.els.$orderAreaIpt = $('#order-area');
      this.els.$deliveryPriceIpt = $('#delivery-price');
      this.els.$storeCategory = $('#store-category');
      this.els.$nextBtn = $('#next-btn');
      this.els.$backBtn = $('#back-btn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
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

      this.els.$nextBtn.on('click', function () {
        self.next();
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

    },


    next: function () {

      var self = this;
      var registNum = this.els.$employeeNumIpt.val().trim();
      var name = this.els.$employeeNameIpt.val().trim();
      var storeName = this.els.$storeNameIpt.val();
      var addr = this.els.$storeAddrIpt.val();

      var phone = this.els.$employeePhoneIpt.val();
      var storePhone = this.els.$storePhoneIpt.val().trim();

      var leastPrice = this.els.$leastPriceIpt.val();
      var orderArea = this.els.$orderAreaIpt.val();
      var deliveryPrice = this.els.$deliveryPriceIpt.val();
      var storeCategory = this.els.$storeCategory.val().trim();

      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      if (typeof delivery == "undefined" || delivery == null || delivery == "") {
        delivery = 'N'
      }
      if (typeof takeout == "undefined" || takeout == null || takeout == "") {
        takeout = 'N'
      }

      if (registNum == '') {
        return alert('사업자등록번호를 입력해주세요');
      }
      if (registNum.length != 10) {
        return alert('사업자등록번호를 확인해주세요');
      }
      if (name == '') {
        return alert('사업주명을 입력해주세요');
      }
      if (storeName == '') {
        return alert('상호명을 입력해주세요');
      }
      if (storeCategory == '') {
        return alert('가게 카테고리를 선택해주세요');
      }
      if (addr == '') {
        return alert('사업자 주소를 입력해주세요');
      }
      if (phone == '') {
        return alert('휴대폰 번호를 입력해주세요');
      }
      if (!patternPhone.test(phone)) {
        return alert('핸드폰 번호를 확인 해주세요');;
      }
      if (storePhone == '') {
        return alert('운영 전화번호를 입력해주세요');
      }
      if (!patternPhone.test(storePhone)) {
        return alert('운영 전화번호를 확인 해주세요');;
      }
      if (leastPrice == '') {
        return alert('최소 주문금액을 입력해주세요');
      }
      if (orderArea == '') {
        return alert('주문 가능 지역을 입력해주세요');
      }
      if (deliveryPrice == '') {
        return alert('배달팁을 입력해주세요');
      }

      M.page.html({
        path: './join3.html',
        param: {
          "userName": name,
          "userPhone": phone,
          "registNum": registNum,
          "storeName": storeName,
          "storeCategory": storeCategory,
          "addr": addr,
          "storePhone": storePhone,
          "leastPrice": leastPrice,
          "orderArea": orderArea,
          "deliveryPrice": deliveryPrice,
          "deliveryStatus": delivery,
          "takeoutStatus": takeout,
          "grade": "store",
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