import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import {
  ExperimentalRoute,
  Placeholder,
  RouteIcon,
  SecretKey,
  SelectBenchmark,
} from "@wrtnlabs/decorators";
import typia, { tags } from "typia";

import { IBbsArticle } from "./IBbsArticle";

@Controller("bbs/articles")
export class BbsArticleController {
  @ExperimentalRoute()
  @TypedRoute.Patch("details")
  public async details(): Promise<IBbsArticle[]> {
    return typia.random<IBbsArticle[]>();
  }

  @SelectBenchmark("List up articles")
  @TypedRoute.Patch()
  public async index(): Promise<IBbsArticle.ISummary[]> {
    return typia.random<IBbsArticle.ISummary[]>();
  }

  @TypedRoute.Get(":id")
  public async at(
    @TypedParam("id") id: string & tags.Format<"uuid">,
  ): Promise<IBbsArticle> {
    id;
    return typia.random<IBbsArticle>();
  }

  @SelectBenchmark(["I wanna create an article", "Write an article"])
  @RouteIcon("https://example.com/write.icon.png")
  @TypedRoute.Post()
  public async create(
    @TypedBody() input: IBbsArticle.ICreate,
  ): Promise<IBbsArticle> {
    input;
    return typia.random<IBbsArticle>();
  }
}
