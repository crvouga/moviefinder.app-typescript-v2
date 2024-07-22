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