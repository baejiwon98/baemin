package edu.example.dto;

public class StoreObjectDTO {

	private String storeNum;
	private String objectNum;
	private String storeName;
	private String objectName;
	private String reviewScore;
	private String deliveryStatus;
	private String pickupStatus;
	private String leastPrice;
	private String deliveryPrice;
	private String searchWord;
	private String objectImage;
	private String objectContent;
	private String objectPrice;


	public String toString() {
		return 	"storeNum="+storeNum
			+	"\n storeName="+storeName
			+	"\n objectNum="+objectNum
			+	"\n objectName="+objectName
			+	"\n reviewScore="+reviewScore
			+	"\n deliveryStatus="+deliveryStatus
			+	"\n pickupStatus="+pickupStatus
			+	"\n leastPrice="+leastPrice
			+	"\n deliveryPrice="+deliveryPrice
			+	"\n searchWord="+searchWord
			+	"\n objectImage="+objectImage
			+	"\n objectContent="+objectContent
		+	"\n objectPrice="+objectPrice
		;
	}

	public String getObjectImage() {
		return objectImage;
	}

	public void setObjectImage(String objectImage) {
		this.objectImage = objectImage;
	}

	public String getObjectContent() {
		return objectContent;
	}

	public void setObjectContent(String objectContent) {
		this.objectContent = objectContent;
	}

	public String getObjectPrice() {
		return objectPrice;
	}

	public void setObjectPrice(String objectPrice) {
		this.objectPrice = objectPrice;
	}

	public String getLeastPrice() {
		return leastPrice;
	}



	public void setLeastPrice(String leastPrice) {
		this.leastPrice = leastPrice;
	}



	public String getDeliveryPrice() {
		return deliveryPrice;
	}



	public void setDeliveryPrice(String deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}



	public String getSearchWord() {
		return searchWord;
	}



	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}


	
	
	
	public String getDeliveryStatus() {
		return deliveryStatus;
	}



	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}



	public String getPickupStatus() {
		return pickupStatus;
	}



	public void setPickupStatus(String pickupStatus) {
		this.pickupStatus = pickupStatus;
	}



	public String getStoreNum() {
		return storeNum;
	}



	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}



	public String getObjectNum() {
		return objectNum;
	}



	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}



	public String getReviewScore() {
		return reviewScore;
	}



	public void setReviewScore(String reviewScore) {
		this.reviewScore = reviewScore;
	}



	public String getStoreName() {
		return storeName;
	}
	
	
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	
	
	public String getObjectName() {
		return objectName;
	}
	
	
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	
	
}
