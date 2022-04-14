/**
 * @file : join2_member.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $memberNameIpt: null,
      $memberPhoneIpt: null,
      $memberNicknameIpt: null,
      $yearIpt: null,
      $monthIpt: null,
      $dateIpt: null,
      $nextBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$memberNameIpt = $('#member-name');
      this.els.$memberPhoneIpt = $('#member-phone');
      this.els.$memberNicknameIpt = $('#member-nickname');
      this.els.$yearIpt = $('#year');
      this.els.$monthIpt = $('#month');
      this.els.$dateIpt = $('#date');
      this.els.$nextBtn = $('#next-btn');
      this.els.$backBtn = $('#back-btn');
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

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

    },

    next: function () {
      var self = this;
      var name = this.els.$memberNameIpt.val().trim();
      var phone = this.els.$memberPhoneIpt.val().trim();
      var nickname = this.els.$memberNicknameIpt.val().trim();
      var year = this.els.$yearIpt.val().trim();
      var month = this.els.$monthIpt.val().trim();
      var date = this.els.$dateIpt.val().trim();
      var birth = year + month + date;
      var births = moment(year + '-' + month + '-' + date, 'YYYY-MM-DD');
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;

      if (name == '') {
        return alert('이름을 입력해주세요');
      }
      if (phone == '') {
        return alert('전화번호를 입력해주세요');
      }
      if (!patternPhone.test(phone)) {
        return alert('핸드폰 번호를 확인 해주세요');;
      }
      if (nickname == '') {
        return alert('닉네임을 입력해주세요');
      }
      if (year == '') {
        return alert('년도를 입력해주세요');
      }
      if (year.length != 4) {
        return alert('년도를 네자리로 입력해주세요');
      }
      if (month == '') {
        return alert('월을 입력해주세요');
      }
      if (month.length != 2) {
        return alert('월을 두자리로 입력해주세요');
      }
      if (month >= 13 || month <= 0) {
        return alert('달을 1~12 중에 입력해주세요');
      }
      if (date == '') {
        return alert('날짜를 입력해주세요');
      }
      if (date.length != 2) {
        return alert('일을 두자리로 입력해주세요');
      }
      if (date <= 0 || date >= 32) {
        return alert('일을 올바르게 입력해주세요');
      }
      if (births.isValid() == false) {
        return alert('날짜가 올바르지 않습니다. 다시 입력해주세요.');
      }
      M.page.html({
        path: './join3.html',
        param: {
          "userName": name,
          "userBirth": birth,
          "userPhone": phone,
          "userNickname": nickname,
          "grade": "member",
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