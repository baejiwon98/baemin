package edu.example.dto;

public class AlarmDto {
   
   private String orderNum;
   private Integer memAlarm;
   private Integer empAlarm;
   private Integer deliveryAlarm;
   
   public String toString() {
      return    "orderNum="+orderNum
         +   "\n memAlarm="+memAlarm
         +   "\n empAlarm="+empAlarm
      +   "\n deliveryAlarm="+deliveryAlarm;
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