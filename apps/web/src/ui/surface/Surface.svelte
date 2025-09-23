<script lang="ts">
    // This is a placeholder surface/editor. Replace with your designer/editor logic.
    import OperationModeExample from './OperationModeExample.svelte';
    import DesignModeExample from './DesignModeExample.svelte';
    let zoom = 100;
    import {appStore, SurfaceDisplayMode} from '../../stores/app-store';
</script>

<style>
    .surface-wrap {
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
    }

    .surface-toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid #e4e6ef;
        position: sticky;
        top: 0;
        z-index: 1;
        backdrop-filter: blur(6px);
    }

    .canvas {
        height: 100%;
        display: grid;
        place-items: start center;
        padding: 24px;
    }

    .page {
        width: 940px;
        min-height: 640px;
        background: #fff;
        border: 1px solid #e0e3ef;
        border-radius: 10px;
        box-shadow: 0 6px 24px rgba(16, 24, 40, 0.06);
        padding: 24px;
    }

    .surface {
        color: #99a1b7;
        font-size: 0.95rem;
    }

    input[type="range"] {
        width: 140px;
    }
</style>

<div class="surface-wrap">
    <div class="surface-toolbar">
        <span>Zoom</span>
        <input type="range" min="50" max="200" bind:value={zoom}/>
        <span>{zoom}%</span>
    </div>

    <div class="canvas">
        <div class="page" style="transform: scale({zoom/100}); transform-origin: top center;">
            <div class="surface">
                {#if $appStore.surfaceState.displayMode === SurfaceDisplayMode.Operation}
                    <OperationModeExample />
                {/if}
                {#if $appStore.surfaceState.displayMode === SurfaceDisplayMode.Design}
                    <DesignModeExample />
                {/if}
                {#if $appStore.surfaceState.displayMode === SurfaceDisplayMode.Preview}
                    <p>TODO</p>
                {/if}
            </div>
        </div>
    </div>
</div>