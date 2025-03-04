import { SwaggerCustomizer } from "@nestia/core";
import "@wrtnlabs/schema";
import typia, { tags } from "typia";

export function RouteIcon(url: string & tags.Format<"uri">): MethodDecorator {
  typia.assert(url);
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    return SwaggerCustomizer((props) => {
      props.route["x-wrtn-icon"] = url;
    })(target, key, descriptor);
  };
}
