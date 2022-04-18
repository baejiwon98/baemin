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
	
	// 배달 결제
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentDelivery" )
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
	
	// 포장 결제
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
	
	// 현재 사장이 승인할 수 있는 주문 목록
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentStoreNow" )
	public ModelAndView paymentStoreNow( HttpServletRequest request, HttpServletResponse response ) {
				
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
					
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
			
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
							
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
					        
		List<OrderViewDto> list = service.paymentStoreNow(reqBodyMap);
				
					        
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
	
	// 라이더가 배달할 수 있는 주문 내역 전체 보기
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentDeliveryNow" )
	public ModelAndView paymentDeliveryNow( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
						
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
									
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		List<OrderViewDto> list = service.paymentDeliveryNow(reqBodyMap);

			
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
	
	// 라이더가 배달 중인 주문 내역 전체 보기
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentDeliverying" )
	public ModelAndView paymentDeliverying( HttpServletRequest request, HttpServletResponse response ) {

		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();

		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			
		List<OrderViewDto> list = service.paymentDeliverying(reqBodyMap);

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
	
	// 라이더 자신의 배달 내역 전체 보기
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
		
	// 결제 페이지에서 정보 띄우기
	@RequestMapping( method = RequestMethod.POST, value = "/api/payment/paymentPage" )
	public ModelAndView paymentPage( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		PaymentDetailDto info = service.getPaymentInfo( reqBodyMap );
		        
		if( !StringUtils.isEmpty(info) ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("memberNum", info.getMemberNum());
			responseBodyMap.put("memberAddr", info.getMemberAddr());
			responseBodyMap.put("memberPhone", info.getMemberPhone());
			responseBodyMap.put("storeNum", info.getStoreNum());
			responseBodyMap.put("deliveryPrice", info.getDeliveryPrice());
			responseBodyMap.put("totalPrice", info.getTotalPrice());
			responseBodyMap.put("orderTotalPrice", info.getOrderTotalPrice());
			
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
	        List<PaymentDetailDto> list = service.getPaymentMenuDetail( reqBodyMap );
	        
	        if( !StringUtils.isEmpty(info) ) {
	        	responseBodyMap.put("rsltCode", "0000");
	            responseBodyMap.put("rsltMsg", "Success");
	            responseBodyMap.put("list", list);
	            responseBodyMap.put("orderNum", info.getOrderNum());
	            responseBodyMap.put("orderTime", info.getOrderTime());
	            responseBodyMap.put("storeRequest", info.getStoreRequest());
	            responseBodyMap.put("orderStatus", info.getOrderStatus());
	            responseBodyMap.put("orderTotalPrice", info.getOrderTotalPrice());
	            responseBodyMap.put("memberNum", info.getMemberNum());
	            responseBodyMap.put("memAddress", info.getMemAddress());
	            responseBodyMap.put("memPhone", info.getMemPhone());
	            responseBodyMap.put("deliveryRequest", info.getDeliveryRequest());
	            responseBodyMap.put("storeName", info.getStoreName());
	            responseBodyMap.put("storeAddr", info.getStoreAddr());
	            responseBodyMap.put("storePhone", info.getStorePhone());
	            responseBodyMap.put("deliveryPrice", info.getDeliveryPrice());
	            responseBodyMap.put("paymentCategory", info.getPaymentCategory());
	            
	        } else {
	        	responseBodyMap.put("rsltCode", "2003");
	            responseBodyMap.put("rsltMsg", "Data not found.");
	        }
			
	        ModelAndView mv = new ModelAndView("defaultJsonView");
	        mv.addObject(Const.HEAD,reqHeadMap);
	        mv.addObject(Const.BODY,responseBodyMap);

	        return mv;
		}
		
		//주문 취소
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusCancel" )
		public ModelAndView statusCancel( HttpServletRequest request, HttpServletResponse response ) {
			
	        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        int result = service.statusCancel( reqBodyMap );
	        
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
		
		//조리 중
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusCooking" )
		public ModelAndView statusCooking( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			int result = service.statusCooking( reqBodyMap );
			        
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
				
		//조리 완료
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusCookEnd" )
		public ModelAndView statusCookEnd( HttpServletRequest request, HttpServletResponse response ) {
			
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			int result = service.statusCookEnd( reqBodyMap );
			        
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
			
		//배달 대기 중
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusDeliveryWait" )
		public ModelAndView statusDeliveryWait( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
				
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			
			int result = service.deliveryMatching( reqBodyMap );
			result += service.statusDeliveryWait( reqBodyMap );
			
			if( result > 1 ) {
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
				
		//배달 중
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusDeliverying" )
		public ModelAndView statusDeliverying( HttpServletRequest request, HttpServletResponse response ) {
			
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			
			int result = service.statusDeliverying( reqBodyMap );
			
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
				
		//배달 완료
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusDelvieryEnd" )
		public ModelAndView statusDelvieryEnd( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			int result = service.statusDelvieryEnd( reqBodyMap );
			        
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
		
		//픽업 대기중
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusPickUpWait" )
		public ModelAndView statusPickUpWait( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			int result = service.statusPickUpWait( reqBodyMap );
			        
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
				
		//픽업 완료
		@RequestMapping( method = RequestMethod.POST, value = "/api/payment/statusPickUpEnd" )
		public ModelAndView statusPickUpEnd( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			int result = service.statusPickUpEnd( reqBodyMap );
			        
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
