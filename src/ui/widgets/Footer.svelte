<script lang="ts">
  import AboutModal from './AboutModal.svelte';
  import SettingsModal from './SettingsModal.svelte';
  import LinkButton from '../components/LinkButton.svelte';
  import ButtonStack from '../layout/ButtonStack.svelte';
  import ButtonStackItem from '../layout/ButtonStackItem.svelte';
  import { IconName } from '../../app/consts/IconName';
  import { TestAutomationId } from '../../app/consts/TestAutomationId';

  const AboutModalOpenBtnId = 'Footer-about-modal';
  const SettingsModalOpenBtnId = 'Footer-settings-modal';

  let showAboutModal = false;
  let showSettingsModal = false;
</script>

<style lang="scss">
  @import '../styles/vars';

  .footer-actions {
    font-size: $__font-size-small;
  }
</style>

<div class="footer-actions">
  <ButtonStack>
    <ButtonStackItem>
      <LinkButton
        id={AboutModalOpenBtnId}
        text="このアプリについて"
        icon={IconName.Info}
        on:click={() => {
          showAboutModal = true;
        }}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <LinkButton
        id={SettingsModalOpenBtnId}
        testId={TestAutomationId.AppSettingsButton}
        text="設定"
        icon={IconName.Cogwheel}
        on:click={() => {
          showSettingsModal = true;
        }}
      />
    </ButtonStackItem>
  </ButtonStack>
</div>

{#if showAboutModal}
  <AboutModal
    restoreFocusId={AboutModalOpenBtnId}
    onClose={() => {
      showAboutModal = false;
    }}
  />
{/if}

{#if showSettingsModal}
  <SettingsModal
    restoreFocusId={SettingsModalOpenBtnId}
    onClose={() => {
      showSettingsModal = false;
    }}
  />
{/if}
