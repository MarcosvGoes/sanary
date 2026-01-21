/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useZodForm<TSchema extends z.ZodType<any, any>>(
  schema: TSchema,
  options?: any
): any {
  return useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onBlur",
    ...options,
  });
}
