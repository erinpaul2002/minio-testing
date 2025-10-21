import express, { Request, Response } from 'express';
import * as Minio from 'minio';

const app = express();
const port = `${process.env.PORT || 5000}`;

app.use(express.json());

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_PRIVATE_HOST || 'localhost',
  port: parseInt(process.env.MINIO_PRIVATE_PORT || '9000'),
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
});

app.get('/buckets', async (req: Request, res: Response) => {
  try {
    const buckets = await minioClient.listBuckets();
    res.json(buckets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching buckets' });
  }
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
