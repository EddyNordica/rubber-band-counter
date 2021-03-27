<script lang="ts">
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';
  import { IconName } from '../../app/consts/IconName';
  import { UITheme } from '../../app/consts/UITheme';
  import { counterName, counterUnit } from '../../app/stores/app';
  import { counterAmount } from '../../app/stores/counterAmount';
  import { uiTheme } from '../../app/stores/theming';
  import { isPositiveInteger } from '../../app/validations';
  import Button from '../components/Button.svelte';
  import ConfirmDialog from '../components/ConfirmDialog.svelte';
  import LinkButton from '../components/LinkButton.svelte';
  import Form from '../components/Form.svelte';
  import FormField from '../components/FormField.svelte';
  import Input from '../components/Input.svelte';
  import Modal from '../components/Modal.svelte';
  import Select from '../components/Select.svelte';

  const fieldNames = {
    counterName: 'counterName',
    counterUnit: 'counterUnit',
    counterAmount: 'counterAmount',
    uiTheme: 'uiTheme',
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      counterName: $counterName,
      counterUnit: $counterUnit,
      counterAmount: `${$counterAmount}`,
    },
    validationSchema: yup.object().shape({
      counterName: yup.string().required('必須項目です。'),
      counterUnit: yup.string(),
      counterAmount: isPositiveInteger(),
    }),
    onSubmit: (values) => {
      counterName.set(values.counterName);
      counterUnit.set(values.counterUnit);
      counterAmount.set(parseInt(values.counterAmount));

      onClose();
    },
  });

  const onThemeSelectionChanged = (e: Event): void =>
    uiTheme.set((e.target as HTMLOptionElement).value as UITheme);

  const ResetSettingsButtonId = 'reset-btn';
  let showResetConfirmDialog = false;

  const onResetButtonClicked = () => {
    showResetConfirmDialog = true;
  };

  export let restoreFocusId: string;
  export let onClose: () => void;
</script>

<style lang="scss">
  .reset-btn {
    font-size: 0.9rem;
    text-align: right;
  }
</style>

<Modal
  title="設定"
  {restoreFocusId}
  {onClose}
  isBlocking
  focusedId={fieldNames.counterName}
>
  <Form onSubmit={handleSubmit}>
    <FormField
      labelFor={fieldNames.counterName}
      label={['カウンター名', '（例：〇〇カウンター）']}
      error={$errors.counterName}
    >
      <Input
        id={fieldNames.counterName}
        name={fieldNames.counterName}
        bind:value={$form.counterName}
        on:change={handleChange}
      />
    </FormField>
    <FormField
      labelFor={fieldNames.counterUnit}
      label={['カウンターの単位']}
      error={$errors.counterUnit}
    >
      <Input
        id={fieldNames.counterUnit}
        name={fieldNames.counterUnit}
        bind:value={$form.counterUnit}
        on:change={handleChange}
      />
    </FormField>
    <FormField
      labelFor={fieldNames.counterAmount}
      label={['一度に増減させる数']}
      error={$errors.counterAmount}
    >
      <Input
        id={fieldNames.counterAmount}
        name={fieldNames.counterAmount}
        bind:value={$form.counterAmount}
        on:change={handleChange}
      />
    </FormField>
    <FormField labelFor={fieldNames.uiTheme} label={['背景色']}>
      <Select
        id={fieldNames.uiTheme}
        value={$uiTheme}
        on:change={onThemeSelectionChanged}
        options={[
          { value: UITheme.Light, label: '明るい' },
          { value: UITheme.Dark, label: '暗い' },
          { value: UITheme.Default, label: 'システムの既定値' },
        ]}
      />
    </FormField>

    <div class="reset-btn">
      <LinkButton
        id={ResetSettingsButtonId}
        text="設定を初期化する"
        icon={IconName.Trash}
        on:click={onResetButtonClicked}
      />
    </div>

    <Button type="submit" slot="form-footer" fluid primary text="保存" />
  </Form>
</Modal>

{#if showResetConfirmDialog}
  <ConfirmDialog
    text="全ての設定を初期化しますか？（※カウンターの数はリセットされません。）"
    restoreFocusId={ResetSettingsButtonId}
    onConfirm={() => {
      counterName.reset();
      $form.counterName = $counterName;

      counterUnit.reset();
      $form.counterUnit = $counterUnit;

      counterAmount.reset();
      $form.counterAmount = `${$counterAmount}`;

      uiTheme.reset();
    }}
    onClose={() => {
      showResetConfirmDialog = false;
    }}
  />
{/if}
