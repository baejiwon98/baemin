package edu.example.dto;

public class OrderViewDto {
	private String orderNum;
	private String orderTime;
	private String orderStatus;
	private String objectNum;
	private String objectName;
	private String objectImg;
	private String storeName;
	private Integer buyQty;
	private String storeNum;
	private String memberNum;
	private String deliveryNum;




	public String toString() {
		return 	"orderNum="+orderNum
			+	"\n orderTime="+orderTime
			+	"\n orderStatus="+orderStatus
			+	"\n objectNum="+objectNum
			+	"\n objectName="+objectName
			+	"\n objectImg="+objectImg
			+	"\n storeName="+storeName
			+	"\n buyQty="+buyQty
			+	"\n storeNum="+storeNum
			+	"\n memberNum="+memberNum 
			+	"\n deliveryNum="+deliveryNum
		;
	}



	
	public String getDeliveryNum() {
		return deliveryNum;
	}




	public void setDeliveryNum(String deliveryNum) {
		this.deliveryNum = deliveryNum;
	}




	public String getMemberNum() {
		return memberNum;
	}


	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
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




	public String getOrderStatus() {
		return orderStatus;
	}




	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
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




	public String getObjectImg() {
		return objectImg;
	}




	public void setObjectImg(String objectImg) {
		this.objectImg = objectImg;
	}




	public String getStoreName() {
		return storeName;
	}




	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}




	public Integer getBuyQty() {
		return buyQty;
	}




	public void setBuyQty(Integer buyQty) {
		this.buyQty = buyQty;
	}




	public String getStoreNum() {
		return storeNum;
	}




	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
}
