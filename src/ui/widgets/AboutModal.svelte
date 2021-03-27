<script lang="ts">
  import Modal from '../components/Modal.svelte';

  const AboutModalDescriptionId = 'about-modal-description';

  export let restoreFocusId: string;
  export let onClose: () => void;
</script>

<Modal
  title="このアプリについて"
  descriptionId={AboutModalDescriptionId}
  {restoreFocusId}
  {onClose}
>
  <p id={AboutModalDescriptionId}>輪ゴムをカウントするWebアプリです。</p>

  <p>
    製作者：Eddy Nordica (<a
      href="https://www.twitter.com/Eddy_Nordica"
      target="_blank">Twitter</a
    >)
  </p>

  <p>
    <a href="https://github.com/EddyNordica/rubber-band-counter" target="_blank"
      >GitHub</a
    >
  </p>

  <h2>
    <span class="wbr">利用</span><span class="wbr">規約</span>
  </h2>

  <p>
    本アプリを利用したことで何らかのトラブル、被害、損失、損害等が発生したとしても、私は一切の責任を負いません。勘弁してください。また、本アプリを利用することで本プライバシーポリシーに同意しているものとみなします。
  </p>

  <h2>
    <span class="wbr">プライバシー</span><span class="wbr">ポリシー</span>
  </h2>

  <p>
    当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
  </p>

  <p>
    この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
    <a
      href="https://marketingplatform.google.com/about/analytics/terms/jp/"
      target="_blank"
    >
      Googleアナリティクスサービス利用規約
    </a>
    のページや
    <a
      href="https://policies.google.com/technologies/ads?hl=ja"
      target="_blank"
    >
      Googleポリシーと規約
    </a>
    のページをご覧ください。
  </p>
</Modal>
