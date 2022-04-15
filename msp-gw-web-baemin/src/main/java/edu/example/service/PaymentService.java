package edu.example.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import edu.example.dto.OrderViewDto;
import edu.example.dto.PaymentDetailDto;

@Service
public class PaymentService {
	
	private Logger logger = LoggerFactory.getLogger(PaymentService.class);
	
	@Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;

    @Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
    
    //주소 가져오기
    public PaymentDetailDto getMemberAddr( Map<String,Object> param ) {
		return sqlSession.selectOne("Payment.getMemberAddr", param);
	}
    
    //배달팁 가져오기
    public PaymentDetailDto getDeliveryPrice( Map<String,Object> param ) {
		return sqlSession.selectOne("Payment.getDeliveryPrice", param);
	}
    
    //상품 가격 가져오기
    public Integer getObjPrice(Map<String,Object> param) {
    	return sqlSession.selectOne("Payment.getObjPrice", param);
    }
    
    //상품 수량 가져오기
    public Integer getQty(Map<String,Object> param) {
    	return sqlSession.selectOne("Payment.getQty", param);
    }
	
    //상세보기
    public PaymentDetailDto getPaymentDetail( Map<String,Object> param ) {
		return sqlSession.selectOne("Payment.getPaymentDetail", param);
	}
    
    //고객이 자신의 주문내역 전체 보기
    public List<OrderViewDto> paymentAllMember( Map<String,Object> param ) {
    	return sqlSession.selectList("Payment.getPaymentMember", param);
	}
    
    //사장이 자신의 주문내역 전체 보기
    public List<OrderViewDto> paymentAllStore( Map<String,Object> param ) {
    	return sqlSession.selectList("Payment.getPaymentStore", param);
	}
    
    //배달원이 자신의 배달내역 전체 보기
    public List<OrderViewDto> paymentAllDelivery( Map<String,Object> param ) {
    	return sqlSession.selectList("Payment.getPaymentDelivery", param);
	}
	
	//주문서 추가
	public int paymentInsert( Map<String,Object> param ) {
		
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
        	String num = sqlSession.selectOne("Payment.autoNum");
        	param.put("orderNum", num);
            result += sqlSession.insert("Payment.insertPayment", param);
            System.out.println(result + "결제 성공");
            result += sqlSession.update("Payment.insertMemInfo", param);
            System.out.println(result + "배송지 업데이트 성공");
            result += sqlSession.insert("Payment.insertPurchase", param);
            System.out.println(result + "구매리스트 추가 성공");
            result += sqlSession.delete("Payment.deleteOrder", param);
            System.out.println(result + "장바구니 지우기 성공");
            
            transactionManager_sample.commit(status);
            logger.info("========== 주문서 추가 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] paymentInsert() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);
        }
		return result;
	}
	
	//포장 주문
	public int paymentPickUp( Map<String,Object> param ) {
			
		//트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try{
			String num = sqlSession.selectOne("Payment.autoNum");
			param.put("orderNum", num);
			result += sqlSession.insert("Payment.insertPayment", param);
			result += sqlSession.update("Payment.insertMemInfo", param);
	        
			transactionManager_sample.commit(status);
			logger.info("========== 주문서 추가 완료 : {}", result);
	            
		}catch(Exception e){
			logger.error("[ERROR] paymentInsert() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);    	
		}
		return result;
	}
	
	//주문리스트(장바구니) 전체 삭제
  	public int deleteOrder( Map<String,Object> param ) {
  		//트렌젝션 구현
          DefaultTransactionDefinition def = new DefaultTransactionDefinition();
          def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
          TransactionStatus status = transactionManager_sample.getTransaction(def);

          int result = 0;
          try{

          	  result = sqlSession.delete("Payment.deleteOrder", param);

              transactionManager_sample.commit(status);
              logger.info("========== 전체 삭제 완료 : {}", result);
              
          }catch(Exception e){
          	logger.error("[ERROR] deleteOrder() Fail : e : {}", e.getMessage());
          	e.printStackTrace();
          	transactionManager_sample.rollback(status);    	
          }
  		return result;
  	}
		
	
	//주문 내역 삭제
		public int paymentDelete( Map<String,Object> param ) {
			//트렌젝션 구현
	        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
	        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
	        TransactionStatus status = transactionManager_sample.getTransaction(def);

	        int result = 0;
	        try{

	        	result = sqlSession.delete("Payment.paymentDelete", param);

	            transactionManager_sample.commit(status);
	            logger.info("========== 주문 삭제 완료 : {}", result);
	            
	        }catch(Exception e){
	        	logger.error("[ERROR] paymentDelete() Fail : e : {}", e.getMessage());
	        	e.printStackTrace();
	        	transactionManager_sample.rollback(status);    	
	        }
			return result;
		}
		
		//주문 상태 수정
		public int statusUpdate( Map<String,Object> param ) {
			//트렌젝션 구현
	        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
	        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
	        TransactionStatus status = transactionManager_sample.getTransaction(def);
	        int result = 0;
	        try{
	        	
	        	result = sqlSession.update("Payment.statusUpdate", param);
	            transactionManager_sample.commit(status);
	            logger.info("========== 주문 상태 수정 완료 : {}", result);
	            
	        }catch(Exception e){
	        	logger.error("[ERROR] statusUpdate() Fail : e : {}", e.getMessage());
	        	e.printStackTrace();
	        	transactionManager_sample.rollback(status);    	
	        }
			return result;
		}
		
		//구매 내역서 추가
	  	public int insertPurchase( Map<String,Object> param ) {
	  		//트렌젝션 구현
	  		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
	  		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
	  		TransactionStatus status = transactionManager_sample.getTransaction(def);

	  		int result = 0;
	  		try{
	  			result += sqlSession.insert("Payment.insertPurchase", param);
	  			transactionManager_sample.commit(status);
	  			logger.info("========== 주문서 추가 완료 : {}", result);
	  	            
	  		}catch(Exception e){
	  			logger.error("[ERROR] insertPurchase() Fail : e : {}", e.getMessage());
	  			e.printStackTrace();
	  			transactionManager_sample.rollback(status);    	
	  		}
	  		return result;
	  	}
}
