/**
 * @file :
 * @author :
 * @date :
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  M.data.removeGlobal('seqNo');
  var buyStatus;
  var seqNo = [];
  var page = {
    els: {
      $goCartBtn: null,
      $minusBtn: null,
      $plusBtn: null,
      $qtyResult: null,
      $objectImg: null,
      $objectName: null,
      $objectOrigin: null,
      $objectContent: null
    },
    data: {},
    init: function init() {
      this.els.$goCartBtn = $('#go-cart-btn');
      this.els.$minusBtn = $('#minus-btn');
      this.els.$plusBtn = $('#plus-btn');
      this.els.$qtyResult = $('#qty-result');
      this.els.$objectImg = $('#object-img');
      this.els.$objectName = $('#object-name');
      this.els.$objectOrigin = $('#object-origin');
      this.els.$objectContent = $('#object-content');
    },

    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      const resultElement = document.getElementById('qty-result');
      this.els.$goCartBtn.on('click', function () {
        self.checkObj();
        if(buyStatus == 'Y'){
            alert('이미 장바구니에 담긴 항목입니다.');
        }else{
            self.orderAdd();
        }
      });

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
    },

    //장바구니 버튼 클릭
    checkObj: function(data){
        var obNum = 'object10010';
        $.sendHttp({
            path: "/api/orderList/objCheck",
            data: {
                objectNum : obNum,
            },
            succ: function(data){
                buyStatus = data.dupYn;
                alert(buyStatus);
                return buyStatus;
            },
            error: function(data){
                alert('비교 실패.');
            },
        })
    },
    orderAdd: function(data){
        var obNum = 'object10010';
        var memNum = 'member10001';
        const resultElement = document.getElementById('qty-result');
        let number = resultElement.innerText;
        var bQty = number;
        console.log(number);
        alert(number);
        $.sendHttp({
            path: "/api/orderList/Insert",
            data: {
                objectNum : obNum,
                memberNum : memNum,
                buyQty : bQty
            },
            succ: function(data){
                console.log(data);
                alert('장바구니에 상품이 담겼습니다.');
                M.page.html('./jiwon_cart.html');
                return true;
            },
            error: function(data){
                alert('장바구니에 상품을 넣지 못했습니다.');
            },
        })
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