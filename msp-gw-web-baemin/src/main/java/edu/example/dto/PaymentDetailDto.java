package edu.example.dto;

public class PaymentDetailDto {
	
	private String orderNum;
	private String orderTime;
	private String paymentCategory;
	private String storeRequest;	
	private Integer orderTotalPrice;	
	private String orderStatus;
	private String memberNum;
	private String memberAddr;
	private String memberPhone;
	private String deliveryRequest;
	private String objectNum;
	private String objectName;
	private String objectPrice;
	private String storeName; 
	private String storeAddr; 
	private String storePhone; 
	private Integer deliveryPrice;
	private String storeNum;
	
	
	public String toString() {
		return 	"orderNum="+orderNum
			+	"\n orderTime="+orderTime
			+	"\n paymentCategory="+paymentCategory
			+	"\n storeRequest="+storeRequest
			+	"\n orderTotalPrice="+orderTotalPrice
			+	"\n orderStatus="+orderStatus
			+	"\n memberNum="+memberNum
			+	"\n memberAddr="+memberAddr
			+	"\n memberPhone="+memberPhone
			+	"\n deliveryRequest="+deliveryRequest
			+	"\n objectNum="+objectNum
			+	"\n objectName="+objectName
			+	"\n objectPrice="+objectPrice
			+	"\n storeName="+storeName
			+	"\n storeAddr="+storeAddr
			+	"\n storePhone="+storePhone
			+	"\n deliveryPrice="+deliveryPrice;
	}


	public String getStoreNum() {
		return storeNum;
	}


	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	

	public String getObjectPrice() {
		return objectPrice;
	}


	public void setObjectPrice(String objectPrice) {
		this.objectPrice = objectPrice;
	}


	public String getOrderNum() {
		return orderNum;
	}


	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}


	public String getPaymentCategory() {
		return paymentCategory;
	}


	public void setPaymentCategory(String paymentCategory) {
		this.paymentCategory = paymentCategory;
	}


	public String getOrderTime() {
		return orderTime;
	}


	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
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


	public String getOrderStatus() {
		return orderStatus;
	}


	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}


	public String getMemberNum() {
		return memberNum;
	}


	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}


	public String getMemberAddr() {
		return memberAddr;
	}


	public void setMemberAddr(String memberAddr) {
		this.memberAddr = memberAddr;
	}


	public String getMemberPhone() {
		return memberPhone;
	}


	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
	}


	public String getDeliveryRequest() {
		return deliveryRequest;
	}


	public void setDeliveryRequest(String deliveryRequest) {
		this.deliveryRequest = deliveryRequest;
	}

	public String getObjectNum() {
		return objectNum;
	}


	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}


	public String getObjectName() {
		return objectName;
	}


	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}


	public String getStoreName() {
		return storeName;
	}


	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}


	public String getStoreAddr() {
		return storeAddr;
	}


	public void setStoreAddr(String storeAddr) {
		this.storeAddr = storeAddr;
	}


	public String getStorePhone() {
		return storePhone;
	}


	public void setStorePhone(String storePhone) {
		this.storePhone = storePhone;
	}


	public Integer getDeliveryPrice() {
		return deliveryPrice;
	}


	public void setDeliveryPrice(Integer deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}
	
	
	
	
}	
