/**
 * @file : object-detail_modify.js
 * @author : 배지원
 * @date : 2022-04-17
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var maxQty;
  let number;
  var page = {
    els: {
      $qtyResult: null,
      $backBtn: null,
      $modiBtn: null,
      $delBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$qtyResult = $('#qty-result');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/object/detailStoreMenu",
        data: {
          "objectNum": M.data.global('objectNum')
        },
        succ: function (data) {
          if (data.objectOrigin != null) {
            $('#object-origin').text(data.objectOrigin);
          } else {
            $('#object-origin').text('미등록');
          }
          $('#object-title').text(data.objectName);
          $('#object-content').text(data.objectContent);
          $('#qty-result').text(data.objectQty);

          const element = document.getElementById('object-img');
          maxQty = data.objectQty;
          if (data.objectImage != null) {
            element.innerHTML = "<img src='" + "http://192.168.0.50:8080/view/object/upload/" + data.objectImage + "' alt='' style='width:300px; height:300px; border-radius:20px;' />";
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

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$modiBtn.on('click', function () {
        M.page.html({
          url: "./jiwon_store_object_write.html",
          param: {
            "modify": "Y"
          }
        });
      });
      this.els.$delBtn.on('click', function () {
        self.delObject();
      });
    },

    delObject: function () {
      var self = this;
      $.sendHttp({
        path: "/api/object/menuDelete",
        data: {
          "objectNum": M.data.global('objectNum'),
        },
        succ: function (data) {
          console.log(data);
          M.page.html({
            url : "./jiwon_store_category_modify.html",
          });
        },
        error: function (data) {
          console.log(data);
          alert("메뉴를 삭제하지 못했습니다. 다시 시도해주세요.");
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