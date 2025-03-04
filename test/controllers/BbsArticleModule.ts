import { Module } from "@nestjs/common";

import { BbsArticleController } from "./BbsArticleController";

@Module({ controllers: [BbsArticleController] })
export class BbsArticleModule {}
