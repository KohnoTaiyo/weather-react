import { getForecastWeather } from "./fetchers";

describe("getForecastWeather", () => {
  test("success", async () => {
    const res = await getForecastWeather("London", 3);
    expect(res).not.toBeNull();
    expect(res).toHaveProperty("location");
  });

  test("reject", async () => {
    await expect(getForecastWeather("undefined", 3)).rejects.toThrowError(
      new Error("The entered place name does not exist."),
    );
  });
});
