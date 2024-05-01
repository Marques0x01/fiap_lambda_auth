terraform {
  backend "s3" {
    bucket         = "fiap-tfstates"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
