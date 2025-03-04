import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import "@wrtnlabs/schema";
import typia from "typia";

export const test_secret_key = (document: OpenApi.IDocument): void => {
  const object: OpenApi.IJsonSchema.IObject =
    typia.assert<OpenApi.IJsonSchema.IObject>(
      document.components.schemas?.["IBbsArticle.ICreate"],
    );
  const string: OpenApi.IJsonSchema.IString =
    typia.assert<OpenApi.IJsonSchema.IString>(object.properties?.secretKey);
  TestValidator.equals("SecretKey<Key>")(string["x-wrtn-secret-key"])("bbs");
};
