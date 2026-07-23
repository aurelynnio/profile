process.env.NODE_ENV = 'test';

const { app } = await import('../src/server.js');
const server = app.listen(0);

try {
  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error(
      'Unable to bind verification server.',
    );
  }
  const baseUrl = `http://127.0.0.1:${address.port}/api`;
  const [health, works, writing, detail] =
    await Promise.all([
      fetch(`${baseUrl}/health`),
      fetch(`${baseUrl}/content/works`),
      fetch(`${baseUrl}/content/writing`),
      fetch(
        `${baseUrl}/content/works/ecommerce-platform`,
      ),
    ]);

  if (
    ![health, works, writing, detail].every(
      (response) => response.ok,
    )
  ) {
    throw new Error(
      'One or more API verification requests failed.',
    );
  }
  const workItems =
    (await works.json()) as unknown[];
  const writingItems =
    (await writing.json()) as unknown[];
  console.log(
    `API verified: ${workItems.length} works, ${writingItems.length} articles, and one detail route.`,
  );
} finally {
  server.close();
}
