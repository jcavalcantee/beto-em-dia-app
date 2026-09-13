variable "function_name" {
  description = "Nome da função Lambda"
  type        = string
}

variable "source_path" {
  description = "Caminho do código compilado da Lambda"
  type        = string
}

variable "dynamodb_table_arn" {
  description = "ARN da tabela DynamoDB que a Lambda poderá acessar"
  type        = string
}

variable "environment_variables" {
  description = "Variáveis de ambiente da Lambda"
  type        = map(string)
  default     = {}
}