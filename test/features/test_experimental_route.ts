import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import "@wrtnlabs/schema";

export const test_experimental_route = (document: OpenApi.IDocument): void => {
  TestValidator.equals("@ExperimentalRoute()")(
    document.paths?.["/bbs/articles/details"].patch?.["x-wrtn-experimental"],
  )(true);
};
