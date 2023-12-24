import type { ConsumerFunction } from ".";
import { bomConsumer } from "./bomConsumer";
import { booleanConsumer } from "./booleanConsumer";
import { commentConsumer } from "./commentConsumer";
import { errorCosumer } from "./errorConsumer";
import { lineTerminatorConsumer } from "./lineTerminatorConsumer";
import { nameConsumer } from "./nameConsumer";
import { nullConsumer } from "./nullConsumer";
import { numberConsumer } from "./numberConsumer";
import { operatorNameConsumer } from "./operatorNameConsumer";
import { punctuationConsumer } from "./punctuationConsumer";
import { punctuatorConsumer } from "./punctuatorConsumer";
import { stringConsumer } from "./stringConsumer";
import { whiteSpaceConsumer } from "./whiteSpaceConsumer";
import { wordConsumer } from "./wordConsumer";

/**
 * All token consumers.
 */
export const allConsumers: ConsumerFunction[] = [
  bomConsumer,
  commentConsumer,
  whiteSpaceConsumer,
  lineTerminatorConsumer,
  punctuatorConsumer,
  operatorNameConsumer,
  punctuationConsumer,
  wordConsumer,
  nameConsumer,
  numberConsumer,
  stringConsumer,
  booleanConsumer,
  nullConsumer,
  errorCosumer,
];
