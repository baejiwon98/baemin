/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $nextBtn: null,
      $allchkBtn: null,
      $chk2: null,
      $chk3: null,
      $chk4: null,
      $chked: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$nextBtn = $('#next-btn');
      this.els.$allchkBtn = $('#chk1');

      this.els.$chk2 = $('#chk2');
      this.els.$chk3 = $('#chk3');
      this.els.$chk4 = $('#chk4');
      this.els.$chked = $("input[type=checkbox]");
      this.els.$backBtn = $('#backBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$nextBtn.on('click', function () {
        M.page.html('./saetbyeol_join2_delivery.html');
      });

      this.els.$allchkBtn.on('click', function () {
        if ($("input:checkbox[id='chk1']").prop("checked")) {
          $("input[type=checkbox]").prop("checked", true);
        } else {
          $("input[type=checkbox]").prop("checked", false);
        }
      });

      this.els.$chked.on('click', function () {
        var total = $("input[type=checkbox]").length;
        var checked = $("input[type=checkbox]:checked").length;

        if (total != checked) $("input:checkbox[id='chk1']").prop("checked", false);
        else $("input:checkbox[id='chk1']").prop("checked", true);
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
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