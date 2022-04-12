export const apiGatewaySlackHook = async function apiGatewaySlackHook(event) {
  const { body } = event;

  const data = new URLSearchParams(body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response_type: 'ephemeral',
      text: data.get('text'),
    }),
  };
};

export default apiGatewaySlackHook;
