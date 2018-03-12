
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiN2QxOGI4ZjYtNTBjNy00ZGZiLTkyNTgtMDM4ODI4ODg0MjBlIiwiaWF0IjoxNTIwODQ0NDYzLCJuYmYiOjE1MjA4NDQ0NjMsImV4cCI6MTUyMDkzMDg2MywiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0._ZC-s3dbK0xYxYiDHXUOUJoUd-O_8rHGL9bWPUCZGTo";


//token = $.cookie('Abp.AuthToken');

if (!token) { //如果cookies不存在
    window.location.href = "http://120.76.241.72:8060";
}
   
var apiUrl = "http://120.76.241.72:8092/api/services/app";
var imgUrl = "http://120.76.241.72/keqpdf/";

