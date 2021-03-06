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

import edu.example.dto.AlarmDto;
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
    
    //상품 가격 가져오기
    public Integer getObjPrice(Map<String,Object> param) {
       return sqlSession.selectOne("Payment.getObjPrice", param);
    }
    
    //상품 총 수량 가져오기
    public Integer getQtyAll(Map<String,Object> param) {
       return sqlSession.selectOne("Payment.getQtyAll", param);
    }
    
    //상품 각각의 수량 가져오기
    public Integer getQtyOne(Map<String,Object> param) {
       return sqlSession.selectOne("Payment.getQtyOne", param);
    }
   
    //상세보기
    public PaymentDetailDto getPaymentDetail( Map<String,Object> param ) {
      return sqlSession.selectOne("Payment.getPaymentDetail", param);
   }
    
    //상세보기 (메뉴 항목)
    public List<PaymentDetailDto> getPaymentMenuDetail( Map<String,Object> param ) {
      return sqlSession.selectList("Payment.getPaymentMenuDetail", param);
   }
    
    //결제 페이지
    public PaymentDetailDto getPaymentInfo( Map<String,Object> param ) {
      return sqlSession.selectOne("Payment.getPaymentInfo", param);
   }
    
    //고객이 자신의 주문내역 전체 보기
    public List<OrderViewDto> paymentAllMember( Map<String,Object> param ) {
       return sqlSession.selectList("Payment.getPaymentMember", param);
   }
    
    //사장이 자신의 가게의 주문내역 전체 보기
    public List<OrderViewDto> paymentAllStore( Map<String,Object> param ) {
       return sqlSession.selectList("Payment.getPaymentStore", param);
   }
    
    //사장이 현재 들어온 주문내역 보기
    public List<OrderViewDto> paymentStoreNow( Map<String,Object> param ) {
       return sqlSession.selectList("Payment.getPaymentStoreNow", param);
   }
    
    //배달원이 자신의 배달내역 전체 보기
    public List<OrderViewDto> paymentAllDelivery( Map<String,Object> param ) {
       return sqlSession.selectList("Payment.getPaymentDelivery", param);
   }
    
    //배달원이 배달할 수 있는 주문 내역 전체 보기
    public List<OrderViewDto> paymentDeliveryNow( Map<String,Object> param ) {
       return sqlSession.selectList("Payment.getPaymentDeliveryNow", param);
   }
    
    //배달원이 현재 배달 중인 주문 내역 전체 보기
    public List<OrderViewDto> paymentDeliverying( Map<String,Object> param ) {
       return sqlSession.selectList("Payment.getPaymentDeliverying", param);
   }
   
   //배달 결제하기
   public int paymentInsert( Map<String,Object> param ) {
      
      //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        
        int result = 0;
        try{
           String num = sqlSession.selectOne("Payment.autoNum");

            Integer menuQty = sqlSession.selectOne("Payment.getQtyAll", param);
//           Integer objQty = sqlSession.selectOne("Payment.getQtyOne", param);
           
           param.put("orderNum", num);
           param.put("menuQty", menuQty);
//           param.put("object_Qty", objQty);
           
           
           
            result += sqlSession.insert("Payment.insertPaymentD", param);
            
            if(result > 0) {
               System.out.println(result + "결제 성공");
//               result += sqlSession.update("Payment.objectQtyUpdate", param);
            }
            if(result > 0) {
//               System.out.println(result + "상품 재고 수량 감소 성공");
               result += sqlSession.insert("Payment.insertPurchase", param);
            }
            if(result > 0) {
               System.out.println(result + "구매리스트 추가 성공");
               result += sqlSession.delete("Payment.deleteOrder", param);
                System.out.println(result + "장바구니 지우기 성공");
            }
            if(result> 0) {
               result += sqlSession.insert("Payment.newAlarm", param);
               result += sqlSession.update("Payment.employeeGoAlarm", param);
               System.out.println(result + "알림 테스트");
            }
//            if(result != 3) {
//               transactionManager_sample.rollback(status);
//            }
            
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
         result = sqlSession.insert("Payment.insertPaymentP", param);
         if(result > 0) {
            result = sqlSession.insert("Payment.insertPurchase", param);
               System.out.println(result + "구매리스트 추가 성공");
               if(result > 0) {
                  result = sqlSession.delete("Payment.deleteOrder", param);
                  System.out.println(result + "장바구니 지우기 성공");
                   if(result > 0) {
                     result += sqlSession.insert("Payment.newAlarm", param);
                     result += sqlSession.update("Payment.employeeGoAlarm", param);
                     System.out.println(result + "알림 테스트");
                   }
               }
         }
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
           
           result = sqlSession.update("Payment.paymentDelete", param);
           
           transactionManager_sample.commit(status);
           logger.info("========== 주문 삭제 완료 : {}", result);
           
        }catch(Exception e){
           logger.error("[ERROR] paymentDelete() Fail : e : {}", e.getMessage());
           e.printStackTrace();
              transactionManager_sample.rollback(status);       
        }
        return result;
     }

     //주문 취소
     public int statusCancel( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
           
           result = sqlSession.update("Payment.statusCancel", param);
           if(result > 0) {
               result += sqlSession.update("Payment.orderCancel", param);
               System.out.println(result + "주문이 취소되었습니다.");
            }
           transactionManager_sample.commit(status);
           logger.info("========== 주문 취소 완료 : {}", result);
           
        }catch(Exception e){
           logger.error("[ERROR] statusCancel() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
      
     //조리 중
     public int statusCooking( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
                    
           result = sqlSession.update("Payment.statusCooking", param);
           if(result > 0) {
               result += sqlSession.update("Payment.cooking", param);
               System.out.println(result + "주문이 승인되었습니다.");
            }
           transactionManager_sample.commit(status);
           logger.info("========== 메뉴가 조리되는 중입니다. : {}", result);

         }catch(Exception e){
            logger.error("[ERROR] statusCooking() Fail : e : {}", e.getMessage());
            e.printStackTrace();
            transactionManager_sample.rollback(status);       
         }
        return result;
     }
   
     //조리 완료
     public int statusCookEnd( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
                          
           result = sqlSession.update("Payment.statusCookEnd", param);
           if(result > 0) {
               result += sqlSession.update("Payment.cookingEnd", param);
               System.out.println(result + "주문이 승인되었습니다.");
            }
           transactionManager_sample.commit(status);
           logger.info("========== 조리 완료 : {}", result);
            
        }catch(Exception e){
           logger.error("[ERROR] statusCookEnd() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
            
     //배달 대기 중
     public int statusDeliveryWait( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
           
           result = sqlSession.update("Payment.statusDeliveryWait", param);
           if(result > 0) {
               result += sqlSession.update("Payment.deliveryWait", param);
               System.out.println(result + "주문이 승인되었습니다.");
            }
           transactionManager_sample.commit(status);
           logger.info("========== 배달 대기 중입니다 : {}", result);
                           
        }catch(Exception e){
           logger.error("[ERROR] statusDeliveryWait() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     //배달원이 주문 선택
     public int deliveryMatching( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
                          
           result = sqlSession.update("Payment.deliveryMatching", param);
           transactionManager_sample.commit(status);
           logger.info("========== 주문 선택 완료 : {}", result);
                           
        }catch(Exception e){
           logger.error("[ERROR] deliveryMatching() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     //배달 중
     public int statusDeliverying( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
                          
           result = sqlSession.update("Payment.statusDeliverying", param);
           if(result > 0) {
               result += sqlSession.update("Payment.deliverying", param);
            }
           transactionManager_sample.commit(status);
           logger.info("========== 배달이 진행 중 입니다 : {}", result);
                           
        }catch(Exception e){
           logger.error("[ERROR] statusDeliverying() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     //배달 완료
     public int statusDelvieryEnd( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
                          
           result = sqlSession.update("Payment.statusDelvieryEnd", param);
           if(result > 0) {
               result += sqlSession.update("Payment.deliveryEnd", param);
            }
           transactionManager_sample.commit(status);
           logger.info("========== 배달 완료 : {}", result);
                           
        }catch(Exception e){
           logger.error("[ERROR] statusDelvieryEnd() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     //픽업 대기 중
     public int statusPickUpWait( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{

           result = sqlSession.update("Payment.statusPickUpWait", param);
           if(result > 0) {
               result += sqlSession.update("Payment.pickUpWait", param);
            }
           transactionManager_sample.commit(status);
           logger.info("========== 픽업 대기 중 : {}", result);
                           
        }catch(Exception e){
           logger.error("[ERROR] statusPickUpWait() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     //픽업 완료
     public int statusPickUpEnd( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);
        int result = 0;
        try{
                          
           result = sqlSession.update("Payment.statusPickUpEnd", param);
           if(result > 0) {
               result += sqlSession.update("Payment.pickUpEnd", param);
            }
           transactionManager_sample.commit(status);
           logger.info("========== 픽업 완료 : {}", result);
                           
        }catch(Exception e){
           logger.error("[ERROR] statusPickUpEnd() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
            
    public List<AlarmDto> AlarmChk( Map<String,Object> param ) {
      return sqlSession.selectList("Payment.AlarmChk", param);
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
     
     
     
     
     
     
     /////////////////////////////////////////////////////알림
     
     public int memberGoAlarm( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           result += sqlSession.update("Payment.memberGoAlarm", param);
           transactionManager_sample.commit(status);
           logger.info("========== 회원 알림 추가 완료 : {}", result);
                
        }catch(Exception e){
           logger.error("[ERROR] memberGoAlarm() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     public int employeeGoAlarm( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           result += sqlSession.update("Payment.employeeGoAlarm", param);
           transactionManager_sample.commit(status);
           logger.info("========== 회원 알림 추가 완료 : {}", result);
                
        }catch(Exception e){
           logger.error("[ERROR] employeeGoAlarm() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     public int deliveryGoAlarm( Map<String,Object> param ) {
        //트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           result += sqlSession.update("Payment.deliveryGoAlarm", param);
           transactionManager_sample.commit(status);
           logger.info("========== 회원 알림 추가 완료 : {}", result);
                
        }catch(Exception e){
           logger.error("[ERROR] deliveryGoAlarm() Fail : e : {}", e.getMessage());
           e.printStackTrace();
           transactionManager_sample.rollback(status);       
        }
        return result;
     }
     
     
}