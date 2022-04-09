/**
 * @file : map.js
 * @author : 배지원
 * @date : 2022-04-08
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var seqNo = [];
  var page = {
    els: {
        $addressIpt:null,
    },
    data: {},
    init: function init() {
        this.els.$addressIpt = $('#address');
    },
    initView: function initView() {

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
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