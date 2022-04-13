package edu.example.dto;

public class StoreObjectDTO {
	
	String storeName;
	String objectName;
	
	@Override
	public String toString() {
		return "StoreObjectDTO [storeName=" + storeName + ", objectName=" + objectName + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
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
