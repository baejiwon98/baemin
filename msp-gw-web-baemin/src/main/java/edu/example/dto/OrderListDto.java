package edu.example.dto;

public class OrderListDto {
   
   private String objectNum;
   private String memberNum;
   private Integer buyQty;
   private String status;
   
   public String toString() {
      return    "objectNum="+objectNum
         +   "\n memberNum="+memberNum
         +   "\n buyQty="+buyQty
      +   "\n status="+status;
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
   }

   public String getObjectNum() {
      return objectNum;
   }

   public void setObjectNum(String objectNum) {
      this.objectNum = objectNum;
   }

   public String getMemberNum() {
      return memberNum;
   }

   public void setMemberNum(String memberNum) {
      this.memberNum = memberNum;
   }

   public Integer getBuyQty() {
      return buyQty;
   }

   public void setBuyQty(Integer buyQty) {
      this.buyQty = buyQty;
   }


}