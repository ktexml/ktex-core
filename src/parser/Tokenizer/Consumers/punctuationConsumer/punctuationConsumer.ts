import type { ConsumerFunction } from "..";
import { dashConsumer } from "./dashConsumer";
import { ellipsisConsumer } from "./ellipsisConsumer";
import { escapedBracketConsumer } from "./escapedBracketConsumer";
import { periodConsumer } from "./periodConsumer";
import { punctuationCharConsumer } from "./punctuationCharConsumer";

const punctuationConsumers = [
  punctuationCharConsumer,
  ellipsisConsumer,
  periodConsumer,
  dashConsumer,
  escapedBracketConsumer,
];

export const punctuationConsumer: ConsumerFunction = (input) => {
  if (!input.ctx.isOperator) {
    for (const consumer of punctuationConsumers) {
      const token = consumer(input);

      if (token !== null) {
        return token;
      }
    }
  }

  return null;
};
