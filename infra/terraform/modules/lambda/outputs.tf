output "function_name" {
  description = "Nome da Lambda"
  value       = aws_lambda_function.this.function_name
}

output "function_arn" {
  description = "ARN da Lambda"
  value       = aws_lambda_function.this.arn
}

output "invoke_arn" {
  description = "ARN de invocação da Lambda (usado por integrações de API Gateway)"
  value       = aws_lambda_function.this.invoke_arn
}