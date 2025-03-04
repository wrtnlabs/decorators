import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import "@wrtnlabs/schema";
import typia from "typia";

export const test_placeholder = (document: OpenApi.IDocument): void => {
  const schema: OpenApi.IJsonSchema.IObject =
    typia.assert<OpenApi.IJsonSchema.IObject>(
      document.components.schemas?.["IBbsArticle.ICreate"],
    );
  TestValidator.equals("Placeholder")(
    schema.properties?.title?.["x-wrtn-placeholder"],
  )("Write title of the article");
};
