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

import edu.example.dto.OrderViewDto;
import edu.example.dto.PaymentDetailDto;
import edu.example.service.PaymentService;
import kr.msp.constant.Const;

@Controller
public class PaymentController {

	private Logger logger = LoggerFactory.getLogger(PaymentController.class);
	
	@Autowired(required=true)
	private PaymentService service;
	
	// 주문서 추가
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentInsert" )
	public ModelAndView regPaymentInsert( HttpServletRequest request, HttpServletResponse response ) {
		
        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
        
        if(reqHeadMap==null){
            reqHeadMap = new HashMap<String, Object>();
        }
        
        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
        
        int result = service.paymentInsert( reqBodyMap );
        
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
	
	// 포장 주문
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentPickUp" )
	public ModelAndView paymentPickUp( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
	        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
		int result = service.paymentPickUp( reqBodyMap );
	        
		if( result > 0 ) {
			service.deleteOrder(null);
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
	
	//구매 리스트 추가
	@RequestMapping( method = RequestMethod.POST, value = "/api/purchaseList/insert" )
	public ModelAndView insertPurchase( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
	        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
		int result = service.insertPurchase( reqBodyMap );
	        
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
	
	//주문 삭제
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentDelete" )
	public ModelAndView regPaymentDelete( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();		
		}
	        	
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		int result = service.paymentDelete( reqBodyMap );
	        
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
		
	// 주문 내역 전체 보기(고객)
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentAllMember" )
	public ModelAndView paymentAllMember( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
			        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
	
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
		List<OrderViewDto> list = service.paymentAllMember(reqBodyMap);
		
		if( !StringUtils.isEmpty(list) ) {           
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", list);
		}else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
			
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);
		
		return mv;
	}
	
	// 주문 내역 전체 보기(사장)
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentAllStore" )
	public ModelAndView paymentAllStore( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
				
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
				        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
						
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
				        
		List<OrderViewDto> list = service.paymentAllStore(reqBodyMap);
			
				        
		if( !StringUtils.isEmpty(list) ) {           
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", list);
		}else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
			
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);
			
		return mv;
	}
	
	// 주문 내역 전체 보기(라이더)
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentAllDelivery" )
	public ModelAndView paymentAllDelivery( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
					
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
								
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
					        
		List<OrderViewDto> list = service.paymentAllDelivery(reqBodyMap);
				
					        
		if( !StringUtils.isEmpty(list) ) {           
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", list);
		}else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
				
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);
				
		return mv;
	}
		
	// 주문 페이지 정보
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentPage" )
	public ModelAndView PaymentInfo( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();

		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
			        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
		PaymentDetailDto memAddr = service.getMemberAddr( reqBodyMap );
		PaymentDetailDto deliveryPrice = service.getDeliveryPrice( reqBodyMap );
		
		Integer objectPrice = service.getObjPrice(reqBodyMap);
        Integer buyQty = service.getQty(reqBodyMap);
        
        Integer totalPrice = objectPrice * buyQty;
        
		if( !StringUtils.isEmpty(memAddr) && !StringUtils.isEmpty(deliveryPrice) ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("memberAddr 배달지", memAddr.getMemberAddr());
	        responseBodyMap.put("totalPrice 구매액", totalPrice);
			responseBodyMap.put("deliveryPrice 배달료", deliveryPrice.getDeliveryPrice());
			responseBodyMap.put("결제금액", deliveryPrice.getDeliveryPrice()+totalPrice);
				
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
					
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);
			
		return mv;
	}
		
		// 주문 상세 조회
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentDetail" )
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
	        
	        PaymentDetailDto info = service.getPaymentDetail( reqBodyMap );
	        
	        if( !StringUtils.isEmpty(info) ) {
	        	responseBodyMap.put("rsltCode", "0000");
	            responseBodyMap.put("rsltMsg", "Success");
	            responseBodyMap.put("orderNum 주문번호", info.getOrderNum());
	            responseBodyMap.put("orderTime 주문시간", info.getOrderTime());
	            responseBodyMap.put("storeRequest 매장요청사항", info.getStoreRequest());
	            responseBodyMap.put("orderStatus 주문상태", info.getOrderStatus());
	            responseBodyMap.put("orderTotalPrice 주문총액", info.getOrderTotalPrice());
	            responseBodyMap.put("memberNum 고객번호", info.getMemberNum());
	            responseBodyMap.put("memberAddr 배달지", info.getMemberAddr());
	            responseBodyMap.put("memberPhone 연락처", info.getMemberPhone());
	            responseBodyMap.put("deliveryRequest 배달요청사항", info.getDeliveryRequest());
//	            responseBodyMap.put("totalPrice 메뉴총액", info.getTotalPrice());
	            responseBodyMap.put("objectPrice 상품가격", info.getObjectPrice());
	            responseBodyMap.put("objectNum 상품번호", info.getObjectNum());
	            responseBodyMap.put("objectName 상품이름", info.getObjectName());
	            responseBodyMap.put("storeName 상호명", info.getStoreName());
	            responseBodyMap.put("storeAddr 사업자주소", info.getStoreAddr());
	            responseBodyMap.put("storePhone 운영전화번호", info.getStorePhone());
	            responseBodyMap.put("deliveryPrice 배달료", info.getDeliveryPrice());
	            responseBodyMap.put("paymentCategory 결제방법", info.getPaymentCategory());
	            
	        } else {
	        	responseBodyMap.put("rsltCode", "2003");
	            responseBodyMap.put("rsltMsg", "Data not found.");
	        }
			
	        ModelAndView mv = new ModelAndView("defaultJsonView");
	        mv.addObject(Const.HEAD,reqHeadMap);
	        mv.addObject(Const.BODY,responseBodyMap);

	        return mv;
		}
		
		//수정
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusUpdate" )
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
	        
	        int result = service.statusUpdate( reqBodyMap );
	        
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
