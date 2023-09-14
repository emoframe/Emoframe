import {
  useState,
  forwardRef,
  MutableRefObject,
  useEffect,
  ComponentProps,
  ChangeEvent
} from "react";

import { MaskedFunctionOptions } from "imask";
import { useIMask } from "react-imask";
import { Input } from "@/components/ui/input";

export type MaskedInputProps = {
  maskOptions: MaskedFunctionOptions
} & ComponentProps<typeof Input>;

export const InputMask = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ maskOptions, onChange, ...props }, ref) => {

    const [opts, setOpts] = useState<MaskedFunctionOptions>(maskOptions);
    const { ref: IMaskInput } = useIMask(opts, {
      onAccept(value, maskRef, event?) {
        if (!event) return;

        onChange?.((event as unknown) as ChangeEvent<HTMLInputElement>);
      }
    });
    const inputMaskRef = IMaskInput as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
      setOpts(maskOptions);
    }, [maskOptions]);

    function handleRefs(instance: HTMLInputElement | null) {
      if (ref) {
        if (typeof ref === "function") {
          ref(instance);
        } else {
          ref.current = instance;
        }
      }

      if (instance) {
        inputMaskRef.current = instance;
      }
    }

    return <Input ref={handleRefs} {...props} />;
  }
);
