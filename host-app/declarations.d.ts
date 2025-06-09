declare module "news/News" {
  import { FC } from "react";
  const News: FC;
  export default News;
}

declare module "weather/Weather" {
  import { FC } from "react";
  const Weather: FC;
  export default Weather;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
