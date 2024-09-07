export type Result<Error, Value> = Err<Error> | Ok<Value>;

export type Err<Error> = {
  type: "err";
  error: Error;
};

export type Ok<Value> = {
  type: "ok";
  value: Value;
};

export const Ok = <Value>(value: Value): Ok<Value> => ({
  type: "ok",
  value,
});

export const Err = <Error>(error: Error): Err<Error> => ({
  type: "err",
  error,
});

export const isErr = <Error, Value>(
  result: Result<Error, Value>,
): result is Err<Error> => result.type === "err";

export const isOk = <Error, Value>(
  result: Result<Error, Value>,
): result is Ok<Value> => result.type === "ok";

export const unwrap = <Error, Value>(result: Result<Error, Value>): Value => {
  if (isErr(result)) {
    throw new Error("tried to unwrap an Err");
  }
  return result.value;
};
