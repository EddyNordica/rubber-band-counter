<script lang="ts">
  import { getVersion } from '../../app/version';
  import Link from '../components/Link.svelte';
  import Modal from '../components/Modal.svelte';

  const AboutModalDescriptionId = 'AboutModal-description';

  export let restoreFocusId: string;
  export let onClose: () => void;
</script>

<style lang="scss">
  .list {
    padding: 0px;

    .list-item {
      line-height: 1.4;

      .item-title {
        margin-right: 0.5rem;
      }
    }
  }
</style>

<Modal
  title="このアプリについて"
  descriptionId={AboutModalDescriptionId}
  {restoreFocusId}
  {onClose}
>
  <p id={AboutModalDescriptionId}>輪ゴムをカウントするWebアプリです。</p>

  <ul class="list">
    <li class="list-item">
      <span class="item-title">バージョン：</span>{`v${getVersion()}`}
    </li>
    <li class="list-item">
      <span class="item-title">製作者：</span>Eddy (<Link
        text="Twitter"
        href="https://www.twitter.com/Eddy_Nordica"
        external
      />)
    </li>
    <li class="list-item">
      <span class="item-title">ソースコード：</span><Link
        text="GitHub"
        href="https://github.com/EddyNordica/rubber-band-counter"
        external
      />
    </li>
  </ul>

  <h2>
    <span class="wbr">利用</span><span class="wbr">規約</span>
  </h2>

  <p>
    本アプリを利用したことで何らかのトラブル、被害、損失、損害等が発生したとしても、私は一切の責任を負いません。勘弁してください。
  </p>

  <h2>
    <span class="wbr">プライバシー</span><span class="wbr">ポリシー</span>
  </h2>

  <p>
    当サイトでは、エラーやクラッシュを監視するために当サイト内でのユーザー行動情報を一部データ化して収集しています。このデータは匿名であり、個人を特定するものではありません。
  </p>
</Modal>
