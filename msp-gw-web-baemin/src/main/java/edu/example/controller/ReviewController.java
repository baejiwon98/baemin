package edu.example.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import edu.example.dto.ReviewDto;
import edu.example.service.ReviewService;
import kr.msp.constant.Const;

@Controller
public class ReviewController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired(required=true)
	private ReviewService service;	
	
	@Autowired(required=true)
    private MessageSource messageSource;

    @Value("${upload.path:/tmp}")
    private String UPLOAD_ROOT_PATH;
	
 // 내 리뷰 수정 (업로드)
 	@RequestMapping( method = RequestMethod.POST, value = "/api/review/updateWithUpload")
 	public ModelAndView reviewFileUpdate( MultipartHttpServletRequest request, HttpServletResponse response ) {
 			//rest로 넘어온 URI Path VARIABLES ATTRIBUTE 맵정보
         	Map<String,Object> uriPathVal = (Map<String,Object>)request.getAttribute(Const.REST_URI_PATH_VAL);
         	//클라이언트에서 넘어온 request(HEAD+BODY) 모든정보
         	Map<String,Object> reqMap =  (Map<String,Object>)request.getAttribute(Const.HTTP_BODY);
         	//클라이언트에서 넘어온 공통 헤더 맵정보
         	Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
         	//클라이언트에서 넘긴 파라미터 맵정보
         	Map<String,Object> reqBodyMap =  new HashMap<String, Object>();

         	//클라이언트에서 넘길 Response 맵 세팅
         	Map<String,Object> responseMap = new HashMap<String, Object>();
         	Map<String, Object> responseBodyMap= new HashMap<String, Object>();
         	if(reqHeadMap==null){ //restclient를 이용하면 raw데이타가 없기 때문
         		reqHeadMap = new HashMap<String, Object>();
         	}
         	reqHeadMap.put(Const.RESULT_CODE, Const.OK);
         	reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
         
         	reqBodyMap.put("orderNum", request.getParameter("orderNum"));
         	reqBodyMap.put("reviewScore", request.getParameter("reviewScore"));
         	reqBodyMap.put("reviewContent", request.getParameter("reviewContent"));
         	reqBodyMap.put("storeNum", request.getParameter("storeNum"));
         	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         	String fileDir = "/view/review/upload";
 			String filePath = request.getServletContext().getRealPath(fileDir);
 			System.out.println(filePath);

 			try{
                    System.out.println(reqBodyMap.get("reviewContent"));
                    MultipartFile reviewMain = request.getFile("reviewImage"); // reviewmain html에서 설정
                    String originalFile = reviewMain.getOriginalFilename();
             		
             		String extension = originalFile.substring(originalFile.lastIndexOf("."));
             		
             		//7b2582aca35e4525b4a579d84e8b6c9d
             		String storeName = UUID.randomUUID().toString().replace("-", "");
             		
             		String storeFileName=storeName + extension;
             		
             		File file = new File(filePath + "/" + storeFileName);
             		try {
             			reviewMain.transferTo(file); // 파일을 저장
             		}catch(Exception e) {e.printStackTrace();}
                     reqBodyMap.put("reviewImage", storeFileName);
                     
                     int result = service.reviewFileUpdate( reqBodyMap );
             		if( result > 0 ) {
             			responseBodyMap.put("rsltCode", "0000");
             		    responseBodyMap.put("rsltMsg", "Success");
             		} else {
             		    responseBodyMap.put("rsltCode", "2003");
             		    responseBodyMap.put("rsltMsg", "Data not found.");
             		}
             } catch (Exception e) {
             	e.printStackTrace();
                 reqHeadMap.put(Const.RESULT_CODE,Const.EXCEPTION_ERROR);
                 if(e.getMessage() != null){
                     reqHeadMap.put(Const.RESULT_MESSAGE,e.getMessage());
                 } else {
                     reqHeadMap.put(Const.RESULT_MESSAGE,messageSource.getMessage("500.error", null , Locale.getDefault().ENGLISH ));
                 }
             }

 			/*
 			 * responseMap.put(Const.HEAD,reqHeadMap);
 			 * responseMap.put(Const.BODY,responseBodyMap);
 			 */

         //return JsonObjectConverter.getJSONFromObject(responseMap);
         ModelAndView mv = new ModelAndView("defaultJsonView");
         mv.addObject(Const.HEAD,reqHeadMap);
         mv.addObject(Const.BODY,responseBodyMap);

         return mv;
 	} 
    
	// 내 리뷰 등록 (업로드)
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/writeWithUpload")
	public ModelAndView reviewFileRegist( MultipartHttpServletRequest request, HttpServletResponse response ) {
		//rest로 넘어온 URI Path VARIABLES ATTRIBUTE 맵정보
        Map<String,Object> uriPathVal = (Map<String,Object>)request.getAttribute(Const.REST_URI_PATH_VAL);
        //클라이언트에서 넘어온 request(HEAD+BODY) 모든정보
        Map<String,Object> reqMap =  (Map<String,Object>)request.getAttribute(Const.HTTP_BODY);
        //클라이언트에서 넘어온 공통 헤더 맵정보
        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        //클라이언트에서 넘긴 파라미터 맵정보
        Map<String,Object> reqBodyMap =  new HashMap<String, Object>();

        //클라이언트에서 넘길 Response 맵 세팅
        Map<String,Object> responseMap = new HashMap<String, Object>();
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
        if(reqHeadMap==null){ //restclient를 이용하면 raw데이타가 없기 때문
            reqHeadMap = new HashMap<String, Object>();
        }
        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
        
        reqBodyMap.put("orderNum", request.getParameter("orderNum"));
        reqBodyMap.put("reviewScore", request.getParameter("reviewScore"));
        reqBodyMap.put("reviewContent", request.getParameter("reviewContent"));
        reqBodyMap.put("storeNum", request.getParameter("storeNum"));
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        String fileDir = "/view/review/upload";
		String filePath = request.getServletContext().getRealPath(fileDir);
		System.out.println(filePath);

        try{
                    System.out.println(reqBodyMap.get("reviewContent"));
                    MultipartFile reviewMain = request.getFile("reviewImage"); // reviewmain html에서 설정
                    String originalFile = reviewMain.getOriginalFilename();
            		
            		String extension = originalFile.substring(originalFile.lastIndexOf("."));
            		
            		//7b2582aca35e4525b4a579d84e8b6c9d
            		String storeName = UUID.randomUUID().toString().replace("-", "");
            		
            		String storeFileName=storeName + extension;
            		
            		File file = new File(filePath + "/" + storeFileName);
            		try {
            			reviewMain.transferTo(file); // 파일을 저장
            		}catch(Exception e) {e.printStackTrace();}
                    reqBodyMap.put("reviewImage", storeFileName);
                    
                    int result = service.reviewFileRegist( reqBodyMap );
            		if( result > 0 ) {
            			responseBodyMap.put("rsltCode", "0000");
            		    responseBodyMap.put("rsltMsg", "Success");
            		} else {
            		    responseBodyMap.put("rsltCode", "2003");
            		    responseBodyMap.put("rsltMsg", "Data not found.");
            		}
            } catch (Exception e) {
            	e.printStackTrace();
                reqHeadMap.put(Const.RESULT_CODE,Const.EXCEPTION_ERROR);
                if(e.getMessage() != null){
                    reqHeadMap.put(Const.RESULT_MESSAGE,e.getMessage());
                } else {
                    reqHeadMap.put(Const.RESULT_MESSAGE,messageSource.getMessage("500.error", null , Locale.getDefault().ENGLISH ));
                }
            }

			/*
			 * responseMap.put(Const.HEAD,reqHeadMap);
			 * responseMap.put(Const.BODY,responseBodyMap);
			 */

        //return JsonObjectConverter.getJSONFromObject(responseMap);
        ModelAndView mv = new ModelAndView("defaultJsonView");
        mv.addObject(Const.HEAD,reqHeadMap);
        mv.addObject(Const.BODY,responseBodyMap);

        return mv;
	} 
	
	public String getServerHostURL(HttpServletRequest request) {
        String sHostUrl = request.getScheme() + "://" + request.getServerName() +
                (request.getServerPort() > 0 ? ":" + request.getServerPort() : "") + request.getContextPath();
        sHostUrl = sHostUrl.endsWith("/") ? sHostUrl : sHostUrl + "/";
        return sHostUrl;
    }
	
	// 내 리뷰 수정
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/myreviewupdate" )
	public ModelAndView updateMyReview( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
					        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
					        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
							
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
					        
		int result = service.updateMyReview( reqBodyMap );
					        
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
							
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 가게 리뷰 수정
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/storeupdate" )
	public ModelAndView updateStoreReview( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
				        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
				        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
						
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
				        
		int result = service.updateStoreReview( reqBodyMap );
				        
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
						
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 가게 리뷰 상세 조회
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/storedetail" )
	public ModelAndView getReviewInfo( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
			        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
		ReviewDto info = service.getReviewInfo( reqBodyMap );
			        
		if( !StringUtils.isEmpty(info) ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("orderNum", info.getOrderNum());
			responseBodyMap.put("reviewScore", info.getReviewScore());
			responseBodyMap.put("reviewDate", info.getReviewDate());
			responseBodyMap.put("reviewContent", info.getReviewContent());
			responseBodyMap.put("reviewImage", info.getReviewImage());
			responseBodyMap.put("storeReview", info.getStoreReview());
			responseBodyMap.put("storeNum", info.getStoreNum());
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
					
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 내 리뷰 상세 조회
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/myreviewdetail" )
	public ModelAndView getMemberInfo( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		        
		ReviewDto info = service.getMyReviewInfo( reqBodyMap );
		        
		if( !StringUtils.isEmpty(info) ) {
			responseBodyMap.put("rsltCode", "0000");
		    responseBodyMap.put("rsltMsg", "Success");
		    responseBodyMap.put("orderNum", info.getOrderNum());
		    responseBodyMap.put("reviewScore", info.getReviewScore());
		    responseBodyMap.put("reviewDate", info.getReviewDate());
		    responseBodyMap.put("reviewContent", info.getReviewContent());
		    responseBodyMap.put("reviewImage", info.getReviewImage());
		    responseBodyMap.put("storeReview", info.getStoreReview());
		    responseBodyMap.put("storeNum", info.getStoreNum());
		} else {
		    responseBodyMap.put("rsltCode", "2003");
		    responseBodyMap.put("rsltMsg", "Data not found.");
		}
				
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 가게 리뷰 등록
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/storeinsert" )
	public ModelAndView insertStoreReview( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
			        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
		int result = service.insertStoreReview( reqBodyMap );
			        
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
					
	    ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 가게 리뷰 삭제
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/storedelete" )
	public ModelAndView deleteStoreReview( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		        
		int result = service.deleteStoreReview( reqBodyMap );
		        
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
		    responseBodyMap.put("rsltCode", "2003");
		    responseBodyMap.put("rsltMsg", "Data not found.");
		}
				
        ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 내 리뷰 삭제
	@RequestMapping ( method = RequestMethod.POST, value = "/api/review/mydelete")
	public ModelAndView myReviewDelete( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
        
        if(reqHeadMap==null){
            reqHeadMap = new HashMap<String, Object>();
        }
        
        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
        
        int result = service.myReviewDelete( reqBodyMap );
        
        if( result > 0 ) {
        	responseBodyMap.put("rsltCode", "0000");
            responseBodyMap.put("rsltMsg", "Success");
        } else {
        	responseBodyMap.put("rsltCode", "2003");
            responseBodyMap.put("rsltMsg", "Data not found.");
        }
		
        ModelAndView mv = new ModelAndView("defaultJsonView");
        mv.addObject(Const.HEAD,reqHeadMap);
        mv.addObject(Const.BODY,responseBodyMap);

        return mv;
	}
	
	
	// 내 리뷰 리스트 조회
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/mylist" )
	public ModelAndView getMyReviewList( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	    Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	    Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	    if(reqHeadMap==null){
	    	reqHeadMap = new HashMap<String, Object>();
	    }
	        
	    reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	    reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	    logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	    List<ReviewDto> list = service.getMyReviewlist( reqBodyMap );
	    System.out.println(list.get(0).getReviewDate());    
	    if( !StringUtils.isEmpty(list) ) {
	    	responseBodyMap.put("rsltCode", "0000");
	        responseBodyMap.put("rsltMsg", "Success");
	        responseBodyMap.put("list", list);
	    } else {
	    	responseBodyMap.put("rsltCode", "2003");
	        responseBodyMap.put("rsltMsg", "Data not found.");
	    }
			
	    ModelAndView mv = new ModelAndView("defaultJsonView");
	    mv.addObject(Const.HEAD,reqHeadMap);
	    mv.addObject(Const.BODY,responseBodyMap);

	    return mv;
	}	
	
	// 가게 리뷰 리스트 조회
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/liststore" )
	public ModelAndView getStoreReviewList( HttpServletRequest request, HttpServletResponse response ) {
		
        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
        
        if(reqHeadMap==null){
            reqHeadMap = new HashMap<String, Object>();
        }
        
        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
        
        List<ReviewDto> list = service.getReviewlist( reqBodyMap );
        
        if( !StringUtils.isEmpty(list) ) {
        	responseBodyMap.put("rsltCode", "0000");
            responseBodyMap.put("rsltMsg", "Success");
            responseBodyMap.put("list", list);
        } else {
        	responseBodyMap.put("rsltCode", "2003");
            responseBodyMap.put("rsltMsg", "Data not found.");
        }
		
        ModelAndView mv = new ModelAndView("defaultJsonView");
        mv.addObject(Const.HEAD,reqHeadMap);
        mv.addObject(Const.BODY,responseBodyMap);

        return mv;
	}	
	
	// 리뷰 등록
	@RequestMapping( method = RequestMethod.POST, value = "/api/review/write" )
	public ModelAndView reviewRegist( HttpServletRequest request, HttpServletResponse response ) {
				
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		        
		int result = service.insertReview( reqBodyMap );
		        
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
		    responseBodyMap.put("rsltMsg", "Success");
		} else {
		    responseBodyMap.put("rsltCode", "2003");
		    responseBodyMap.put("rsltMsg", "Data not found.");
		}
				
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
}
