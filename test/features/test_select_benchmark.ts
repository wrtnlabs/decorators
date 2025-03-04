import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import "@wrtnlabs/schema";

export const test_select_benchmark = (document: OpenApi.IDocument): void => {
  TestValidator.equals("@SelectBenchmark(string)")(
    document.paths?.["/bbs/articles"]?.patch?.[
      "x-wrtn-function-select-benchmarks"
    ],
  )(["List up articles"]);

  TestValidator.equals("@SelectBenchmark(string[])")(
    document.paths?.["/bbs/articles"]?.post?.[
      "x-wrtn-function-select-benchmarks"
    ],
  )(["I wanna create an article", "Write an article"]);
};
