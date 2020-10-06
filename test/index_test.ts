import { assertEquals } from "../deps.ts";
import { example } from "../src/index.ts";

Deno.test({
  name: "example test",
  fn(): void {
    // Arrange
    const expectedResult = 42;
    // Act
    const result = example();
    // Assert
    assertEquals(result, expectedResult);
  },
});
