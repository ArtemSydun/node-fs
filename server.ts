import app from "./src/app/index";

const PORT = 3005;

app.listen(PORT, (): void => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
