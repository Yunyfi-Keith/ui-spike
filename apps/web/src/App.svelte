<script lang="ts">
    import {appStore} from './store/app-store/appStore';

    // Importing the library side effect registers the web component
    import '@yunyfi/lit-wc';

    import Header from './ui//header/Header.svelte';
    import ConfigPanel from './ui/config-panel/ConfigPanel.svelte';
    import Surface from './ui/surface/Surface.svelte';
    import Toolbox from './ui/toolbox/Toolbox.svelte';
</script>

<style>
    /* Layout grid covering full viewport */
    .app-layout {
        display: grid;
        grid-template-columns: 280px 1fr 280px;
        grid-template-rows: auto 1fr;
        grid-template-areas:
      "header header header"
      "toolbox surface config";
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: #f6f7fb;
        color: #222;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji;
    }

    header.app-header {
        grid-area: header;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    aside.config-panel {
        grid-area: config;
        border-right: 1px solid #e4e6ef;
        background: #fff;
        overflow: auto;
    }

    main.surface {
        grid-area: surface;
        overflow: auto;
        background:
                linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px) 0 0/16px 16px,
                linear-gradient(0deg,  rgba(0,0,0,0.04) 1px, transparent 1px) 0 0/16px 16px,
                #fafbff;
    }

    aside.toolbox {
        grid-area: toolbox;
        border-left: 1px solid #e4e6ef;
        background: #fff;
        overflow: auto;
    }
</style>

<div class="app-layout">
    <header class="app-header">
        <Header />
    </header>

    <aside class="toolbox">
        <Toolbox />
    </aside>

    <main class="surface">
        <Surface />
    </main>

    <aside class="config-panel">
        <ConfigPanel />
    </aside>
</div>
