import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import "@wrtnlabs/schema";

export const test_route_icon = (document: OpenApi.IDocument): void => {
  TestValidator.equals("@RouteIcon()")(
    document.paths?.["/bbs/articles"]?.post?.["x-wrtn-icon"],
  )("https://example.com/write.icon.png");
};
