/**
 * @file : cart.js
 * @author : 배지원
 * @date : 2022-04-13
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $goOrderBtn: null,
      $minusBtn: null,
      $plusBtn: null,
      $qtyResult: null,
    },
    data: {},
    init: function init() {
      this.els.$goOrderBtn = $('#go-order-btn');
      this.els.$minusBtn = $('#minus-btn');
      this.els.$plusBtn = $('#plus-btn');
      this.els.$qtyResult = $('#qty-result');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      const resultElement = document.getElementById('qty-result');
      this.els.$minusBtn.on('click', function () {
        let number = resultElement.innerText;
        console.log(number);
        if (number <= 1) {
          alert('수량은 1이상이어야 합니다.');
        } else {
          number = parseInt(number) - 1;
          resultElement.innerText = number;
        }
      });
      this.els.$plusBtn.on('click', function () {
        let number = resultElement.innerText;
        console.log(number);
        if (number >= 50) { // 등록한 재고 수량으로 변경
          alert('재고가 없습니다.');
          return false;
        } else {}
        number = parseInt(number) + 1;
        resultElement.innerText = number;
      });
      this.els.$goOrderBtn.on('click', function () {
        M.page.html('./jiwon_payment.html');
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