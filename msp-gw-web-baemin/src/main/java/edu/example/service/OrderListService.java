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

import edu.example.dto.OrderListAllDto;
import edu.example.dto.OrderListDto;
import edu.example.dto.PaymentDetailDto;


@Service
public class OrderListService {
   
   private Logger logger = LoggerFactory.getLogger(OrderListService.class);
   
   @Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;

    @Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
    
    
    //내 장바구니 전체 보기
    public List<OrderListAllDto> orderList( Map<String,Object> param ) {
       return sqlSession.selectList("OrderList.selectAll", param);
   }
    
    //장바구니 배달/포장 여부
    public String staCheck( Map<String,Object> param ) {
		return sqlSession.selectOne("OrderList.staCheck", param);
	}
    
    //추가
     public int insertOrder( Map<String,Object> param ) {
        //트렌젝션 구현
          DefaultTransactionDefinition def = new DefaultTransactionDefinition();
          def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
          TransactionStatus status = transactionManager_sample.getTransaction(def);

          int result = 0;
          try{      
              result = sqlSession.insert("OrderList.insertOrder", param);
              
              transactionManager_sample.commit(status);
              logger.info("========== 추가 완료 : {}", result);
              
          }catch(Exception e){
             logger.error("[ERROR] insertOrder() Fail : e : {}", e.getMessage());
             e.printStackTrace();
             transactionManager_sample.rollback(status);       
          }
        return result;
     }
     
  //주문 리스트 항목 하나 삭제
     public int deleteOneOrder( Map<String,Object> param ) {
        //트렌젝션 구현
          DefaultTransactionDefinition def = new DefaultTransactionDefinition();
          def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
          TransactionStatus status = transactionManager_sample.getTransaction(def);

          int result = 0;
          try{

             result = sqlSession.delete("OrderList.deleteOneOrder", param);
            transactionManager_sample.commit(status);
            logger.info("========== 항목 삭제 완료 : {}", result);
              
          }catch(Exception e){
             logger.error("[ERROR] deleteOneOrder() Fail : e : {}", e.getMessage());
             e.printStackTrace();
             transactionManager_sample.rollback(status);       
          }
        return result;
     }
     
  //주문리스트 전체 삭제
     public int deleteOrder( Map<String,Object> param ) {
        //트렌젝션 구현
          DefaultTransactionDefinition def = new DefaultTransactionDefinition();
          def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
          TransactionStatus status = transactionManager_sample.getTransaction(def);

          int result = 0;
          try{

               result = sqlSession.delete("OrderList.deleteOrder", param);

              transactionManager_sample.commit(status);
              logger.info("========== 전체 삭제 완료 : {}", result);
              
          }catch(Exception e){
             logger.error("[ERROR] deleteOrder() Fail : e : {}", e.getMessage());
             e.printStackTrace();
             transactionManager_sample.rollback(status);       
          }
        return result;
     }
     
  //주문 리스트 수정
     public int updateOrder( Map<String,Object> param ) {
        //트렌젝션 구현
          DefaultTransactionDefinition def = new DefaultTransactionDefinition();
          def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
          TransactionStatus status = transactionManager_sample.getTransaction(def);
          int result = 0;
          try{
             
             result = sqlSession.update("OrderList.updateOrder", param);
              transactionManager_sample.commit(status);
              logger.info("========== 수정 완료 : {}", result);
              
          }catch(Exception e){
             logger.error("[ERROR] updateOrder() Fail : e : {}", e.getMessage());
             e.printStackTrace();
             transactionManager_sample.rollback(status);       
          }
        return result;
     }

}