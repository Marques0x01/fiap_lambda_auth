resource "aws_lambda_function" "lambda" {
  filename      = "lambda.zip" # Nome do arquivo zip contendo seu código Node.js
  function_name = var.lambda_name
  role          = aws_iam_role.lambda_role.arn
  handler       = "app/src/index.handler"
  runtime       = "nodejs14.x"

  environment {
    variables = {
      foo = "bar"
    }
  }

  depends_on = [aws_iam_role.lambda_role]
}
