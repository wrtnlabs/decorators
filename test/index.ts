import { DynamicExecutor } from "@nestia/e2e";
import { NestiaSwaggerComposer } from "@nestia/sdk";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { OpenApi } from "@samchon/openapi";
import "@wrtnlabs/schema";
import chalk from "chalk";

import { TestGlobal } from "./TestGlobal";
import { BbsArticleModule } from "./controllers/BbsArticleModule";

const main = async () => {
  // MOUNT SWAGGER DOCUMENT
  const app: INestApplication = await NestFactory.create(BbsArticleModule, {
    logger: false,
  });
  const document: OpenApi.IDocument = OpenApi.convert(
    await NestiaSwaggerComposer.document(app, {}),
  );

  // DO TEST
  const include: string[] = TestGlobal.getArguments("include");
  const exclude: string[] = TestGlobal.getArguments("exclude");
  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    prefix: "test_",
    location: __dirname + "/features",
    extension: __filename.substring(__filename.length - 2),
    parameters: () => [document],
    onComplete: (exec) => {
      const trace = (str: string) =>
        console.log(`  - ${chalk.green(exec.name)}: ${str}`);
      if (exec.value === false) trace(chalk.gray("Pass"));
      else if (exec.error === null) {
        const elapsed: number =
          new Date(exec.completed_at).getTime() -
          new Date(exec.started_at).getTime();
        trace(`${chalk.yellow(elapsed.toLocaleString())} ms`);
      } else trace(chalk.red(exec.error.name));
    },
    filter: (name) =>
      (include.length ? include.some((str) => name.includes(str)) : true) &&
      (exclude.length ? exclude.every((str) => !name.includes(str)) : true),
  });

  // REPORT EXCEPTIONS
  const exceptions: Error[] = report.executions
    .filter((exec) => exec.error !== null)
    .map((exec) => exec.error!);
  if (exceptions.length === 0) {
    console.log("Success");
    console.log("Elapsed time", report.time.toLocaleString(), `ms`);
  } else {
    for (const exp of exceptions) console.log(exp);
    console.log("Failed");
    console.log("Elapsed time", report.time.toLocaleString(), `ms`);
  }
  await app.close();
  if (exceptions.length) process.exit(-1);
};
main();
