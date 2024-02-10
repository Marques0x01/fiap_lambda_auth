resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_backend_name
  acl    = "private"  # ou outra política de acesso
}