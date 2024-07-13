terraform {
  backend "s3" {
    bucket         = "backend-projeto"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
