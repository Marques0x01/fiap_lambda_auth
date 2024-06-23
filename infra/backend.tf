terraform {
  backend "s3" {
    bucket         = "fiap-backend"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
