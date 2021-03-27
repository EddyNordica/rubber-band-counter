import type { Writable } from 'svelte/store';

export const FormFieldContextKey = 'form-field';

export type FormFieldContext = Writable<string | undefined>;
