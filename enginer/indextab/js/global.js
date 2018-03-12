var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiMDdjNWEwNjEtZmMwYi00NzMwLTg0ZmUtNmU0NTlkMWM4YWYwIiwiaWF0IjoxNTA4NTUwODA4LCJuYmYiOjE1MDg1NTA4MDgsImV4cCI6MTUwODYzNzIwOCwiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0.Z7W7s1ti1JX76JLfB764DCbEVN4jmJX1o39k_4nq7_k";
    //token = $.cookie('Abp.AuthToken');

if (!token) { //如果cookies不存在
    window.location.href = "http://120.76.241.72:8092";
}
 
var apiUrl = "http://120.76.241.72:8092/api/services/app";
var serverUrl = "http://120.76.241.72:8070/app/main";
var imgUrl = "http://120.76.241.72/keqpdf/";

