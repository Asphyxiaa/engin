
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMSIsIm5hbWUiOiJseGoiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImE0Y2Q5MWMyLWQxNTAtNGIzMy05ZTJiLTFkYTQ1NmUyY2QxZiIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsImp0aSI6IjhlYjM0NzQ5LWU1MzYtNGIzMC05ZjFhLWUzNTI4ZjlhNjBkOSIsImlhdCI6MTUxMDgxNzMwNSwibmJmIjoxNTEwODE3MzA1LCJleHAiOjE1MTA5MDM3MDUsImlzcyI6IkJaSFBybyIsImF1ZCI6IkJaSFBybyJ9.4CEXUEM_D1zNc66whTQQuMDBlKRfUh4gWmec1nWYfFg";

//token = $.cookie('Abp.AuthToken');

if (!token) { //如果cookies不存在
    window.location.href = "http://120.76.241.72:8060";
}
   
var apiUrl = "http://120.76.241.72:8091/api/services/app";
//var imgUrl = "http://120.76.241.72/keqpdf/";
