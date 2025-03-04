import { Placeholder, SecretKey } from "@wrtnlabs/decorators";
import { tags } from "typia";

export interface IBbsArticle {
  id: string & tags.Format<"uuid">;
  writer: string;
  title: string;
  body: string;
  created_at: string & tags.Format<"date-time">;
}
export namespace IBbsArticle {
  export interface ICreate {
    title: string & Placeholder<"Write title of the article">;
    body: string & Placeholder<"Write content body of the article">;
    secretKey: string & SecretKey<"bbs", ["write"]>;
  }
  export interface ISummary {
    id: string & tags.Format<"uuid">;
    writer: string;
    title: string;
    created_at: string & tags.Format<"date-time">;
  }
}
