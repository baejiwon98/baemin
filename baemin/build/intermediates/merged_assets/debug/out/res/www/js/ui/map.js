/**
 * @file : map.js
 * @author : 배지원
 * @date : 2022-04-08
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $backBtn: null,
      $addressIpt: null,
      $okBtn: null,
      $addrDetail: null,
      $userInfoBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$userInfoBtn = $('#userInfo-btn');
      this.els.$addressIpt = $('#address');
      this.els.$okBtn = $('#okBtn');
      this.els.$addrDetail = $('#addrDetail');
    },
    initView: function initView() {
      var self = this;
      var id = M.data.global('myId');
      $.sendHttp({
        path: "/api/member/info",
        data: {
          "memberId": M.data.global('myId'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$addressIpt.val(data.memberAddr);
          self.els.$addrDetail.val(data.memberAddrDetail);
          const element = document.getElementById('map-title');
          element.innerHTML = '<strong>' + M.data.global('myAddress') + '</strong>';
          var marker;
          var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
              center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
            };
          // 버튼을 click했을때
          var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색합니다
          geocoder.addressSearch($('#address').val(), function (result, status) {

            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 마커로 표시합니다
              marker = new kakao.maps.Marker({
                map: map,
                position: coords
              });

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$okBtn.on('click', function () {
        self.saveAddr();
      });

      var marker;
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };
      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      $('#currentBtn').click(function () {
        //        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        function getAddr(lat, lng) { // 좌표로 주소 가져오기
          let geocoder = new kakao.maps.services.Geocoder();

          let coord = new kakao.maps.LatLng(lat, lng);
          let callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              console.log(result[0].address.address_name);
              self.els.$addressIpt.val(result[0].address.address_name);
            }
          }
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        }

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
            getAddr(lat, lon);

            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
              mapOption = {
                center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
              };
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

            marker = new kakao.maps.Marker({
              map: map,
              position: locPosition
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(locPosition);

          });

        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

          marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(locPosition);
        }
      });

      $('#searchAddr').click(function () {
        // 버튼을 click했을때
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch($('#address').val(), function (result, status) {

          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            marker = new kakao.maps.Marker({
              map: map,
              position: coords
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    },
    saveAddr: function () {
      var self = this;
      var id = M.data.global('myId');
      var address = this.els.$addressIpt.val();
      var addressDetail = this.els.$addrDetail.val();
      if (address == '') {
        return alert('주소를 입력해주세요');
      }
      if (addressDetail == '') {
        return alert('상세주소를 입력해주세요');
      }
      $.sendHttp({
        path: "/api/member/updateAddr",
        data: {
          memberId: id,
          memberAddr: address,
          memberAddrDetail: addressDetail,
        },
        succ: function (data) {
          console.log(data);
          M.data.global('myAddress', address + ' ' + addressDetail);
          M.page.replace({
            path: "./saetbyeol_map.html",
          });
        },
        error: function (data) {
          console.log(data);
          alert('주소 저장을 실패했습니다. 다시 입력해주세요.');
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

  M.onRestore(function () {
    pageFunc.initView();
  });

})(jQuery, M, __page__, window);