/**
 * @file : userInfo_reviewWrite_employee.js
 * @author : 배지원
 * @date : 2022-04-15
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $backBtn: null,
      $writeBtn: null,
      $contentIpt: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$writeBtn = $('#writeBtn');
      this.els.$contentIpt = $('#content');
    }, // end init

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/review/storedetail",
        data: {
          "storeNum": M.data.global('storeNum'),
          "orderNum": M.data.param('orderNum'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$contentIpt.val(data.storeReview);
        },
        error: function (data) {
          console.log(data);
          alert("리뷰를 가져오지 못했습니다.");
        }
      });
    },

    initEvent: function initEvent() {
      var self = this;
      // Dom Event 바인딩
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$writeBtn.on('click', function () {
        self.write();
      });
    },

    write: function () {
      var self = this;
      var content = this.els.$contentIpt.val();
      $.sendHttp({
        path: "/api/review/storeinsert",
        data: {
          "orderNum": M.data.param('orderNum'),
          "storeNum": M.data.global('storeNum'),
          "storeReview" : content
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './jiwon_userInfo_reviewlist_employee.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert("리뷰 댓글 등록을 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
  };
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);