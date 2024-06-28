terraform {
  backend "s3" {
    bucket         = "backend-fiap-pos"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
