/**
 * @file : cart.js
 * @author : 배지원
 * @date : 2022-04-13
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  let totalObjectPrice = 0;
  let deliveryTip = 0;
  let totalPaymentPrice = 0;
  var storeNum;
  var status;
  var num;
  var page = {
    els: {
      $btnBack: null,
      $goOrderBtn: null,
      $minusBtn: null,
      $plusBtn: null,
      $qtyResult: null,
    },
    data: {},
    init: function init() {
      this.els.$btnBack = $('#backBtn');
      this.els.$goOrderBtn = $('#go-order-btn');
      this.els.$minusBtn = $('#minus-btn');
      this.els.$plusBtn = $('#plus-btn');
      this.els.$qtyResult = $('#qty-result');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/orderList/SelectAll",
        data: {
          "memberNum": M.data.global('memberNum'),
        },
        succ: function (data) {
          console.log(data);

          var items = "";
          storeNum = data.storeNum;
          status = data.status;
          deliveryTip = data.deliveryPrice;
          items += "<div class='empty-container' style='background-color: #ff7987;'></div>";
          items += "<div class='cart-detail-tit' style='border-right: 0px;'>";
          items += "<div class='cart-store-title' style='width:80%'>";
          if (data.list == '') {
            items += "<div style='text-align:right; font-size:20px; font-weight:bold;'>장바구니에 담은게 없습니다.</div>"
          }
          items += "<p id='store-title'>" + data.storeName + "</p>";
          items += "</div>";
          items += "</div>";
          items += "<div class='cart-detail-cont'>";
          items += "<ul id='orderList'>";
          if (data.list != '') {
            $.each(data.list, function (index, item) {
              totalObjectPrice += item.objectPrice * item.buyQty;
              items += "<li class='cart-object-container' style='border-right:0px;' id='" + item.objectNum + "'>";
              items += "<div>";
              items += "<div class='cart-object-img' id='object-img'>";
              if (item.objectImage != null) {
                items += "<img class='cart-object-img-detail' src='" + "http://localhost:8080/view/object/upload/" + item.objectImage + "' alt='' />";
              } else {
                items += "<img class='cart-object-img-detail' src='../img/object-default.png' alt='' />";
              }
              items += "</div>";
              items += "<div class='cart-delete-img delete-btn' >";
              items += "<img src='../img/btn-close-black.png' class='btn-delete' />";
              items += "</div>";
              items += "<div class='cart-object-name' id='object-name'>";
              items += "<strong>" + item.objectName + "</strong>";
              items += "</div>";
              items += "<div class='cart-object-price' id='object-price'>";
              items += "<strong>" + item.objectPrice + "원</strong>";
              items += "<div class='cart-object-qty' id='" + item.buyQty + "'>";
              items += "<i class='fa fa-minus minus-btn'></i>";
              items += "<div class='qty-result' id='qty-result'>" + item.buyQty + "</div>";
              items += "<i class='fa fa-plus plus-btn'></i>";
              items += "</div>";
              items += "</div>";
              items += "</div>";
              items += "</li>";
            });

          }

          items += "</ul>";
          totalPaymentPrice = parseInt(totalObjectPrice) + parseInt(data.deliveryPrice);
          items += "<button type='button' style='float:right;margin-right:1rem;' id='allDelete'>장바구니 비우기</button>";
          items += "<div class='plus-icon' style='margin: 0%; padding:2rem ;'>";
          items += "<button type='button' class='btn-plus'>plus</button>";
          items += "</div>";
          items += "</div>";
          items += "<div class='empty-container' style='background-color: #ff7987;'></div>";
          items += "<div class='cart-price-cont'>";
          items += "<div class='fa cart-total-price'>";
          items += "<p>총 주문금액</p>";
          items += "</div>";
          items += "<div class='fa cart-total-price-number' id='total-price'>";
          items += "<p>" + totalObjectPrice + " 원</p>";
          items += "</div>";
          items += "</div>";
          items += "<div class='cart-price-cont'>";
          items += "<div class='fa cart-total-price'>";
          items += "<p>배달팁</p>";
          items += "</div>";
          items += "<div class='fa cart-total-price-number' id='delivery-price'>";
          if (data.deliveryPrice != '') {
            items += "<p>" + data.deliveryPrice + " 원</p>";
          } else {
            items += "<p>0 원</p>";
          }
          items += "</div>";
          items += "</div>";
          items += "<div class='cart-price-tit' style='border-right: 0px; border-left: 0px;'>";
          items += "<div class='fa cart-total-price'>";
          items += "<p>결제예정금액</p>";
          items += "</div>";
          items += "<div class='fa cart-total-price-number' id='cart-total-price-num'>";

          if (!isNaN(totalPaymentPrice)) {
            items += "<p>" + totalPaymentPrice + " 원</p>";
          } else {
            items += "<p>0 원</p>";
          }
          items += "</div>";
          items += "</div>";
          items += "<br /><br /><br />";
          $("#card").append(items);

        },
        error: function (data) {
          console.log(data);
          alert("내 장바구니 목록을 가져오지 못했습니다.");
        },
      });

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$btnBack.on('click', function () {
        M.page.back();
      });
      this.els.$goOrderBtn.on('click', function () {
        if (status == 'D') {
          M.page.html({
            url: './jiwon_payment.html',
            param: {
              "totalObjectPrice": totalObjectPrice,
              "deliveryTip": deliveryTip,
              "totalPaymentPrice": totalPaymentPrice,
            },
          });
        } else {
          M.page.html({
            url: './jiwon_payment_takeout.html',
            param: {
              "totalObjectPrice": totalObjectPrice,
              "deliveryTip": deliveryTip,
              "totalPaymentPrice": totalPaymentPrice,
            },
          });
        }

      });
      $('#card').on('click', '.minus-btn', function () {
        num = $(this).closest('li').attr('id');
        let qty = parseInt($(this).closest('.cart-object-qty').attr('id')) - 1;
        console.log(num);
        console.log(qty);
        if (qty >= 1) {
          $.sendHttp({
            path: "/api/orderList/Update",
            data: {
              memberNum: M.data.global('memberNum'),
              objectNum: num,
              buyQty: qty,
            },
            succ: function (data) {
              console.log(data);
              M.page.replace({
                url: './jiwon_cart.html',
              });
            },
            error: function (data) {
              console.log(data);
              alert('다시 시도해주세요.');
            }
          });
        } else {
          alert('수량은 1이상이어야 합니다.');
        }
      });
      $('#card').on('click', '.plus-btn', function () {
        num = $(this).closest('li').attr('id');
        let qty = parseInt($(this).closest('.cart-object-qty').attr('id')) + 1;
        console.log(num);
        console.log(qty);
        if (qty <= 50) { //재고수량으로 변경해야함
          $.sendHttp({
            path: "/api/orderList/Update",
            data: {
              memberNum: M.data.global('memberNum'),
              objectNum: num,
              buyQty: qty,
            },
            succ: function (data) {
              console.log(data);
              M.page.replace({
                url: './jiwon_cart.html',
              });
            },
            error: function (data) {
              console.log(data);
              alert('다시 시도해주세요.');
            }
          });
        } else {
          alert('수량은 1이상이어야 합니다.');
        }
      });

      $('#card').on('click', '.btn-plus', function () {
        M.page.back();
      });

      $('#card').on('click', '.btn-delete', function () {
        num = $(this).closest('li').attr('id');
        console.log(num);
        M.pop.alert({
          title: '확인',
          message: '삭제하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.oneDelete();
            }
          }
        });
      });

      $('#card').on('click', '#allDelete', function () {
        M.pop.alert({
          title: '확인',
          message: '전체 삭제하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.allDelete();
            }
          }
        });
      });
    },
    oneDelete: function () {
      var self = this;
      $.sendHttp({
        path: "/api/orderList/DeleteOne",
        data: {
          memberNum: M.data.global('memberNum'),
          objectNum: num,
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './jiwon_cart.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert('다시 시도해주세요.');
        }
      });
    },
    allDelete: function () {
      var self = this;
      $.sendHttp({
        path: "/api/orderList/DeleteAll",
        data: {
          memberNum: M.data.global('memberNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './jiwon_cart.html',
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