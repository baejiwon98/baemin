package edu.example.dto;

public class PaymentDto {
	
	private String orderNum;
	private String orderTime;
	private String paymentCategory;
	private String storeRequest;	
	private Integer orderTotalPrice;	
	private String memberNum;
	private String orderStatus;
	private String deliveryRequest;
	private String storeNum;
	private String objectNum;

	public String toString() {
		return 	"orderNum="+orderNum
			+	"\n orderTime="+orderTime
			+	"\n paymentCategory="+paymentCategory
			+	"\n storeRequest="+storeRequest
			+	"\n orderTotalPrice="+orderTotalPrice
			+	"\n memberNum="+memberNum
			+	"\n orderStatus="+orderStatus
			+	"\n deliveryRequest="+deliveryRequest
		+	"\n storeNum="+storeNum;
	}

	public String getObjectNum() {
		return objectNum;
	}

	
	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}
	
	
	public String getDeliveryRequest() {
		return deliveryRequest;
	}


	public void setDeliveryRequest(String deliveryRequest) {
		this.deliveryRequest = deliveryRequest;
	}


	public String getStoreNum() {
		return storeNum;
	}


	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}



	public String getOrderStatus() {
		return orderStatus;
	}


	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}


	public String getOrderNum() {
		return orderNum;
	}


	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}


	public String getOrderTime() {
		return orderTime;
	}


	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}


	public String getPaymentCategory() {
		return paymentCategory;
	}


	public void setPaymentCategory(String paymentCategory) {
		this.paymentCategory = paymentCategory;
	}


	public String getStoreRequest() {
		return storeRequest;
	}


	public void setStoreRequest(String storeRequest) {
		this.storeRequest = storeRequest;
	}


	public Integer getOrderTotalPrice() {
		return orderTotalPrice;
	}


	public void setOrderTotalPrice(Integer orderTotalPrice) {
		this.orderTotalPrice = orderTotalPrice;
	}


	public String getMemberNum() {
		return memberNum;
	}


	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}


	

	
}
