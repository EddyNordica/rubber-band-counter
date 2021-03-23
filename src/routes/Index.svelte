<script  lang="ts">
  import { count, setCount } from '../app/counter';
  import { isValidCount, MaxCount } from '../app/counter';
  import { UITheme, uiTheme, setUITheme } from '../app/theming';
  import { IconName } from '../app/consts/IconName';
  import { TestAutomationId } from '../app/consts/TestAutomationId';
  import Button from '../ui/components/Button.svelte';
  import LinkButton from '../ui/components/LinkButton.svelte';
  import Modal from '../ui/components/Modal.svelte';
  import Select from '../ui/components/Select.svelte';
  import ButtonStack from '../ui/layout/ButtonStack.svelte';
  import ButtonStackItem from '../ui/layout/ButtonStackItem.svelte';
  import Page from '../ui/layout/Page.svelte';


  const AboutModalOpenBtnId = 'about-modal-opener';
  const AboutModalDescriptionId = 'about-modal-description';
  const SettingsModalOpenBtnId = 'settings-modal-opener';
  const SelectUIThemeLabelId = 'select-ui-theme';

  let showAboutModal = false;
  let showSettingsModal = false;

  const incrementCounter = (): void => setCount($count + 1);
  const decrementCounter = (): void => setCount($count - 1);
  const resetCounter = (): void => {
    if (confirm('カウンターをリセットしますか？')) {
      setCount(0);
    }
  };
  const setCounter = (): void => {
    const newCount = prompt('輪ゴムの数を半角数字で入力してください。');
    if (newCount != null) {
      const parsedCount = parseInt(newCount, 10);
      if (isValidCount(parsedCount)) {
        setCount(parsedCount);
      } else {
        alert('数が大きすぎるか有効な数字ではありません。');
      }
    }
  };
  const bulkAdd = (amount: number): void => {
    const newCount = $count + amount;
    if (isValidCount(newCount)) {
      setCount(newCount);
    } else {
      setCount(MaxCount);
    }
  };

  const onThemeSelectionChanged = (e: Event): void => setUITheme((e.target as HTMLOptionElement).value as UITheme);

  // Set the initial UI theme.
  setUITheme($uiTheme);
</script>

<style lang="scss">
  @import "../ui/styles/vars";

  .wbr { display: inline-block; }
  .counter { font-size: 2.5rem; }
  .footer-actions { font-size: $__font-size-small; }
</style>

<Page>

  <div slot="header" class="header">
    <h1>
      <span class="wbr">輪ゴム</span><!--
   --><span class="wbr">カウンター</span>
    </h1>
  </div>
  
  <p class="counter" aria-live="polite">
    <span data-testid={TestAutomationId.CounterValue}>{$count}</span>本目
  </p>
  
  <ButtonStack fluid>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.IncreaseButton}
        text="増やす"
        tall
        fluid
        disabled={$count === MaxCount}
        on:click={incrementCounter}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.DecreaseButton}
        text="減らす"
        tall
        fluid
        disabled={$count === 0}
        on:click={decrementCounter}
      />
    </ButtonStackItem>
  </ButtonStack>

  <ButtonStack>
    <ButtonStackItem>
      <Button
        text="+50"
        on:click={() => bulkAdd(50)}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        text="+100"
        on:click={() => bulkAdd(100)}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        text="+500"
        on:click={() => bulkAdd(500)}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.Add1000Button}
        text="+1000"
        on:click={() => bulkAdd(1000)}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        text="+5000"
        on:click={() => bulkAdd(5000)}
      />
    </ButtonStackItem>
  </ButtonStack>

  <ButtonStack>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.CounterResetButton}
        text="リセット"
        on:click={resetCounter}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.CounterSetButton}
        text="手動入力"
        on:click={setCounter}
      />
    </ButtonStackItem>
  </ButtonStack>
  
  <div slot="footer">
    <div class="footer-actions">
      <ButtonStack>
        <ButtonStackItem>
          <LinkButton
            id={AboutModalOpenBtnId}
            text="このアプリについて"
            icon={IconName.Info}
            on:click={() => { showAboutModal = true; }}
          />
        </ButtonStackItem>
        <ButtonStackItem>
          <LinkButton
            id={SettingsModalOpenBtnId}
            text="設定"
            icon={IconName.Cogwheel}
            on:click={() => { showSettingsModal = true; }}
          />
        </ButtonStackItem>
      </ButtonStack>
    </div>
  </div>

</Page>

{#if showAboutModal}
  <Modal
    title="このアプリについて"
    descriptionId={AboutModalDescriptionId}
    restoreFocusId={AboutModalOpenBtnId}
    onClose={() => { showAboutModal = false; }}
  >

    <p id={AboutModalDescriptionId}>輪ゴムをカウントするWebアプリです。</p>

    <p>
      製作者：Eddy Nordica (<a href="https://www.twitter.com/Eddy_Nordica" target="_blank">Twitter</a>)
    </p>

    <p>
      <a href="https://github.com/EddyNordica/rubber-band-counter" target="_blank">GitHub</a>
    </p>

    <h2>
      <span class="wbr">利用</span><!--
   --><span class="wbr">規約</span>
    </h2>

    <p>
      このアプリを使用したことで何らかのトラブル、被害、損失、損害等が発生したとしても、私は一切の責任を負いません。勘弁してください。
    </p>

    <h2>
      <span class="wbr">プライバシー</span><!--
   --><span class="wbr">ポリシー</span>
    </h2>

    <p>
      当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
    </p>

    <p>
      この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
      <a
        href="https://marketingplatform.google.com/about/analytics/terms/jp/"
        target="_blank">
        Googleアナリティクスサービス利用規約
      </a>
      のページや
      <a
        href="https://policies.google.com/technologies/ads?hl=ja"
        target="_blank">
        Googleポリシーと規約
      </a>
      のページをご覧ください。
    </p>

  </Modal>
{/if}

{#if showSettingsModal}
  <Modal
    title="設定"
    restoreFocusId={SettingsModalOpenBtnId}
    onClose={() => { showSettingsModal = false; }}
  >

    <h2 id={SelectUIThemeLabelId}>
      <span class="wbr">背景色の</span><!--
   --><span class="wbr">変更</span>
    </h2>

    <Select
      labelId={SelectUIThemeLabelId}
      value={$uiTheme}
      on:change={onThemeSelectionChanged}
      options={[
        { value: UITheme.Light, label: '明るい' },
        { value: UITheme.Dark, label: '暗い' },
        { value: UITheme.Default, label: 'システムの既定値' },
      ]}
    />

  </Modal>
{/if}
