# Variables for QuantumVest Enterprise Platform Infrastructure

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be development, staging, or production."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "domain_names" {
  description = "Domain names for the application"
  type        = list(string)
  default     = []
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate from AWS Certificate Manager"
  type        = string
}

# ECS Configuration
variable "app_cpu" {
  description = "CPU units for the application container"
  type        = number
  default     = 1024
}

variable "app_memory" {
  description = "Memory for the application container"
  type        = number
  default     = 2048
}

variable "app_count" {
  description = "Number of ECS tasks to run"
  type        = number
  default     = 2
}

variable "min_capacity" {
  description = "Minimum number of ECS tasks"
  type        = number
  default     = 2
}

variable "max_capacity" {
  description = "Maximum number of ECS tasks"
  type        = number
  default     = 10
}

# Database Configuration
variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.medium"
}

variable "db_allocated_storage" {
  description = "Allocated storage for RDS instance"
  type        = number
  default     = 100
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "quantumvest"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "quantumvest"
}

variable "db_backup_retention_period" {
  description = "Backup retention period in days"
  type        = number
  default     = 7
}

# Redis Configuration
variable "redis_node_type" {
  description = "ElastiCache Redis node type"
  type        = string
  default     = "cache.t3.micro"
}

variable "redis_num_cache_clusters" {
  description = "Number of cache clusters"
  type        = number
  default     = 2
}

# CloudFront Configuration
variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.cloudfront_price_class)
    error_message = "CloudFront price class must be PriceClass_All, PriceClass_200, or PriceClass_100."
  }
}

# Monitoring Configuration
variable "log_retention_in_days" {
  description = "CloudWatch log retention period in days"
  type        = number
  default     = 14
}

# Tags
variable "additional_tags" {
  description = "Additional tags to apply to resources"
  type        = map(string)
  default     = {}
}
