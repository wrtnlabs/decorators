import { SwaggerCustomizer } from "@nestia/core";
import "@wrtnlabs/schema";

export function SelectBenchmark(keyword: string | string[]): MethodDecorator {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    return SwaggerCustomizer((props) => {
      props.route["x-wrtn-function-select-benchmarks"] ??= [];
      props.route["x-wrtn-function-select-benchmarks"].push(
        ...(Array.isArray(keyword) ? keyword : [keyword]),
      );
    })(target, key, descriptor);
  };
}
