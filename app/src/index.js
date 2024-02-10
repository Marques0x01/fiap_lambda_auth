exports.handler = async (event) => {
  console.log('Lambda function executed successfully!');
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};