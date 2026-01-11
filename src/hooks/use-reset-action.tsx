import { useActionState, useCallback, useTransition } from "react";

export function useResettableActionState<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string
): [
  state: Awaited<State>,
  dispatch: (payload: Payload) => void,
  isPending: boolean,
  reset: () => void,
] {
  const [isPending, startTransition] = useTransition();

  const [state, submit, isActionPending] = useActionState(
    async (state: Awaited<State>, payload: Payload | null) => {
      if (payload === null) {
        return initialState;
      }

      try {
        const data = await action(state, payload);
        return data;
      } catch (error) {
        console.log("Action error:", error);
        return state;
      }
    },
    initialState,
    permalink
  );

  const dispatch = useCallback(
    (payload: Payload) => {
      startTransition(() => {
        submit(payload);
      });
    },
    [submit]
  );

  const reset = useCallback(() => {
    startTransition(() => {
      submit(null);
    });
  }, [submit]);

  const combinedPending = isPending || isActionPending;

  return [state, dispatch, combinedPending, reset];
}
