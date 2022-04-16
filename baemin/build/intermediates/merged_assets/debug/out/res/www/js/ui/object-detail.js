/**
 * @file : object-detail.js
 * @author : 조은진, 배지원
 * @date : 2022-04-12
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var maxQty;
  let number;
  var page = {
    els: {
      $goCartBtn: null,
      $minusBtn: null,
      $plusBtn: null,
      $qtyResult: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$goCartBtn = $('#go-cart-btn');
      this.els.$minusBtn = $('#minus-btn');
      this.els.$plusBtn = $('#plus-btn');
      this.els.$qtyResult = $('#qty-result');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/object/detailStoreMenu",
        data: {
          "objectNum": M.data.param('objectNum')
        },
        succ: function (data) {
          if(data.objectOrigin != null) {
            $('#object-origin').text(data.objectOrigin);
          } else {
            $('#object-origin').text('미등록');
          }
          $('#object-title').text(data.objectName);
          $('#object-content').text(data.objectContent);
          const element = document.getElementById('object-img');
          maxQty = data.objectQty;
          if (data.objectImage != null) {
            element.innerHTML = "<img src='" + "http://localhost:8080/view/object/upload/" + data.objectImage + "' alt='' />";
          } else {
            element.innerHTML = "<img src='../img/object-default.png' style='width:80%;height:80%;'alt='' />";
          }

        },
        error: function (data) {
          console.log(data);
          alert("가게 정보를 가져오지 못했습니다.");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      const resultElement = document.getElementById('qty-result');
      this.els.$goCartBtn.on('click', function () {
        self.goCart();
      });
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$minusBtn.on('click', function () {
        number = resultElement.innerText;
        console.log(number);
        if (number <= 1) {
          alert('수량은 1이상이어야 합니다.');
        } else {
          number = parseInt(number) - 1;
          resultElement.innerText = number;
        }
      });
      this.els.$plusBtn.on('click', function () {
        number = resultElement.innerText;
        console.log(number);
        if (number >= maxQty) { // 등록한 재고 수량으로 변경
          alert('재고가 없습니다.');
          return false;
        } else {
          number = parseInt(number) + 1;
          resultElement.innerText = number;
        }
      });
    },
    goCart: function () {
      var self = this;
      var status;
      console.log(number);
      if(number === undefined) { number = 1;}
      if (M.data.global('pickupStatus') == 'Y') { status = 'T'; }
      else if (M.data.global('deliveryStatus') == 'Y'){status = 'D';}

      $.sendHttp({
        path: "/api/orderList/Insert",
        data: {
          memberNum : M.data.global('memberNum'),
          buyQty : number,
          status : status,
          objectNum : M.data.param('objectNum')
        },
        succ: function (data) {
          M.page.replace({
            url : './jiwon_cart.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert("장바구니에 담지 못했습니다. 다시 시도해주세요.");
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