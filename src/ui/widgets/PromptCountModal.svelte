<script lang="ts">
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { counter, isValidCount } from '../../db/counter';
  import Form from '../components/Form.svelte';
  import FormField from '../components/FormField.svelte';
  import Input from '../components/Input.svelte';
  import Modal from '../components/Modal.svelte';

  const fieldNames = {
    counter: 'counter',
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      counter: `${$counter}`,
    },
    validationSchema: yup.object().shape({
      counter: isValidCount(),
    }),
    onSubmit: (values) => {
      counter.set(parseInt(values.counter));

      onClose();
    },
  });

  export let restoreFocusId: string;
  export let onClose: () => void;
</script>

<Modal
  title="手動入力"
  {restoreFocusId}
  {onClose}
  focusedId={fieldNames.counter}
  isBlocking
>
  <Form onSubmit={handleSubmit}>
    <FormField
      labelFor={fieldNames.counter}
      label={['カウンター数']}
      error={$errors.counter}
    >
      <Input
        testId={TestAutomationId.CounterAmountInput}
        id={fieldNames.counter}
        name={fieldNames.counter}
        bind:value={$form.counter}
        on:change={handleChange}
      />
    </FormField>
  </Form>
</Modal>
