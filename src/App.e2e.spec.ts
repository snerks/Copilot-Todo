import { test, expect } from "@playwright/test";

test.describe("Todo List E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /todo list/i })
    ).toBeVisible();
  });

  test("can add a todo", async ({ page }) => {
    await page.getByLabel("Add a new todo").fill("Test Todo");
    await page.getByRole("button", { name: /add/i }).click();
    await expect(page.getByText("Test Todo")).toBeVisible();
  });

  test("can complete a todo", async ({ page }) => {
    await page.getByLabel("Add a new todo").fill("Complete Me");
    await page.getByRole("button", { name: /add/i }).click();
    await page.getByRole("checkbox").check();
    // Check for line-through style on the todo text
    const todoText = page.getByTestId("todo-text");
    await expect(todoText).toHaveCSS("text-decoration-line", "line-through");
  });

  test("can remove a todo", async ({ page }) => {
    await page.getByLabel("Add a new todo").fill("Remove Me");
    await page.getByRole("button", { name: /add/i }).click();
    await page.getByLabel("delete").click();
    await expect(page.getByText("Remove Me")).not.toBeVisible();
  });
});
