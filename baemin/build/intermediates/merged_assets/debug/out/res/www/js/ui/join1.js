/**
 * @file : join1.js
 * @author : 배지원
 * @date : 2022-04-11
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
      $radio: null,
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

      this.els.$radio = $("input[name=user]");

    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$nextBtn.on('click', function () {
        self.next();
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
    next: function next() {
      var self = this;
      var grade = $('input[name=user]:checked').val();
      var ischecked1 = this.els.$chk2.prop('checked');
      var ischecked2 = this.els.$chk3.prop('checked');
      if (ischecked1) {} else { // 첫번째 체크박스가 체크 되어있지 않은 경우
        alert("필수! 서비스 이용약관 동의를 체크 해주세요.")
        return false;
      }
      if (ischecked2) {} else { // 두번째 체크박스가 체크 되어있지 않은 경우
        alert("필수! 개인정보 수집 및 이용동의를 체크 해주세요.");
        return false;
      }
      if (grade == null) {
        alert("회원 유형을 선택해주세요.");
        return false;
      }

      if (grade == "member") {
        M.page.html('./saetbyeol_join2_member.html');
      } else if (grade == "store") {
        M.page.html('./saetbyeol_join2_employee.html');
      } else if (grade == "delivery") {
        M.page.html('./saetbyeol_join2_delivery.html');
      }

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