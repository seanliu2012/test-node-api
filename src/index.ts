import { app } from "./app";

const port = 8080 || process.env.PORT;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
