import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };
  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    deepFreeze(state);

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  describe("are all the buttons performing their function", () => {
    const state = initialState;
    deepFreeze(state);
    test("good is incremented", () => {
      const action = {
        type: "GOOD",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        ...newState,
        good: 1,
      });
    });

    test("bad is incremented", () => {
      const action = {
        type: "BAD",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        ...newState,
        bad: 1,
      });
    });

    test("ok is incremented", () => {
      const action = {
        type: "OK",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        ...newState,
        ok: 1,
      });
    });

    test("value resets", () => {
      const action = {
        type: "ZERO",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 0,
      });
    });
  });
});
