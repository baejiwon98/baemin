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


@Service
public class PurchaseListService {
	
	private Logger logger = LoggerFactory.getLogger(PurchaseListService.class);
	
	@Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;

    @Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
    
  	//구매 내역서 하나 삭제
  	public int deleteOnePurchase( Map<String,Object> param ) {
  		//트렌젝션 구현
  		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
  		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
  		TransactionStatus status = transactionManager_sample.getTransaction(def);

  		int result = 0;
  		try{

  			result = sqlSession.delete("PurchaseList.deletePurchaseOne", param);
  			transactionManager_sample.commit(status);
  			logger.info("========== 항목 삭제 완료 : {}", result);
                
  		}catch(Exception e){
  			logger.error("[ERROR] deleteOnePurchase() Fail : e : {}", e.getMessage());
  			e.printStackTrace();
  			transactionManager_sample.rollback(status);    	
  		}
  		return result;
  	}
  	//구매 내역서 하나 삭제
  	public int deleteAllPurchase( Map<String,Object> param ) {
  		//트렌젝션 구현
  		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
  		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
  		TransactionStatus status = transactionManager_sample.getTransaction(def);

  		int result = 0;
  		try{

  			result = sqlSession.delete("PurchaseList.deletePurchaseAll", param);
  			transactionManager_sample.commit(status);
  			logger.info("========== 항목 전체 삭제 완료 : {}", result);
                
  		}catch(Exception e){
  			logger.error("[ERROR] deleteAllPurchase() Fail : e : {}", e.getMessage());
  			e.printStackTrace();
  			transactionManager_sample.rollback(status);    	
  		}
  		return result;
  	}
}
