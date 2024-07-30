import { ReactNode } from 'react';
import { FormProvider as RHFFormProvider, UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';

interface FormProviderProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
}

export default function FormProvider<T extends FieldValues>({ children, onSubmit, methods }: FormProviderProps<T>) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFFormProvider>
  );
}
