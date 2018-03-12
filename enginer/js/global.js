//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkNGJhYWE2ZS0xZTMxLTc0YzQtMWE5MC0zOWUxNDg0NDJhODciLCJyb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwianRpIjoiZDIzYTBjYzItMmE1Yy00MjBkLTlmYjgtMWEwZmZjNWE5OGZhIiwiaWF0IjoxNTA4NDg0OTEwLCJuYmYiOjE1MDg0ODQ5MTAsImV4cCI6MTUwODU3MTMxMCwiaXNzIjoiQlpIUHJvIiwiYXVkIjoiQlpIUHJvIn0.2Qv03Hoe0qUz2xl5pVI6hhy24DsxwWajrm-KQH5r_XE";
    var token = $.cookie('Abp.AuthToken');

if (!token) { //如果cookies不存在
    window.location.href = "http://120.76.241.72:8070";
}
 
var apiUrl = "http://120.76.241.72:8092/api/services/app";
var serverUrl = "http://120.76.241.72:8070/app/main";

