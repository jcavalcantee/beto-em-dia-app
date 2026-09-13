output "api_endpoint" {
  description = "URL base da HTTP API"
  value       = aws_apigatewayv2_stage.this.invoke_url
}
