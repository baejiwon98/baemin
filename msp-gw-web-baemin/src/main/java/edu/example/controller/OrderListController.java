package edu.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import edu.example.dto.OrderListAllDto;
import edu.example.dto.OrderListDto;
import edu.example.dto.PaymentDetailDto;
import edu.example.service.OrderListService;
import kr.msp.constant.Const;

@Controller
public class OrderListController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired(required=true)
	private OrderListService service;
	
	// 주문리스트 항목 추가
	@RequestMapping( method = RequestMethod.POST, value = "/api/orderList/Insert" )
	public ModelAndView regOrderList( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
	        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
		int result = service.insertOrder( reqBodyMap );
	        
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
		
	//주문리스트 항목 개별 삭제
	@RequestMapping( method = RequestMethod.POST, value = "/api/orderList/DeleteOne" )
	public ModelAndView deleteOneOrder( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
	        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
		int result = service.deleteOneOrder( reqBodyMap );
	        
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
		
		//장바구니 전체 삭제
		@RequestMapping( method = RequestMethod.POST, value = "/api/orderList/DeleteAll" )
		public ModelAndView deleteOrder( HttpServletRequest request, HttpServletResponse response ) {
			
	        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        int result = service.deleteOrder( reqBodyMap );
	        
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
      
      // 주문 리스트(장바구니 항목) 전체 보기
      @RequestMapping( method = RequestMethod.POST, value = "/api/orderList/SelectAll" )
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
           
           List<OrderListAllDto> list = service.orderList(reqBodyMap);
           
           Integer a = list.size();
           System.out.println("리스트의 행은 " +a);
           
           String strNum = list.get(0).getStoreNum().toString();
           String deliPrice = list.get(0).getDeliveryPrice().toString();
           String memNum = list.get(0).getMemberNum().toString();
           String strName = list.get(0).getStoreName().toString();
           String status = list.get(0).getStatus().toString();
         
           
           if( !StringUtils.isEmpty(list) ) {           
              responseBodyMap.put("rsltCode", "0000");
              responseBodyMap.put("rsltMsg", "Success");
              responseBodyMap.put("list", list);
              responseBodyMap.put("storeNum", strNum);
              responseBodyMap.put("memberNum", memNum);
              responseBodyMap.put("deliveryPrice", deliPrice);
              responseBodyMap.put("storeName", strName);
              responseBodyMap.put("status", status);
             
           }else {
              responseBodyMap.put("rsltCode", "2003");
              responseBodyMap.put("rsltMsg", "Data not found.");
           }
         
           ModelAndView mv = new ModelAndView("defaultJsonView");
           mv.addObject(Const.HEAD,reqHeadMap);
           mv.addObject(Const.BODY,responseBodyMap);

           return mv;
      }
      
      //장바구니 수정
      @RequestMapping( method = RequestMethod.POST, value = "/api/orderList/Update" )
      public ModelAndView updateMember( HttpServletRequest request, HttpServletResponse response ) {
         
           Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
           Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
           Map<String, Object> responseBodyMap= new HashMap<String, Object>();
           
           if(reqHeadMap==null){
               reqHeadMap = new HashMap<String, Object>();
           }
           
           reqHeadMap.put(Const.RESULT_CODE, Const.OK);
           reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
         
           logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
           
           int result = service.updateOrder( reqBodyMap );
           
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
		
		
		//장바구니 항목 중복 체크
		@RequestMapping( method = RequestMethod.POST, value = "/api/orderList/checksta" )
		public ModelAndView staCheck( HttpServletRequest request, HttpServletResponse response ) {
							
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
					
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
					        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());


			String status = service.staCheck( reqBodyMap );			
			System.out.println(status);
			if( status.equals("D") ) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("dupDP", "D");
			} else {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("dupDP", "P");
			}
					
			ModelAndView mv = new ModelAndView("defaultJsonView");
			mv.addObject(Const.HEAD,reqHeadMap);
			mv.addObject(Const.BODY,responseBodyMap);

         return mv;
      }   
}