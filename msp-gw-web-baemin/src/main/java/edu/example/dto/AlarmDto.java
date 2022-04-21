package edu.example.dto;

public class AlarmDto {
   
   private String orderNum;
   private Integer memAlarm;
   private Integer empAlarm;
   private Integer deliveryAlarm;
   private Integer userNum;
   
   /**
 *
 */
public String toString() {
      return    "orderNum="+orderNum
         +   "\n memAlarm="+memAlarm
         +   "\n empAlarm="+empAlarm
      +   "\n deliveryAlarm="+deliveryAlarm
      +   "\n userNum="+userNum;
   }

   public Integer getUserNum() {
      return userNum;
   }
   
   public void setUserNum(Integer userNum) {
      this.userNum = userNum;
   }

   public String getOrderNum() {
      return orderNum;
   }
   
   public void setOrderNum(String orderNum) {
      this.orderNum = orderNum;
   }
   
   public Integer getMemAlarm() {
      return memAlarm;
   }
   
   public void setMemAlarm(Integer memAlarm) {
      this.memAlarm = memAlarm;
   }
   
   public Integer getEmpAlarm() {
      return empAlarm;
   }
   
   public void setEmpAlarm(Integer empAlarm) {
      this.empAlarm = empAlarm;
   }
   
   public Integer getDeliveryAlarm() {
      return deliveryAlarm;
   }
   
   public void setDeliveryAlarm(Integer deliveryAlarm) {
      this.deliveryAlarm = deliveryAlarm;
   }
   
   


}