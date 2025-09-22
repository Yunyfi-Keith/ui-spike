<script lang="ts">
    export let title: string = 'Page Header';
    import {appStore} from '../../store/app-store/appStore';
    import { SurfaceDisplayMode } from '../../store/app-store/surfaceDisplayMode';
</script>

<style>
    .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: #ffffff;
        border-bottom: 1px solid #e4e6ef;
    }
    .title {
        font-weight: 600;
        font-size: 1rem;
    }
    .spacer {
        margin-left: auto;
    }
    .actions {
        display: flex;
        gap: 8px;
    }
    button {
        padding: 6px 10px;
        border: 1px solid #d8dbe6;
        border-radius: 6px;
        background: #f7f8fc;
        cursor: pointer;
    }
    button:hover {
        background: #eef1f8;
    }
</style>

<div class="header">
    <div class="title">{title}</div>
    <div class="spacer"></div>
    <div class="actions">
    {#each [SurfaceDisplayMode.Operation, SurfaceDisplayMode.Design, SurfaceDisplayMode.Preview] as mode}
        <button on:click={() => appStore.actions.setDisplayMode(mode)} disabled={$appStore.surfaceState.displayMode === mode}>{mode}</button>
    {/each}
    </div>
</div>