/**
 * @file : cart.js
 * @author : 조은진
 * @date : 20220412
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  M.data.removeGlobal('seqNo');
  var seqNo = [];
  var page = {
    els: {
      $goOrderBtn: null,
      $minusBtn: null,
      $plusBtn: null,
      $qtyResult: null,
      $objectImg: null,
      $deleteBtn: null,
      $objectName: null,
      $objectPrice: null,
      $objectQty: null,
      $totalPrice: null,
      $deliveryPrice: null,
      $cartTotalPrice: null
//      $storeTitle: null
    },
    data: {},
    init: function init() {
      this.els.$goOrderBtn = $('#go-order-btn');
      this.els.$minusBtn = $('#minus-btn');
      this.els.$plusBtn = $('#plus-btn');
      this.els.$qtyResult = $('#qty-result');
      this.els.$objectImg = $('#object-img');
      this.els.$deleteBtn = $('#delete-btn');
      this.els.$objectName = $('#object-name');
      this.els.$objectPrice = $('#object-price');
      this.els.$objectQty = $('#object-qty');
      this.els.$totalPrice = $('#total-price');
      this.els.$deliveryPrice = $('#delivery-price');
      this.els.$cartTotalPrice = $("#cart-total-price-num");
//      this.els.$storeTitle = $('#store-title');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var objectImg = this.els.$objectImg.val().trim();
      var objectName = this.els.$objectName.val().trim();
      var objectPrice = this.els.$objectPrice.val().trim();
      var objectQty = this.els.$objectQty.val().trim();
//      var storeTitle = this.els.$storeTitle.val().trim();

      $.sendHttp({
        path: "/api/orderList/SelectAll",
        data: {
            "memberNum": M.data.global('memberNum'),
            "storeNum" : "store10001",
            "objectNum" : M.data.global('objectNum')
        },
        succ: function (data){
            var items = "";
            $.each(data.list, function(index, item){
                items += "<li class='cart-object-container' style='border-right: 0px;'>";
                items += "<div>";
                items += "<div class='cart-object-img'>";
                items += "<img class='cart-object-img-detail' src='../img/curry.png' alt=''/>";
//                items += "위에는 가게 사진 들어갈 자리"
                items += "</div>";
                items += "<div class='cart-delete-img'>";
                items += "<img src='../img/btn-close-black.png' class='btn-delete'/>";
                items += "</div>"
                items += "<div class='cart-object-name'>";
                items += "<strong>";
                items += item.objectName;
                items += "</strong>";
                items += "</div>";
                items += "<div class='cart-object-price'>";
                items += "<strong>";
                items += items.objectPrice;
                items += "</strong>";
                items += "<div class='cart-object-qty'>";
                items += "<i class='fa fa-minus'></i>";
                items += "&nbsp;";
                items += items.buyQty;
                items += "&nbsp;"
                items += "<i class='fa fa-plus'></i>";
                items += "</div>";
                items += "</div>";
                items += "</div>";
                items += "</li>";
            });
            $("#orderList").append(items);
        },
        error: function(data){
            alert('장바구니를 불러오지 못했습니다.');
        },
      })
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