terraform {
  backend "s3" {
    bucket         = "tfstate-lambda-auth"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    
    depends_on = [aws_s3_bucket]
  }
}
