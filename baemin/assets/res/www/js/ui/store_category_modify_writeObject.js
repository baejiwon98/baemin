/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $btnBack: null,

      $menuNameIpt: null,
      $menuOriginIpt: null,
      $menuContentsIpt: null,
      $menuStockIpt: null,
      $menuPriceIpt: null,
      $imgSelectBtn: null,
      $menuImgIpt: null,

      $modiBtn: null,
      $delBtn: null
    },
    data: {},
    init: function init() {
      this.els.$btnBack = $('#btn-back');

      this.els.$menuNameIpt = $('#menu-name');
      this.els.$menuOriginIpt = $('#menu-origin');
      this.els.$menuContentsIpt = $('#menu-contents');
      this.els.$menuStockIpt = $('#menu-stock');
      this.els.$menuPriceIpt = $('#menu-price');
      this.els.$menuImgIpt = $('#menu-img');

      this.els.$imgSelectBtn = $('#imgSelectBtn');

      this.els.$modiBtn = $('#modiBtn');
//      this.els.$delBtn = $('#delBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      this.els.$menuNameIpt.val(M.data.param('objectName'));
      this.els.$menuOriginIpt.val(M.data.param('objectOrigin'));
      this.els.$menuContentsIpt.val(M.data.param('objectContent'));
      this.els.$menuStockIpt.val(M.data.param('objectQty'));
      this.els.$menuPriceIpt.val(M.data.param('objectPrice'));
      this.els.$menuImgIpt.val(M.data.param('objectImage'));
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$btnBack.on('click', function () {
        self.btnBack();
      });
      this.els.$imgSelectBtn.on('click', function () {
        self.imgSelectBtn();
      });
      this.els.$modiBtn.on('click', function () {
        self.modiBtn();
      });
//      this.els.$delBtn.on('click', function () {
//        self.delBtn();
//      });

      this.els.$modiBtn.on('click', function () {
        if (M.data.global('seqNo') == '') {
          if(self.data.imgPath == '' || self.data.imgPath == null) {
            self.write();
          } else {
            console.log(self.data.imgPath);
            self.writeWithUpload(self.data.imgPath);
          }
        } else {
            console.log(M.data.param('seqNo'));
            if(self.data.imgPath == '' || self.data.imgPath == null) {
              self.modify();
            } else {
              console.log(self.data.imgPath);
              self.modifyWithUpload(self.data.imgPath);
            }          
        }
      });
    },
    
    modifyWithUpload: function modifyWithUpload(imgPath) {
              var self = this;
              var id =  M.data.global('loginId');

              var menuName = this.els.$menuNameIpt.val();
              var menuOrigin = this.els.$menuOriginIpt.val();
              var menuContents = this.els.$menuContentsIpt.val();
              var menuStock = this.els.$menuStockIpt.val();
              var menuPrice = this.els.$menuPriceIpt.val();
              var menuImg = this.els.$menuImgIpt.val();

              var seqNo = M.data.global('seqNo');

              if (menuName == '') {
                return alert('메뉴 이름을 입력해주세요.');
              }
              if (menuOrigin == '') {
                return alert('원산지를 입력해주세요.');
              }
              if (menuContents == '') {
                return alert('메뉴 설명을 입력해주세요.');
              }
              if (menuStock == '') {
                return alert('재고를 입력해주세요.');
              }
              if (menuPrice == '') {
                return alert('가격을 입력해주세요.');
              }
              if (menuImg == '') {
                return alert('이미지를 선택해주세요.');
              }
              var body = [
                { name: "file", content: imgPath, type: "FILE" },
                { name: "content", content: content, type: "TEXT" },
                { name: "title", content: title, type: "TEXT" },

                { name: "menuName", content: menuName, type: "TEXT" },
                { name: "menuOrigin", content: menuOrigin, type: "TEXT" },
                { name: "menuContents", content: menuContents, type: "TEXT" },
                { name: "menuStock", content: menuStock, type: "TEXT" },
                { name: "menuPrice", content: menuPrice, type: "TEXT" },
                { name: "menuImg", content: menuImg, type: "FILE" },

                { name: "loginId", content: id, type: "TEXT" },
                { name: "seqNo", content: seqNo, type: "TEXT" },
              ]
              console.log(body);
              // { content: "파일업로드", type: "TEXT" },
            // { name: "imgs", content: "test.zip", type: "FILE" },
              $.fileHttpSend({
                path: SERVER_PATH.NOTICE_UPDATE_IMG,
                body:body,
                succ: function () {
                  console.log(body);
                  alert('성공했습니다.');
                  M.page.replace({
                    url:'./list.html',});
                  M.data.removeGlobal('seqNo');
                  M.data.removeGlobal('imgUrl');
                  M.data.removeGlobal('imgName');
                  var pagelist = M.info.stack();
                  M.page.remove(pagelist[1].key);  
                },
                progress: function () {
                  console.log(body);
                },
                error : function () {
                  console.log(body);
                  alert('실패했습니다.');
                }
              })
            },
    
    
    writeWithUpload: function writeWithUpload(imgPath) {
          var self = this;
          var id =  M.data.global('loginId');
          var title = this.els.$titleIpt.val();
          var content = this.els.$contentIpt.val();
           if (menuName == '') {
             return alert('메뉴 이름을 입력해주세요.');
           }
           if (menuOrigin == '') {
             return alert('원산지를 입력해주세요.');
           }
           if (menuContents == '') {
             return alert('메뉴 설명을 입력해주세요.');
           }
           if (menuStock == '') {
             return alert('재고를 입력해주세요.');
           }
           if (menuPrice == '') {
             return alert('가격을 입력해주세요.');
           }
           if (menuImg == '') {
             return alert('이미지를 선택해주세요.');
           }
          var body = [
            { name: "menuName", content: menuName, type: "TEXT" },
            { name: "menuOrigin", content: menuOrigin, type: "TEXT" },
            { name: "menuContents", content: menuContents, type: "TEXT" },
            { name: "menuStock", content: menuStock, type: "TEXT" },
            { name: "menuPrice", content: menuPrice, type: "TEXT" },
            { name: "menuImg", content: menuImg, type: "FILE" },

            { name: "loginId", content: id, type: "TEXT" },
          ]
          console.log(body);
          // { content: "파일업로드", type: "TEXT" },
        // { name: "imgs", content: "test.zip", type: "FILE" },
          $.fileHttpSend({
            path: SERVER_PATH.NOTICE_WRITE_IMG,
            body:body,
            succ: function (body) {
              console.log(body);
              alert('성공했습니다.');
              M.page.replace({
                url:'./list.html',});
              var pagelist = M.info.stack();
              M.page.remove(pagelist[1].key);
            },
            progress: function (body) {
              console.log(body);
            },
            error : function (body) {
              console.log(body);
              alert('실패했습니다.');
            }
          })
        },
    
    getfile: function () {
      var self = this; 
        M.media.picker({
          mode: "SINGLE",
          media: "PHOTO",
          column: 3,
          callback: function( status, result ) {
            if(status == 'SUCCESS'){
               self.data.imgPath = result.fullpath;      
               self.els.$fileIpt.val(result.name);   
            }else{
              self.data.imgPath = null;
              self.els.$fileIpt.val('');
            }
          }        
        });
    },

     modify: function () {
       var self = this;
       var id =  M.data.global('loginId');
       var title = this.els.$titleIpt.val();
       var content = this.els.$contentIpt.val();
       var seqNo = M.data.global('seqNo');
       if (menuName == '') {
         return alert('메뉴 이름을 입력해주세요.');
       }
       if (menuOrigin == '') {
         return alert('원산지를 입력해주세요.');
       }
       if (menuContents == '') {
         return alert('메뉴 설명을 입력해주세요.');
       }
       if (menuStock == '') {
         return alert('재고를 입력해주세요.');
       }
       if (menuPrice == '') {
         return alert('가격을 입력해주세요.');
       }
       if (menuImg == '') {
         return alert('이미지를 선택해주세요.');
       }
       console.log(seqNo);
        $.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE,
        data: {
          'loginId': M.data.global('loginId'),
          'seqNo': M.data.global('seqNo'),

          'title': title,
          'content': content,
        },
        succ: function (data) {
          alert('수정 완료되었습니다.');
          M.page.replace({
            url : './jiwon_store_menulist.html',
            });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.data.removeGlobal('seqNo');
        },
        error: function (data) {
          console.log(data);
          alert('에러가 발생했습니다.');
        }
      });

    },

    write: function () {
      var self = this;
      var title = this.els.$titleIpt.val();
      var content = this.els.$contentIpt.val();
      console.log(M.data.global('seqNo'));
       if (menuName == '') {
         return alert('메뉴 이름을 입력해주세요.');
       }
       if (menuOrigin == '') {
         return alert('원산지를 입력해주세요.');
       }
       if (menuContents == '') {
         return alert('메뉴 설명을 입력해주세요.');
       }
       if (menuStock == '') {
         return alert('재고를 입력해주세요.');
       }
       if (menuPrice == '') {
         return alert('가격을 입력해주세요.');
       }
       if (menuImg == '') {
         return alert('이미지를 선택해주세요.');
       }
      $.sendHttp({
        path: SERVER_PATH.NOTICE_WRITE,
        data: {
          loginId: M.data.global('loginId'),
          title: title,
          content: content,

          menuName: menuName,
          menuOrigin: menuOrigin,
          menuContents: menuContents,
          menuStock: menuStock,
          menuPrice: menuPrice,
          menuImg: menuImg
        },
        succ: function (data) {
          console.log(data);
          alert('글쓰기가 완료되었습니다.');
          M.page.replace({
            url: "./jiwon_store_menulist.html",
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          
        },
        error: function (data) {
          console.log(data);
          alert('글쓰기 실패입니다. 다시 작성해주세요.');
        }
      });
    }

  };

  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);