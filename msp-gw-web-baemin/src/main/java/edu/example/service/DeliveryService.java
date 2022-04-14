package edu.example.service;

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

import edu.example.dto.DeliveryDTO;

@Service
public class DeliveryService {
	
	private Logger logger = LoggerFactory.getLogger(DeliveryService.class);
	
	@Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;

    @Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
    
    public int updateDeliveryAddr(Map<String,Object> param) {
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    
    	int result = 0;
    	try {
    		DeliveryDTO info = sqlSession.selectOne("Delivery.detailDelivery", param);
    		result = sqlSession.update("Delivery.updateDeliveryAddr", param);
    			    	
	    	transactionManager_sample.commit(status);
	    	logger.info("========== updateDelivery 완료 : {}", result);
		}catch(Exception e) {
			logger.error("[ERROR] updateDelivery() Fail : e : {}", e.getMessage());
			e.printStackTrace();
	    	transactionManager_sample.rollback(status);    	
		}
		return result;
    }
    
    public int insertDelivery(Map<String, Object> param) {
    	// 트렌젝션 구현
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    
    	int result = 0;
    	try {
    		String num = sqlSession.selectOne("Delivery.deliveryAutoNum");
        	param.put("deliveryNum", num);
    		
    		result = sqlSession.insert("Delivery.insertDelivery", param);
        	
	    	transactionManager_sample.commit(status);
	    	logger.info("========== insertDelivery 완료 : {}", result);
		}catch(Exception e) {
			logger.error("[ERROR] insertDelivery() Fail : e : {}", e.getMessage());
			e.printStackTrace();
	    	transactionManager_sample.rollback(status);    	
		}
		return result;
    }
    
    public DeliveryDTO detailDelivery(Map<String, Object> param) {
    	return sqlSession.selectOne("Delivery.detailDelivery", param);
    }
    
    public int updateDelivery(Map<String,Object> param) {
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    
    	int result = 0;
    	try {
    		DeliveryDTO info = sqlSession.selectOne("Delivery.detailDelivery", param);
    		if(param.get("deliveryPw").equals(info.getDeliveryPw())) {
    			result = sqlSession.update("Delivery.updateDelivery", param);
    		} else {
    			result = 0;
    		}
	    	
	    	transactionManager_sample.commit(status);
	    	logger.info("========== updateDelivery 완료 : {}", result);
		}catch(Exception e) {
			logger.error("[ERROR] updateDelivery() Fail : e : {}", e.getMessage());
			e.printStackTrace();
	    	transactionManager_sample.rollback(status);    	
		}
		return result;
    }
    
    public int deleteDelivery(Map<String,Object> param) {
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    	
    	int result = 0;
    	try {
    		DeliveryDTO info = sqlSession.selectOne("Delivery.detailDelivery", param);
    		if(info.getDeliveryPw().equals(param.get("deliveryPw"))) {
    			result = sqlSession.update("Delivery.deleteDelivery", param);
    		}
    		
    		transactionManager_sample.commit(status);
    		logger.info("========== deleteDelivery 완료 : {}", result);
    	}catch(Exception e) {
    		logger.error("[ERROR] deleteDelivery() Fail : e : {}", e.getMessage());
    		e.printStackTrace();
    		transactionManager_sample.rollback(status);    	
    	}
    	return result;
    }
    

}
