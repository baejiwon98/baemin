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
	        PaymentDetailDto deliveryPrice = service.getDeliveryPrice( reqBodyMap );
	        PaymentDetailDto storeName = service.getStoreName(reqBodyMap);
	        Integer objectPrice = service.getObjPrice(reqBodyMap);
	        Integer buyQty = service.getQty(reqBodyMap);
	        
	        Integer totalPrice = objectPrice * buyQty;
	        
	        if( !StringUtils.isEmpty(list) ) {           
	           responseBodyMap.put("rsltCode", "0000");
	           responseBodyMap.put("rsltMsg", "Success");
	           responseBodyMap.put("list", list);
	           responseBodyMap.put("deliveryPrice 배달료", deliveryPrice.getDeliveryPrice());
	           responseBodyMap.put("storeName 가게명", storeName.getStoreName());
	           responseBodyMap.put("objectPrice 상품 가격", objectPrice);
	           responseBodyMap.put("buyQty 구매 수량", buyQty);
	           responseBodyMap.put("totalPrice 구매액", totalPrice);
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
		@RequestMapping( method = RequestMethod.POST, value = "/api/orderList/checkObj" )
		public ModelAndView objCheck( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());


			OrderListDto list  = service.objCheck( reqBodyMap );			
			
			if( !StringUtils.isEmpty(list) ) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("dupYn", "Y");
			} else {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("dupYn", "N");
			}
					
			ModelAndView mv = new ModelAndView("defaultJsonView");
			mv.addObject(Const.HEAD,reqHeadMap);
			mv.addObject(Const.BODY,responseBodyMap);

			return mv;
		}	
		
	
}
