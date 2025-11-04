// src/hooks/useForm.ts
import { useEffect, useState } from "react";

type ErrorMap<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>(opts: {
  initialValues: T;
  validate?: (values: T) => ErrorMap<T>;
  onSubmit?: (values: T) => Promise<void> | void;
}) {
  const { initialValues, validate, onSubmit } = opts;
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ErrorMap<T>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const runValidate = (v: T) => {
    const e = validate ? validate(v) : {};
    setErrors(e || {});
    return e || {};
  };

  useEffect(() => {
    runValidate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eobj = runValidate(values);
    const hasError = Object.keys(eobj).length > 0;
    if (hasError) {
      const allTouched: Record<string, boolean> = {};
      Object.keys(values).forEach((k) => (allTouched[k] = true));
      setTouched(allTouched);
      return;
    }
    try {
      setSubmitting(true);
      await onSubmit?.(values);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = (next?: Partial<T>) =>
    setValues({ ...initialValues, ...(next || {}) });

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    submitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  };
}

export type UseFormReturn<T extends Record<string, any>> = ReturnType<
  typeof useForm<T>
>;
