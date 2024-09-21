export type Result<Error, Value> = Err<Error> | Ok<Value>;

export type Err<Error> = {
  t: "err";
  error: Error;
};

export type Ok<Value> = {
  t: "ok";
  value: Value;
};

export const Ok = <Value>(value: Value): Ok<Value> => ({
  t: "ok",
  value,
});

export const Err = <Error>(error: Error): Err<Error> => ({
  t: "err",
  error,
});

export const isErr = <Error, Value>(
  result: Result<Error, Value>,
): result is Err<Error> => result.t === "err";

export const isOk = <Error, Value>(
  result: Result<Error, Value>,
): result is Ok<Value> => result.t === "ok";

export const unwrap = <Error, Value>(result: Result<Error, Value>): Value => {
  if (isErr(result)) {
    throw new Error("Tried to unwrap an Err");
  }
  return result.value;
};

export const unknownToErr = (unknown: unknown): Err<string> => {
  return Err(String(unknown));
};

export const withDefault = <Error, Value>(
  result: Result<Error, Value>,
  defaultValue: Value,
): Value => {
  switch (result.t) {
    case "err": {
      return defaultValue;
    }
    case "ok": {
      return result.value;
    }
  }
};

export const mapOk = async <Error, Value, NewValue>(
  result: Result<Error, Value>,
  f: (value: Value) => NewValue,
): Promise<Result<Error, NewValue>> => {
  switch (result.t) {
    case "err": {
      return result;
    }
    case "ok": {
      return Ok(f(result.value));
    }
  }
};

export const mapErr = async <Error, Value, NewError>(
  result: Result<Error, Value>,
  f: (error: Error) => NewError,
): Promise<Result<NewError, Value>> => {
  switch (result.t) {
    case "err": {
      return Err(f(result.error));
    }
    case "ok": {
      return result;
    }
  }
};

export const Result = {
  unwrap,
  isErr,
  isOk,
  withDefault,
  mapOk,
  mapErr,
};
