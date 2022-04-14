package edu.example.dto;

public class ObjectDto {
	
	private String objectNum;
	private String objectImage;
	private String objectName;
	private String objectContent;
	private int objectPrice;
	private int objectQty;
	private String objectOrigin;
	private String storeNum;
	private String menuCategoryNum;
	
	public String toString() {
		return 	"objectNum="+objectNum
			+	"\n objectImage="+objectImage
			+	"\n objectName="+objectName
			+	"\n objectContent="+objectContent
			+	"\n objectPrice="+objectPrice
			+	"\n objectQty="+objectQty
			+	"\n objectOrigin="+objectOrigin
			+	"\n storeNum="+storeNum
			+	"\n menuCategoryNum="+menuCategoryNum;
	}

	public String getObjectNum() {
		return objectNum;
	}



	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}



	public String getObjectImage() {
		return objectImage;
	}



	public void setObjectImage(String objectImage) {
		this.objectImage = objectImage;
	}



	public String getObjectName() {
		return objectName;
	}



	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}



	public String getObjectContent() {
		return objectContent;
	}



	public void setObjectContent(String objectContent) {
		this.objectContent = objectContent;
	}



	public int getObjectPrice() {
		return objectPrice;
	}



	public void setObjectPrice(int objectPrice) {
		this.objectPrice = objectPrice;
	}



	public int getObjectQty() {
		return objectQty;
	}



	public void setObjectQty(int objectQty) {
		this.objectQty = objectQty;
	}



	public String getObjectOrigin() {
		return objectOrigin;
	}



	public void setObjectOrigin(String objectOrigin) {
		this.objectOrigin = objectOrigin;
	}



	public String getStoreNum() {
		return storeNum;
	}



	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}



	public String getMenuCategoryNum() {
		return menuCategoryNum;
	}



	public void setMenuCategoryNum(String menuCategoryNum) {
		this.menuCategoryNum = menuCategoryNum;
	}
	
}
